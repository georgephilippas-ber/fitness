import {Express, RequestHandler} from "express";
import {page_characteristics} from "../../schema/schema";

export class Page
{
    override_handler?: RequestHandler;

    //priority: handler > view
    public constructor(protected endpoint: string, protected enabled: boolean, protected page_characteristics: page_characteristics, protected view?: string, protected layout?: string)
    {
        this.override_handler = undefined;
    }

    enable()
    {
        this.enabled = true;
    }

    disable()
    {
        this.enabled = false;
    }

    getEndpoint(): string
    {
        return this.endpoint;
    }

    set_override_handler(handler: RequestHandler)
    {
        this.override_handler = handler;
    }

    setView(view: string, layout?: string)
    {
        this.view = view;
        this.layout = layout;
    }

    add(express: Express, injection?: () => Promise<object>)
    {
        express.get(this.endpoint, async (req, res) =>
        {
            if (this.enabled)
            {
                if (this.override_handler)
                    this.override_handler(req, res, () => undefined);
                else if (this.view)
                {
                    let options: any = {};

                    if (this.layout)
                        options = {layout: this.layout};
                    if (injection)
                        options = {...this.page_characteristics, ...options, ...(await injection()), ...req.query};

                    res.render(this.view as string, options);
                }
                else
                    res.send("NotImplementedError");
            }
            else
                res.send("!enabled");
        });
    }
}
