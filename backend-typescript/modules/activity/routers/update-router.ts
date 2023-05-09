import {Router} from "../../../core/base/routers/router";
import {AuthenticationFeature} from "../../../core/features/authentication/authentication-feature";
import {StatusCodes} from "http-status-codes";
import {
    activity_user_information_type,
    ActivityUserInformationManager
} from "../managers/user-information/user-information";
import {ClientsTimeSeries} from "../../base/collections/clients-time-series";
import {ManagersTimeSeries} from "../../base/collections/managers-time-series";

export class UpdateRouter extends Router
{
    constructor(private clients: ClientsTimeSeries, private timeSeriesManagers: ManagersTimeSeries, private activityUserInformationManager: ActivityUserInformationManager, private authenticationFeature: AuthenticationFeature)
    {
        super("update");

        this.update();
    }

    update()
    {
        this.router_.post("/update", async (req, res) =>
        {
            const user_id: number | undefined = this.authenticationFeature.getAuthenticatedUser_req(req);

            if (user_id)
            {
                const activity_user_information: activity_user_information_type | null = await this.activityUserInformationManager.byId(user_id);

                if (activity_user_information)
                {
                    const iterable_ = await this.activityUserInformationManager.iterateById(user_id)

                    const update_outcome = await Promise.all(iterable_.map(value =>
                    {
                        return this.clients.update(user_id, value[0], value[1]);
                    }));

                    const response_: any = {};

                    for (let i = 0; i < iterable_.length; i++)
                    {
                        response_[iterable_[i][0]] = update_outcome[i];
                    }

                    res.send(response_);


                }
                else
                    res.sendStatus(StatusCodes.UNAUTHORIZED);

            }
            else
                res.sendStatus(StatusCodes.UNAUTHORIZED);
        });
    }
}
