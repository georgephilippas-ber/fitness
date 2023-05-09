import {Express} from "express";
import {readFile} from "fs/promises";
import path from "path";
import {Page} from "../base/pages/page";
import {ProtectedPage} from "../base/pages/protected-page";
import {page_registry_type} from "../schema/schema";
import {AuthenticationFeature} from "../features/authentication/authentication-feature";
import {LoginPage} from "../../model/pages/login-page";
import {LogoutPage} from "../../model/pages/logout-page";

export class Registry
{
    loginPage: LoginPage;
    logoutPage: LogoutPage;

    constructor(private authenticationFeature: AuthenticationFeature, private custom_pages: Page[])
    {
        this.loginPage = new LoginPage();
        this.logoutPage = new LogoutPage();
    }

    registerAuthentication(express: Express)
    {
        this.loginPage.add(express);
        this.logoutPage.add(express);
    }

    add_custom_pages(express: Express)
    {
        this.custom_pages.forEach(value =>
        {
            value.add(express);
        })
    }

    async add_json_registry_pages(express: Express)
    {
        const pages_: page_registry_type[] = JSON.parse(await readFile(path.join(__dirname, "..", "..", "configuration", "pages", "registry.json"), "utf-8"));

        pages_.forEach(value =>
        {
            const page_: Page = value.protected ? new ProtectedPage(this.authenticationFeature, value.endpoint, value.enabled, value.allowed, value.page_characteristics, value.view, value.layout) :
                new Page(value.endpoint, value.enabled, value.page_characteristics, value.view, value.layout);

            page_.add(express, async () => value.injection);
        });
    }
}