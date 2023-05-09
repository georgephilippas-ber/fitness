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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const faker_1 = require("@faker-js/faker");
class AuthenticationService {
    constructor(userManager, authenticationManager) {
        this.userManager = userManager;
        this.authenticationManager = authenticationManager;
    }
    getPage_url(user_id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield this.userManager.byId(user_id))) === null || _a === void 0 ? void 0 : _a.page;
        });
    }
    verify(identifier, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (this.isEmail(identifier))
                user = yield this.userManager.byEmail(identifier);
            else
                user = yield this.userManager.byUsername(identifier);
            if (user) {
                const agent = yield this.authenticationManager.byId(user.id);
                if (agent) {
                    if (yield this.authenticationManager.verify_password(agent.id, password)) {
                        if (!agent.verified)
                            return {
                                outcome: "unverified"
                            };
                        if (!agent.activated)
                            return {
                                outcome: "inactive"
                            };
                        return {
                            outcome: "success",
                            user_id: agent.id
                        };
                    }
                    else
                        return {
                            outcome: "incorrect_password"
                        };
                }
                else
                    return { outcome: "not_found" };
            }
            else
                return { outcome: "not_found" };
        });
    }
    isEmail(identifier) {
        //RFC 5322
        const regular_expression_ = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/g;
        return !!identifier.match(regular_expression_);
    }
    activate_account(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Promise.all([this.authenticationManager.activate_user(user_id),
                this.authenticationManager.verify_user(user_id)])).every(value => value);
        });
    }
    register(username, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.userManager.byUsername(username))
                return "username_exists";
            if (yield this.userManager.byEmail(email))
                return "email_exists";
            const id = faker_1.faker.datatype.number({ min: 1000, max: 10000000000 });
            return (yield Promise.all([this.userManager.insertOne({
                    id,
                    username,
                    email: email,
                    first_name: "",
                    last_name: "",
                    page: "/index",
                    createdAt: Date.now()
                }), this.authenticationManager.create(id, password)])).every(value => value) ? "success" : "database_error";
        });
    }
}
exports.AuthenticationService = AuthenticationService;
