"use strict";
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
exports.AuthenticationRouter = void 0;
const router_1 = require("../../../core/base/routers/router");
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookie_expiration_hours = 2;
class AuthenticationRouter extends router_1.Router {
    constructor(userManager, authenticationService, authenticationFeature) {
        super("authentication");
        this.userManager = userManager;
        this.authenticationService = authenticationService;
        this.authenticationFeature = authenticationFeature;
        this.router_.use(express_1.default.json());
        this.router_.use((0, cookie_parser_1.default)());
        this.login();
        this.logout();
        this.register();
        this.activate_account();
    }
    login() {
        this.router_.get("/login", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const query_ = req.query;
            if (query_.identifier && query_.password) {
                const user_verification = yield this.authenticationService.verify(query_.identifier, query_.password);
                if (user_verification.outcome === "success" && user_verification.user_id) {
                    const token = this.authenticationFeature.produce_jwt(user_verification.user_id, "user");
                    res.cookie("token", token, {
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        maxAge: 60 * 60 * 1000 * cookie_expiration_hours,
                        domain: "localhost" //
                    }).send({
                        token: this.authenticationFeature.produce_jwt(user_verification.user_id, "user"),
                        page: yield this.authenticationService.getPage_url(user_verification.user_id)
                    });
                }
                else
                    res.status(http_status_codes_1.StatusCodes.FORBIDDEN).send({
                        outcome: user_verification.outcome
                    });
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }));
    }
    logout() {
        this.router_.get("/logout", (req, res) => {
            res.clearCookie("token").sendStatus(http_status_codes_1.StatusCodes.OK);
        });
    }
    register() {
        this.router_.post("/register", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body_ = req.body;
            if (body_.username && body_.email && body_.password) {
                const outcome_ = yield this.authenticationService.register(body_.username, body_.email, body_.password);
                if (outcome_ === "success") {
                    const user_ = yield this.userManager.byEmail(body_.email);
                    if (user_) {
                        res.send({
                            outcome: outcome_
                        });
                    }
                    else
                        res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }));
    }
    activate_account() {
        this.router_.post("/activate", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const query_ = req.query;
            if (query_.token) {
                try {
                    const payload_ = yield this.authenticationFeature.verify_jwt(query_.token);
                    if (payload_ === null || payload_ === void 0 ? void 0 : payload_.user_id) {
                        if (yield this.authenticationService.activate_account(payload_.user_id))
                            res.sendStatus(http_status_codes_1.StatusCodes.OK);
                        else
                            res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                    }
                    else
                        res.sendStatus(http_status_codes_1.StatusCodes.EXPECTATION_FAILED);
                }
                catch (err) {
                    res.sendStatus(http_status_codes_1.StatusCodes.FORBIDDEN);
                }
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
        }));
    }
}
exports.AuthenticationRouter = AuthenticationRouter;
