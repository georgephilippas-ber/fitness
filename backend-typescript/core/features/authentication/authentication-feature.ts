import {decode, sign, verify} from "jsonwebtoken"
import {Request} from "express";

export type role_type = "admin" | "user";

export type payload_type =
    {
        user_id?: number;
        role?: role_type;
    }

export class AuthenticationFeature
{
    constructor(private json_web_token_secret: string)
    {
    }

    produce_jwt(user_id: number, role: role_type, expiration_hours: number = 0x02): string
    {
        return sign({
            user_id, role
        } as payload_type, this.json_web_token_secret, {expiresIn: Math.floor(expiration_hours) + "h"});
    }

    verify_jwt(token: string): payload_type | null
    {
        try
        {
            const payload = verify(token, this.json_web_token_secret);

            if (typeof payload === "string")
                return null;
            else
                return payload as payload_type;
        }
        catch (err)
        {
            console.log(this.verify_jwt.name);
            console.log(err);
            console.log(decode(token));

            return null;
        }
    }

    getAuthenticatedUser_jwt(token: string): number | undefined
    {
        try
        {
            const payload = this.verify_jwt(token);

            if (payload?.user_id)
                return payload.user_id;
            else
                return undefined;
        }
        catch (e)
        {
            return undefined;
        }
    }

    getAuthenticatedUser_req(req: Request): number | undefined
    {
        const token_: string | undefined = req.headers["authenticated-user"] as string | undefined;

        if (token_)
        {
            const payload_ = this.verify_jwt(token_);

            if (payload_)
            {
                return payload_.user_id;
            }
            else
                return undefined;
        }
        else
            return undefined;
    }
}
