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
exports.ProtectedPage = void 0;
const page_1 = require("./page");
class ProtectedPage extends page_1.Page {
    constructor(authenticationFeature, endpoint, enabled, allowed, page_characteristics, view, layout) {
        super(endpoint, enabled, page_characteristics, view, layout);
        this.authenticationFeature = authenticationFeature;
        this.allowed = allowed;
    }
    add(express, injection) {
        express.get(this.endpoint, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token_ = req.cookies["token"];
            if (token_) {
                const payload_ = this.authenticationFeature.verify_jwt(token_);
                if (payload_) {
                    if (!this.enabled)
                        res.send("!enabled");
                    if (this.allowed === "everyone" || (payload_.user_id && this.allowed.split(",").map(value => parseInt(value.trim().toLowerCase())).includes(payload_.user_id))) {
                        let options = {};
                        if (this.layout)
                            options = { layout: this.layout };
                        if (injection)
                            options = Object.assign(Object.assign(Object.assign(Object.assign({}, this.page_characteristics), options), (yield injection())), req.query);
                        res.render(this.view, options);
                    }
                    else
                        res.redirect("/login");
                }
                else
                    res.redirect("/login");
            }
            else
                res.redirect("/login");
        }));
    }
}
exports.ProtectedPage = ProtectedPage;
