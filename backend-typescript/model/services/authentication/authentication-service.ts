import {UserManager} from "../../managers/user/user-manager";
import {AuthenticationManager} from "../../managers/authentication/authentication-manager";
import {agent_type} from "../../schema/authentication/authentication-schema";
import {user_type} from "../../schema/user/user-schema";

import {faker} from "@faker-js/faker";

export type registration_error_type = "username_exists" | "email_exists" | "database_error";

export type user_verification_type =
    {
        outcome: "incorrect_password" | "unverified" | "inactive" | "not_found" | "success";
        user_id?: number;
    }

export class AuthenticationService
{
    constructor(private userManager: UserManager, private authenticationManager: AuthenticationManager)
    {
    }

    async getPage_url(user_id: number): Promise<string | undefined>
    {
        return (await this.userManager.byId(user_id))?.page
    }

    async verify(identifier: string, password: string): Promise<user_verification_type> //user.id
    {
        let user: user_type | null;

        if (this.isEmail(identifier))
            user = await this.userManager.byEmail(identifier);
        else
            user = await this.userManager.byUsername(identifier);

        if (user)
        {
            const agent: agent_type | null = await this.authenticationManager.byId(user.id);

            if (agent)
            {
                if (await this.authenticationManager.verify_password(agent.id, password))
                {
                    if (!agent.verified)
                        return {
                            outcome: "unverified"
                        }
                    if (!agent.activated)
                        return {
                            outcome: "inactive"
                        }

                    return {
                        outcome: "success",
                        user_id: agent.id
                    }
                }
                else
                    return {
                        outcome: "incorrect_password"
                    }
            }
            else
                return {outcome: "not_found"};
        }
        else
            return {outcome: "not_found"};
    }

    isEmail(identifier: string): boolean
    {
        //RFC 5322
        const regular_expression_: RegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;

        return !!identifier.match(regular_expression_);
    }

    async activate_account(user_id: number): Promise<boolean>
    {
        return (await Promise.all([this.authenticationManager.activate_user(user_id),
            this.authenticationManager.verify_user(user_id)])).every(value => value);
    }

    async register(username: string, email: string, password: string): Promise<registration_error_type | "success">
    {
        if (await this.userManager.byUsername(username))
            return "username_exists";
        if (await this.userManager.byEmail(email))
            return "email_exists";

        const id: number = faker.datatype.number({min: 1_000, max: 10_000_000_000});

        return (await Promise.all([this.userManager.insertOne({
            id,
            username,
            email: email,
            first_name: "",
            last_name: "",
            page: "/index",
            createdAt: Date.now()
        }), this.authenticationManager.create(id, password)])).every(value => value) ? "success" : "database_error";
    }
}
