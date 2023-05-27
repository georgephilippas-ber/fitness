import {ClientTimeSeriesBase} from "../../../../base/time-series/client-time-series-base";
import {FitbitClient} from "../../clients/fitbit/fitbit";
import {Period} from "@sprinter-common/features/time/period/period";
import {client_aspect_type, daily_activity_type} from "@sprinter-common/schema/activities/activities";

export class Activity_TimeSeriesClient_Fitbit extends ClientTimeSeriesBase
{
    constructor(private fitbitClient_raw: FitbitClient)
    {
        super();

        console.log("FITBIT Client - Activity");
    }

    async request(user_id: number, period: Period, client_aspect: client_aspect_type = "activity"): Promise<daily_activity_type[]>
    {
        switch (client_aspect)
        {
            case "activity":
                return this.fitbitClient_raw.getActivityTimeSeries(user_id, period);
            default:
                return [];
        }
    }
}

