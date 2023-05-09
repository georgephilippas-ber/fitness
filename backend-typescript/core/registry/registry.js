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
exports.Registry = void 0;
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const page_1 = require("../base/pages/page");
const protected_page_1 = require("../base/pages/protected-page");
const login_page_1 = require("../../model/pages/login-page");
const logout_page_1 = require("../../model/pages/logout-page");
class Registry {
    constructor(authenticationFeature, custom_pages) {
        this.authenticationFeature = authenticationFeature;
        this.custom_pages = custom_pages;
        this.loginPage = new login_page_1.LoginPage();
        this.logoutPage = new logout_page_1.LogoutPage();
    }
    registerAuthentication(express) {
        this.loginPage.add(express);
        this.logoutPage.add(express);
    }
    add_custom_pages(express) {
        this.custom_pages.forEach(value => {
            value.add(express);
        });
    }
    add_json_registry_pages(express) {
        return __awaiter(this, void 0, void 0, function* () {
            const pages_ = JSON.parse(yield (0, promises_1.readFile)(path_1.default.join(__dirname, "..", "..", "configuration", "pages", "registry.json"), "utf-8"));
            pages_.forEach(value => {
                const page_ = value.protected ? new protected_page_1.ProtectedPage(this.authenticationFeature, value.endpoint, value.enabled, value.allowed, value.page_characteristics, value.view, value.layout) :
                    new page_1.Page(value.endpoint, value.enabled, value.page_characteristics, value.view, value.layout);
                page_.add(express, () => __awaiter(this, void 0, void 0, function* () { return value.injection; }));
            });
        });
    }
}
exports.Registry = Registry;
