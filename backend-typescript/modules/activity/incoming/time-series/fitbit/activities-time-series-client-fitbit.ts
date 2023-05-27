import {ClientTimeSeriesBase} from "../../../../base/time-series/client-time-series-base";
import {FitbitClient} from "../../clients/fitbit/fitbit";
import {Period} from "@sprinter-common/features/time/period/period";
import {activity_interface_base, client_aspect_type} from "@sprinter-common/schema/activities/activities";

export class Activities_TimeSeriesClient_Fitbit extends ClientTimeSeriesBase
{
    constructor(private fitbitClient_raw: FitbitClient)
    {
        super();

        console.log("FITBIT Client");
    }

    async request(user_id: number, period: Period, client_aspect: client_aspect_type = "activities"): Promise<activity_interface_base[]>
    {
        switch (client_aspect)
        {
            case "activities":
                return this.fitbitClient_raw.getActivities_global(user_id, period);
            default:
                return [];
        }
    }
}
