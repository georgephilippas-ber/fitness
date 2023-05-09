import {Page} from "../../core/base/pages/page";
import {Express} from "express";

const logo_uri: string = "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600";

export class LoginPage extends Page
{
    constructor()
    {
        super("/login", true, {title: "Login", css_filenames: ["tailwindcss/index"]}, "login", "login");
    }

    add(express: Express)
    {
        super.add(express, async () => ({
            logo: logo_uri
        }));
    }
}
