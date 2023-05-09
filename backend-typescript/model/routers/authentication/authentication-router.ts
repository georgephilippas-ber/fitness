import {Router} from "../../../core/base/routers/router";
import {
    AuthenticationService,
    registration_error_type,
    user_verification_type
} from "../../services/authentication/authentication-service";
import express from "express";
import {AuthenticationFeature} from "../../../core/features/authentication/authentication-feature";
import {StatusCodes} from "http-status-codes";
import cookieParser from "cookie-parser";
import {UserManager} from "../../managers/user/user-manager";

const cookie_expiration_hours: number = 2;

type login_query_type =
    {
        identifier?: string;
        password?: string;
    }

type activation_query_type =
    {
        token: string;
    }

type register_body_type =
    {
        username?: string;
        email?: string;
        password?: string;
    }

export class AuthenticationRouter extends Router
{
    constructor(private userManager: UserManager, private authenticationService: AuthenticationService, private authenticationFeature: AuthenticationFeature)
    {
        super("authentication");

        this.router_.use(express.json());
        this.router_.use(cookieParser());

        this.login();
        this.logout();
        this.register();
        this.activate_account();
    }

    login()
    {
        this.router_.get("/login", async (req, res) =>
        {
            const query_: login_query_type = req.query as login_query_type;

            if (query_.identifier && query_.password)
            {
                const user_verification: user_verification_type = await this.authenticationService.verify(query_.identifier, query_.password);

                if (user_verification.outcome === "success" && user_verification.user_id)
                {
                    const token: string = this.authenticationFeature.produce_jwt(user_verification.user_id, "user");

                    res.cookie("token", token, {
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        maxAge: 60 * 60 * 1_000 * cookie_expiration_hours,
                        domain: "localhost" //
                    }).send({
                        token: this.authenticationFeature.produce_jwt(user_verification.user_id, "user"),
                        page: await this.authenticationService.getPage_url(user_verification.user_id)
                    });
                }
                else
                    res.status(StatusCodes.FORBIDDEN).send({
                        outcome: user_verification.outcome
                    });
            }
            else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }

    logout()
    {
        this.router_.get("/logout", (req, res) =>
        {
            res.clearCookie("token").sendStatus(StatusCodes.OK);
        });
    }

    register()
    {
        this.router_.post("/register", async (req, res) =>
        {
            const body_: register_body_type = req.body as register_body_type;

            if (body_.username && body_.email && body_.password)
            {
                const outcome_: registration_error_type | "success" = await this.authenticationService.register(body_.username, body_.email, body_.password);

                if (outcome_ === "success")
                {
                    const user_ = await this.userManager.byEmail(body_.email);

                    if (user_)
                    {
                        res.send({
                            outcome: outcome_
                        });
                    }
                    else
                        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }
            else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }

    activate_account()
    {
        this.router_.post("/activate", async (req, res) =>
        {
            const query_: activation_query_type = req.query as activation_query_type;

            if (query_.token)
            {
                try
                {
                    const payload_ = await this.authenticationFeature.verify_jwt(query_.token);

                    if (payload_?.user_id)
                    {
                        if (await this.authenticationService.activate_account(payload_.user_id))
                            res.sendStatus(StatusCodes.OK);
                        else
                            res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                    else
                        res.sendStatus(StatusCodes.EXPECTATION_FAILED);
                }
                catch (err)
                {
                    res.sendStatus(StatusCodes.FORBIDDEN);
                }

            }
            else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }
}
