"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationService = exports.AuthorizationRouter = exports.AuthorizationManager = void 0;
const faker_1 = require("@faker-js/faker");
const axios_1 = __importDefault(require("axios"));
const http_status_codes_1 = require("http-status-codes");
const rxjs_1 = require("rxjs");
const Buffer = __importStar(require("buffer"));
const util_1 = require("util");
const manager_1 = require("../../base/managers/manager");
const location_1 = require("../../../configuration/servers/location");
const router_1 = require("../../base/routers/router");
const PORT = location_1.servers.backend.port;
function construct_url(base_url, params) {
    return [base_url, "?", Object.keys(params).map(value => [value, "=", params[value]].join("")).join("&")].join("");
}
const withingsClient = {
    uri: ["https://account.withings.com/oauth2_user/authorize2", "https://wbsapi.withings.net/v2/oauth2"],
    id: "5c909916cbb962f3211e3284a2d22432c44ef260fc0874afd8d2e2cc40095ddf",
    secret: "d24408ff29677ba8d337902486797a34682b9b0d3ec3a11787837fcdf47e4406",
    redirect_uri: `http://localhost:${PORT}/authorization/withings`
};
const fitbitClient = {
    uri: ["https://www.fitbit.com/oauth2/authorize", "https://api.fitbit.com/oauth2/token"],
    id: "238TKZ",
    secret: "3885d063f98cdbb7fb2b1e552fab0638",
    redirect_uri: `http://localhost:${PORT}/authorization/fitbit`
};
const clients = {
    "withings": withingsClient,
    "fitbit": fitbitClient
};
class AuthorizationManager extends manager_1.Manager {
    constructor(databaseProvider) {
        super(databaseProvider, AuthorizationManager.name);
    }
    updateTokens(user_id, client_identifier, accessToken, refreshToken, accessTokenExpiration) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield this.collection().updateOne({ user_id, client_identifier }, {
                "$set": {
                    id: faker_1.faker.datatype.uuid(),
                    createdAt: new Date().getTime(),
                    user_id,
                    client_identifier,
                    accessToken,
                    refreshToken,
                    accessTokenExpiration
                }
            }, { upsert: true }));
        });
    }
    getAccessToken(user_id, client_identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization_credentials = yield this.collection().findOne({ user_id, client_identifier });
            return authorization_credentials === null || authorization_credentials === void 0 ? void 0 : authorization_credentials.accessToken;
        });
    }
    getRefreshToken(user_id, client_identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization_credentials = yield this.collection().findOne({ user_id, client_identifier });
            return authorization_credentials === null || authorization_credentials === void 0 ? void 0 : authorization_credentials.refreshToken;
        });
    }
    hasValidAccessToken(user_id, client_identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorization_credentials = yield this.collection().findOne({ user_id, client_identifier });
            return Boolean(authorization_credentials && authorization_credentials.accessToken !== undefined && authorization_credentials.accessTokenExpiration && authorization_credentials.accessTokenExpiration >= Date.now());
        });
    }
}
exports.AuthorizationManager = AuthorizationManager;
class AuthorizationRouter extends router_1.Router {
    constructor(authorizationManager) {
        super("authorization");
        this.authorizationManager = authorizationManager;
        this.code_verifier = [faker_1.faker.datatype.uuid(), faker_1.faker.datatype.uuid()].join("");
        this.withings();
        this.withings_code_request();
        this.fitbit();
        this.fitbit_code_request();
        this.successSubject = new rxjs_1.Subject();
    }
    clientSuccessfullyAuthorizedObservable() {
        return this.successSubject;
    }
    withings() {
        this.getExpressRouter().get("/withings", (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.query["code"]) {
                try {
                    const post_res = yield axios_1.default.post(clients.withings.uri[1], {}, {
                        params: {
                            action: "requesttoken",
                            client_id: clients["withings"].id,
                            client_secret: clients["withings"].secret,
                            grant_type: "authorization_code",
                            code: req.query["code"],
                            redirect_uri: clients["withings"].redirect_uri
                        }
                    });
                    const user_id = parseInt(req.query["state"]);
                    yield this.authorizationManager.updateTokens(user_id, "withings", post_res.data.body.access_token, post_res.data.body.refresh_token, Date.now() + post_res.data.body.expires_in * 1000);
                    this.successSubject.next({
                        client_identifier: "withings",
                        user_id, accessToken: post_res.data.body.access_token
                    });
                    //TODO: final redirect
                    res.sendStatus(http_status_codes_1.StatusCodes.OK);
                }
                catch (err) {
                    console.log(this.withings.name);
                    console.log(err.message);
                    res.sendStatus(http_status_codes_1.StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
                }
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.PARTIAL_CONTENT);
        }));
    }
    fitbit() {
        this.getExpressRouter().get("/fitbit", (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.query["code"]) {
                try {
                    const post_res = yield axios_1.default.post(clients.fitbit.uri[1], {}, {
                        params: {
                            client_id: clients["fitbit"].id,
                            client_secret: clients["fitbit"].secret,
                            grant_type: "authorization_code",
                            code: req.query["code"],
                            redirect_uri: clients["withings"].redirect_uri,
                            code_verifier: this.code_verifier //Buffer.Buffer.from(this.code_verifier).toString("base64")
                        },
                        headers: {
                            "Authorizaton": ["Basic", Buffer.Buffer.from([clients["fitbit"].id, clients["fitbit"].secret].join(":")).toString("base64")].join(" "),
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    });
                    const user_id = parseInt(req.query["state"]);
                    yield this.authorizationManager.updateTokens(user_id, "fitbit", post_res.data.access_token, post_res.data.refresh_token, Date.now() + post_res.data.expires_in * 1000);
                    this.successSubject.next({
                        client_identifier: "fitbit",
                        user_id, accessToken: post_res.data.access_token
                    });
                    //TODO: final redirect
                    res.sendStatus(http_status_codes_1.StatusCodes.OK);
                }
                catch (err) {
                    console.log(this.fitbit.name);
                    console.log(err.message, err.code);
                    console.log((0, util_1.inspect)(err, { depth: null }));
                    res.sendStatus(http_status_codes_1.StatusCodes.NETWORK_AUTHENTICATION_REQUIRED);
                }
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.PARTIAL_CONTENT);
        }));
    }
    withings_code_request() {
        this.getExpressRouter().get("/withings-redirect", (req, res) => {
            if (req.query["user_id"])
                res.redirect(construct_url(clients["withings"].uri[0], {
                    response_type: "code",
                    client_id: clients["withings"].id,
                    state: req.query["user_id"],
                    scope: "user.metrics",
                    redirect_uri: clients["withings"].redirect_uri
                }));
            else
                res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        });
    }
    fitbit_code_request() {
        this.getExpressRouter().get("/fitbit-redirect", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const code_challenge = this.code_verifier;
            if (req.query["user_id"]) {
                res.redirect(construct_url(clients["fitbit"].uri[0], {
                    client_id: clients["fitbit"].id,
                    scope: "activity heartrate location profile",
                    code_challenge,
                    response_type: "code",
                    state: req.query["user_id"]
                }));
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }));
    }
}
exports.AuthorizationRouter = AuthorizationRouter;
// methods that enable registered OAuth2 based clients to make data requests after initial authorization has been obtained
class AuthorizationService {
    constructor(authorizationManager) {
        this.authorizationManager = authorizationManager;
    }
    getAccessToken(user_id, client_identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authorizationManager.getAccessToken(user_id, client_identifier);
        });
    }
    getRefreshToken(user_id, client_identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.authorizationManager.getRefreshToken(user_id, client_identifier);
        });
    }
    refresh(user_id, client_identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            const refresh_token = yield this.authorizationManager.getRefreshToken(user_id, client_identifier);
            if (refresh_token !== undefined)
                switch (client_identifier) {
                    case "fitbit":
                        try {
                            const post_res = yield axios_1.default.post(clients[client_identifier].uri[1], {}, {
                                params: {
                                    grant_type: "refresh_token",
                                    refresh_token,
                                },
                                headers: {
                                    "Authorizaton": ["Basic", Buffer.Buffer.from([clients["fitbit"].id, clients["fitbit"].secret].join(":")).toString("base64")].join(" "),
                                    "Content-Type": "application/x-www-form-urlencoded"
                                }
                            });
                            yield this.authorizationManager.updateTokens(user_id, client_identifier, post_res.data.access_token, post_res.data.refresh_token, Date.now() + post_res.data.expires_in * 1000);
                            return true;
                        }
                        catch (err) {
                            console.log(this.refresh.name, err.message, err.code);
                            return false;
                        }
                    case "withings":
                        try {
                            const post_res = yield axios_1.default.post(clients[client_identifier].uri[1], {}, {
                                params: {
                                    action: "requesttoken",
                                    client_id: clients[client_identifier].id,
                                    client_secret: clients[client_identifier].secret,
                                    grant_type: "refresh_token"
                                }
                            });
                            if (post_res.data.status === 0)
                                yield this.authorizationManager.updateTokens(user_id, client_identifier, post_res.data.body.access_token, post_res.data.body.refresh_token, Date.now() + post_res.data.body.expires_in * 1000);
                            else
                                return false;
                            return true;
                        }
                        catch (err) {
                            console.log(this.refresh.name);
                            console.log(err.message);
                            return false;
                        }
                    default:
                        return false;
                }
            else
                return false;
        });
    }
}
exports.AuthorizationService = AuthorizationService;
