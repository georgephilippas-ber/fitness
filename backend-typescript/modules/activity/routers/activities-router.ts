import {Router} from "../../../core/base/routers/router";
import {ActivitiesManager} from "../managers/activity/activities-manager";
import {StatisticsService} from "../services/statistics/statistics-service";
import {StatusCodes} from "http-status-codes";
import {Period} from "@sprinter-common/features/time/period/period";
import {AuthenticationFeature} from "../../../core/features/authentication/authentication-feature";
import {activity_statistics_request_type, time_series_request_base_interface} from "@sprinter-common/schema/activities/activities";

export class ActivitiesRouter extends Router
{
    constructor(private activitiesManager: ActivitiesManager, private statisticsService: StatisticsService, private authenticationFeature: AuthenticationFeature)
    {
        super("activities");

        this.latest();
        this.all();
        this.statistics();
    }

    all() //res: (extends activity_interface_base)[]
    {
        this.router_.post("/" + this.all.name, async (req, res) =>
        {
            const body_: time_series_request_base_interface = req.body as time_series_request_base_interface;
            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            if (user_id)
            {
                res.send(await this.activitiesManager.forPeriod(user_id, new Period(body_.beginning_timestamp, body_.end_timestamp)));
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
            {
                res.send(await this.activitiesManager.latest(user_id));
                console.log(await this.activitiesManager.latest(user_id))
            }
            else
                res.sendStatus(StatusCodes.UNAUTHORIZED);
        });
    }

    statistics() // res: activity_statistics_type
    {
        this.router_.post("/" + this.statistics.name, async (req, res) =>
        {
            const body_: activity_statistics_request_type = req.body as activity_statistics_request_type;

            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            try
            {
                if (user_id && body_.activity_name)
                {
                    const response_ = await this.statisticsService.activity_statistics(user_id, new Period(body_.beginning_timestamp, body_.end_timestamp), body_.activity_name);

                    res.send(response_);
                }
                else
                    res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
            catch (e)
            {
                console.log(this.statistics.name);
                console.log(e);

                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        })
    }
}
