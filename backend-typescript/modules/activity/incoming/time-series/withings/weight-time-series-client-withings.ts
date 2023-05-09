import {WithingsClient} from "../../clients/withings/withings";
import {ClientTimeSeriesBase} from "../../../../base/time-series/client-time-series-base";

import {Period} from "@sprinter-common/features/time/period/period";
import {client_aspect_type, weight_interface} from "../../../schema/schema";

export class Weight_TimeSeriesClient_Withings extends ClientTimeSeriesBase
{
    constructor(private withingsClient_raw: WithingsClient)
    {
        super();

        console.log("WITHINGS Client")
    }

    async request(user_id: number, period: Period, aspect: client_aspect_type = "weight"): Promise<weight_interface[]>
    {
        switch (aspect)
        {
            case "weight":
                return this.withingsClient_raw.request(user_id, period);
            default:
                return [];
        }
    }
}
