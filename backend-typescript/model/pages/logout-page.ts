import {Page} from "../../core/base/pages/page";
import {Express} from "express";

export class LogoutPage extends Page
{
    constructor()
    {
        super("/logout", true, {title: "", css_filenames: []}, "logout");
    }

    add(express: Express)
    {
        super.add(express);
    }
}
