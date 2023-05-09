import {Router} from "../../../core/base/routers/router";
import {StatusCodes} from "http-status-codes";
import {UserManager} from "../../managers/user/user-manager";


export class UserRouter extends Router
{
    constructor(private userManager: UserManager)
    {
        super("users");

        this.default();
        this.all();
    }

    default()
    {
        this.getExpressRouter().get("/", (req, res) =>
        {
            res.sendStatus(StatusCodes.OK);
        });
    }

    all()
    {
        this.getExpressRouter().get("/all", async (req, res) =>
        {
            res.send(await this.userManager.all());
        });
    }
}
