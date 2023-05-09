import {AuthenticationFeature, payload_type} from "../../features/authentication/authentication-feature";
import {Express} from "express";
import {Page} from "./page";
import {page_characteristics} from "../../schema/schema";

export class ProtectedPage extends Page
{
    public constructor(protected authenticationFeature: AuthenticationFeature, endpoint: string, enabled: boolean, private allowed: "everyone" | string, page_characteristics: page_characteristics, view: string, layout?: string)
    {
        super(endpoint, enabled, page_characteristics, view, layout);
    }

    add(express: Express, injection?: () => Promise<object>)
    {
        express.get(this.endpoint, async (req, res) =>
        {
            const token_: string | undefined = req.cookies["token"];

            if (token_)
            {
                const payload_: payload_type | null = this.authenticationFeature.verify_jwt(token_);

                if (payload_)
                {
                    if (!this.enabled)
                        res.send("!enabled");

                    if (this.allowed === "everyone" || (payload_.user_id && this.allowed.split(",").map(value => parseInt(value.trim().toLowerCase())).includes(payload_.user_id)))
                    {
                        let options: any = {};

                        if (this.layout)
                            options = {layout: this.layout};

                        if (injection)
                            options = {...this.page_characteristics, ...options, ...(await injection()), ...req.query}

                        res.render(this.view as string, options);
                    }
                    else
                        res.redirect("/login");
                }
                else
                    res.redirect("/login");
            }
            else
                res.redirect("/login");
        });
    }
}
