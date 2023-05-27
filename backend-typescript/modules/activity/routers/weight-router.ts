import {Router} from "../../../core/base/routers/router";
import {WeightManager} from "../managers/weight/weight-manager";
import {AuthenticationFeature} from "../../../core/features/authentication/authentication-feature";
import {Period} from "@sprinter-common/features/time/period/period";
import {StatusCodes} from "http-status-codes";
import {StatisticsService} from "../services/statistics/statistics-service";
import {time_series_request_base_interface} from "@sprinter-common/schema/activities/activities";

export class WeightRouter extends Router
{
    constructor(private weightManager: WeightManager, private statisticsService: StatisticsService, private authenticationFeature: AuthenticationFeature)
    {
        super("weight");

        this.all();
        this.latest();
        this.statistics();
    }

    all()
    {
        this.router_.post("/" + this.all.name, async (req, res) =>
        {
            const body_: time_series_request_base_interface = req.body as time_series_request_base_interface;
            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            if (user_id)
            {
                res.send(await this.weightManager.forPeriod(user_id, new Period(body_.beginning_timestamp, body_.end_timestamp)));
            }
            else
                res.sendStatus(StatusCodes.UNAUTHORIZED);
        });
    }

    latest()
    {
        this.router_.post("/" + this.latest.name, async (req, res) =>
        {
            const body_: time_series_request_base_interface = req.body as time_series_request_base_interface;
            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            console.log(user_id);

            if (user_id)
            {
                res.send(await this.weightManager.latest(user_id, new Period(body_.beginning_timestamp, body_.end_timestamp)));
            }
            else
                res.sendStatus(StatusCodes.UNAUTHORIZED);
        });
    }

    statistics()
    {
        this.router_.post("/" + this.statistics.name, async (req, res) =>
        {
            const body_: time_series_request_base_interface = req.body as time_series_request_base_interface;

            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            try
            {
                if (user_id)
                    res.send(await this.statisticsService.weight_statistics(user_id, new Period(body_.beginning_timestamp, body_.end_timestamp)));
                else
                    res.sendStatus(StatusCodes.UNAUTHORIZED);
            }
            catch (e)
            {
                console.log(this.statistics.name, this.constructor.name);

                res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
