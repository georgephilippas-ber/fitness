import {Period} from "@sprinter-common/features/time/period/period"
import {StatusCodes} from "http-status-codes";
import {Router} from "../../../core/base/routers/router";
import {ActivityManager} from "../managers/activity/activity-manager";
import {AuthenticationFeature} from "../../../core/features/authentication/authentication-feature";
import {time_series_request_base_interface} from "../schema/schema";

export class ActivityRouter extends Router
{
    constructor(private activityManager: ActivityManager, private authenticationFeature: AuthenticationFeature)
    {
        super("activity");

        this.all();
        this.latest();
    }

    all()
    {
        this.router_.post("/" + this.all.name, async (req, res) =>
        {
            const body_: time_series_request_base_interface = req.body as time_series_request_base_interface;
            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            if (user_id)
            {
                try
                {
                    const response_ = await this.activityManager.forPeriod(user_id, new Period(body_.beginning_timestamp, body_.end_timestamp));

                    console.log(response_);
                    res.send(response_);
                }
                catch (e)
                {
                    console.log(this.all.name);
                    console.log(e);

                    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }
            else
                res.sendStatus(StatusCodes.UNAUTHORIZED);
        });
    }

    latest()
    {
        this.router_.post("/" + this.latest.name, async (req, res) =>
        {
            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            if (user_id)
                res.send(await this.activityManager.latest(user_id));
            else
                res.sendStatus(StatusCodes.UNAUTHORIZED);
        });
    }
}
