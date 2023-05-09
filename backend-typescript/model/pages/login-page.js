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
exports.LoginPage = void 0;
const page_1 = require("../../core/base/pages/page");
const logo_uri = "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600";
class LoginPage extends page_1.Page {
    constructor() {
        super("/login", true, { title: "Login", css_filenames: ["tailwindcss/index"] }, "login", "login");
    }
    add(express) {
        super.add(express, () => __awaiter(this, void 0, void 0, function* () {
            return ({
                logo: logo_uri
            });
        }));
    }
}
exports.LoginPage = LoginPage;
