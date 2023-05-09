import {faker} from "@faker-js/faker";
import axios, {AxiosError} from "axios";
import {StatusCodes} from "http-status-codes";
import {Observable, Subject} from "rxjs";
import * as Buffer from "buffer";
import {inspect} from "util"

import {DatabaseProvider} from "../../database-provider/database-provider";
import {Manager} from "../../base/managers/manager";
import {servers} from "../../../configuration/servers/location";
import {Router} from "../../base/routers/router";

const PORT: number = servers.backend.port as number;

function construct_url(base_url: string, params: { [key_ in string]: string }): string
{
    return [base_url, "?", Object.keys(params).map(value => [value, "=", params[value]].join("")).join("&")].join("");
}

export type OAuth2_client_identifier_type = "withings" | "fitbit";

interface client_interface
{
    id: string;
    uri: string[];
    redirect_uri: string;
    secret: string;
}

const withingsClient: client_interface =
    {
        uri: ["https://account.withings.com/oauth2_user/authorize2", "https://wbsapi.withings.net/v2/oauth2"],
        id: "5c909916cbb962f3211e3284a2d22432c44ef260fc0874afd8d2e2cc40095ddf",
        secret: "d24408ff29677ba8d337902486797a34682b9b0d3ec3a11787837fcdf47e4406",
        redirect_uri: `http://localhost:${PORT}/authorization/withings`
    }

const fitbitClient: client_interface =
    {
        uri: ["https://www.fitbit.com/oauth2/authorize", "https://api.fitbit.com/oauth2/token"],
        id: "238TKZ",
        secret: "3885d063f98cdbb7fb2b1e552fab0638",
        redirect_uri: `http://localhost:${PORT}/authorization/fitbit`
    }

type clients_type =
    {
        [identifier in OAuth2_client_identifier_type]: client_interface
    };

const clients: clients_type =
    {
        "withings": withingsClient,
        "fitbit": fitbitClient
    }

type authorization_credentials_type =
    {
        id: string;
        createdAt: number;

        user_id: number;
        client_identifier: OAuth2_client_identifier_type;

        accessToken: string | undefined;
        refreshToken: string | undefined;

        accessTokenExpiration: number | undefined;

        code: string | undefined;
    }

export class AuthorizationManager extends Manager<authorization_credentials_type>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, AuthorizationManager.name);
    }

    async updateTokens(user_id: number, client_identifier: OAuth2_client_identifier_type, accessToken: string | undefined, refreshToken: string | undefined, accessTokenExpiration: number | undefined)
    {
        (await this.collection().updateOne({user_id, client_identifier}, {
            "$set": {
                id: faker.datatype.uuid(),
                createdAt: new Date().getTime(),
                user_id,
                client_identifier,
                accessToken,
                refreshToken,
                accessTokenExpiration
            }
        }, {upsert: true}));
    }

    async getAccessToken(user_id: number, client_identifier: OAuth2_client_identifier_type): Promise<string | undefined>
    {
        const authorization_credentials = await this.collection().findOne({user_id, client_identifier});

        return authorization_credentials?.accessToken;
    }

    async getRefreshToken(user_id: number, client_identifier: OAuth2_client_identifier_type): Promise<string | undefined>
    {
        const authorization_credentials = await this.collection().findOne({user_id, client_identifier});

        return authorization_credentials?.refreshToken;
    }

    async hasValidAccessToken(user_id: number, client_identifier: OAuth2_client_identifier_type): Promise<boolean>
    {
        const authorization_credentials = await this.collection().findOne({user_id, client_identifier});

        return Boolean(authorization_credentials && authorization_credentials.accessToken !== undefined && authorization_credentials.accessTokenExpiration && authorization_credentials.accessTokenExpiration >= Date.now());
    }
}

export class AuthorizationRouter extends Router
{
    successSubject: Subject<{ client_identifier: OAuth2_client_identifier_type, user_id: number, accessToken: string }>;

    code_verifier: string;

    constructor(private authorizationManager: AuthorizationManager)
    {
        super("authorization");

        this.code_verifier = [faker.datatype.uuid(), faker.datatype.uuid()].join("");

        this.withings();
        this.withings_code_request();

        this.fitbit();
        this.fitbit_code_request();

        this.successSubject = new Subject<{
            client_identifier: OAuth2_client_identifier_type,
            user_id: number;
            accessToken: string
        }>();
    }

    clientSuccessfullyAuthorizedObservable(): Observable<{
        client_identifier: OAuth2_client_identifier_type,
        user_id: number;
        accessToken: string
    }>
    {
        return this.successSubject;
    }

    withings()
    {
        this.getExpressRouter().get("/withings", async (req, res) =>
        {
            if (req.query["code"])
            {
                try
                {
                    const post_res = await axios.post<{
                        status: number;
                        body:
                            {
                                userid: string;
                                access_token: string;
                                refresh_token: string;
                                scope: string;
                                expires_in: number;
                                token_type: string;
                            }
                    }>(clients.withings.uri[1], {}, {
                        params:
                            {
                                action: "requesttoken",
                                client_id: clients["withings"].id,
                                client_secret: clients["withings"].secret,
                                grant_type: "authorization_code",
                                code: req.query["code"],
                                redirect_uri: clients["withings"].redirect_uri
                            }
                    });

                    const user_id: number = parseInt(req.query["state"] as string);

                    await this.authorizationManager.updateTokens(user_id, "withings", post_res.data.body.access_token, post_res.data.body.refresh_token, Date.now() + post_res.data.body.expires_in * 1_000)

                    this.successSubject.next({
                        client_identifier: "withings",
                        user_id, accessToken: post_res.data.body.access_token
                    });

                    //TODO: final redirect
                    res.sendStatus(StatusCodes.OK);
                }
                catch (err)
                {
                    console.log(this.withings.name);
                    console.log((err as AxiosError).message);

                    res.sendStatus(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
                }
            }
            else
                res.sendStatus(StatusCodes.PARTIAL_CONTENT)
        });
    }

    fitbit()
    {
        this.getExpressRouter().get("/fitbit", async (req, res) =>
        {
            if (req.query["code"])
            {
                try
                {
                    const post_res = await axios.post<{
                        access_token: string;
                        refresh_token: string;
                        expires_in: number;
                        token_type: string;
                        user_id: string;
                    }>(clients.fitbit.uri[1], {}, {
                        params:
                            {
                                client_id: clients["fitbit"].id,
                                client_secret: clients["fitbit"].secret,
                                grant_type: "authorization_code",
                                code: req.query["code"],
                                redirect_uri: clients["withings"].redirect_uri,
                                code_verifier: this.code_verifier//Buffer.Buffer.from(this.code_verifier).toString("base64")
                            },
                        headers:
                            {
                                "Authorizaton": ["Basic", Buffer.Buffer.from([clients["fitbit"].id, clients["fitbit"].secret].join(":")).toString("base64")].join(" "),
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                    });

                    const user_id: number = parseInt(req.query["state"] as string);

                    await this.authorizationManager.updateTokens(user_id, "fitbit", post_res.data.access_token, post_res.data.refresh_token, Date.now() + post_res.data.expires_in * 1_000);

                    this.successSubject.next({
                        client_identifier: "fitbit",
                        user_id, accessToken: post_res.data.access_token
                    });

                    //TODO: final redirect
                    res.sendStatus(StatusCodes.OK);
                }
                catch (err: any)
                {
                    console.log(this.fitbit.name);
                    console.log((err as AxiosError).message, (err as AxiosError).code);

                    console.log(inspect(err, {depth: null}));

                    res.sendStatus(StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
                }
            }
            else
                res.sendStatus(StatusCodes.PARTIAL_CONTENT);
        });
    }

    withings_code_request()
    {
        this.getExpressRouter().get("/withings-redirect", (req, res) =>
        {
            if (req.query["user_id"])
                res.redirect(construct_url(clients["withings"].uri[0], {
                    response_type: "code",
                    client_id: clients["withings"].id,
                    state: req.query["user_id"] as string,
                    scope: "user.metrics",
                    redirect_uri: clients["withings"].redirect_uri
                }));
            else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }

    fitbit_code_request()
    {
        this.getExpressRouter().get("/fitbit-redirect", async (req, res) =>
        {
            const code_challenge = this.code_verifier;

            if (req.query["user_id"])
            {
                res.redirect(construct_url(clients["fitbit"].uri[0], {
                    client_id: clients["fitbit"].id,
                    scope: "activity heartrate location profile",
                    code_challenge,
                    response_type: "code",
                    state: req.query["user_id"] as string
                }));
            }
            else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }
}

// methods that enable registered OAuth2 based clients to make data requests after initial authorization has been obtained
export class AuthorizationService
{
    constructor(private authorizationManager: AuthorizationManager)
    {
    }

    async getAccessToken(user_id: number, client_identifier: OAuth2_client_identifier_type): Promise<string | undefined>
    {
        return this.authorizationManager.getAccessToken(user_id, client_identifier);
    }

    async getRefreshToken(user_id: number, client_identifier: OAuth2_client_identifier_type): Promise<string | undefined>
    {
        return this.authorizationManager.getRefreshToken(user_id, client_identifier);
    }

    async refresh(user_id: number, client_identifier: OAuth2_client_identifier_type): Promise<boolean>
    {
        const refresh_token = await this.authorizationManager.getRefreshToken(user_id, client_identifier);

        if (refresh_token !== undefined)
            switch (client_identifier)
            {
                case "fitbit":
                    try
                    {
                        const post_res = await axios.post<{
                            access_token: string,
                            expires_in: number,
                            refresh_token: string,
                            token_type: string,
                            user_id: string
                        }>(clients[client_identifier].uri[1], {}, {
                            params: {
                                grant_type: "refresh_token",
                                refresh_token,
                            },
                            headers: {
                                "Authorizaton": ["Basic", Buffer.Buffer.from([clients["fitbit"].id, clients["fitbit"].secret].join(":")).toString("base64")].join(" "),
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        });

                        await this.authorizationManager.updateTokens(user_id, client_identifier, post_res.data.access_token, post_res.data.refresh_token, Date.now() + post_res.data.expires_in * 1_000)

                        return true;
                    }
                    catch (err)
                    {
                        console.log(this.refresh.name, (err as AxiosError).message, (err as AxiosError).code);

                        return false;
                    }
                case "withings":
                    try
                    {
                        const post_res = await axios.post<{
                            status: number;
                            body:
                                {
                                    userid: string;
                                    access_token: string;
                                    refresh_token: string;
                                    expires_in: number;
                                    scope: string;
                                    csrf_token: string;
                                    token_type: string;
                                }
                        }>(clients[client_identifier].uri[1], {}, {
                            params: {
                                action: "requesttoken",
                                client_id: clients[client_identifier].id,
                                client_secret: clients[client_identifier].secret,
                                grant_type: "refresh_token"
                            }
                        });

                        if (post_res.data.status === 0)
                            await this.authorizationManager.updateTokens(user_id, client_identifier, post_res.data.body.access_token, post_res.data.body.refresh_token, Date.now() + post_res.data.body.expires_in * 1_000)
                        else
                            return false;

                        return true;
                    }
                    catch (err)
                    {
                        console.log(this.refresh.name);
                        console.log((err as any).message);

                        return false;
                    }
                default:
                    return false;
            }
        else
            return false;
    }
}
