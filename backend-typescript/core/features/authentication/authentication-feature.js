"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationFeature = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthenticationFeature {
    constructor(json_web_token_secret) {
        this.json_web_token_secret = json_web_token_secret;
    }
    produce_jwt(user_id, role, expiration_hours = 0x02) {
        return (0, jsonwebtoken_1.sign)({
            user_id, role
        }, this.json_web_token_secret, { expiresIn: Math.floor(expiration_hours) + "h" });
    }
    verify_jwt(token) {
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, this.json_web_token_secret);
            if (typeof payload === "string")
                return null;
            else
                return payload;
        }
        catch (err) {
            console.log(this.verify_jwt.name);
            console.log(err);
            console.log((0, jsonwebtoken_1.decode)(token));
            return null;
        }
    }
    getAuthenticatedUser_jwt(token) {
        try {
            const payload = this.verify_jwt(token);
            if (payload === null || payload === void 0 ? void 0 : payload.user_id)
                return payload.user_id;
            else
                return undefined;
        }
        catch (e) {
            return undefined;
        }
    }
    getAuthenticatedUser_req(req) {
        const token_ = req.headers["authenticated-user"];
        if (token_) {
            const payload_ = this.verify_jwt(token_);
            if (payload_) {
                return payload_.user_id;
            }
            else
                return undefined;
        }
        else
            return undefined;
    }
}
exports.AuthenticationFeature = AuthenticationFeature;
