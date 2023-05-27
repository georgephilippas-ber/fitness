import {ClientTimeSeriesBase} from "../../../base/time-series/client-time-series-base";
import {day_fromMillis, global_beginning, Period} from "@sprinter-common/features/time/period/period";

import {TimeSeriesUpdate} from "../../../base/time-series/time-series-update";
import {TimeSeriesManager} from "../../../base/time-series/manager-time-series-base";
import {client_aspect_type} from "@sprinter-common/schema/activities/activities";

export class SeriesUpdateGeneric<T extends { user_id: number, referenceDate: number }> extends TimeSeriesUpdate<T>
{
    constructor(timeSeriesManager: TimeSeriesManager<T>, timeSeriesClient: ClientTimeSeriesBase, private client_aspect: client_aspect_type)
    {
        super(timeSeriesManager, timeSeriesClient);
    }

    async update(user_id: number, drop: boolean = false): Promise<boolean>
    {
        console.log(user_id, this.timeSeriesManager.constructor.name, this.timeSeriesClient.constructor.name);

        return new Promise<boolean>(async (resolve, reject) =>
        {
            if (drop)
                await this.timeSeriesManager.drop();

            const latest_entry = await this.timeSeriesManager.latest(user_id);

            let updatePeriod: Period = latest_entry ? new Period(day_fromMillis(latest_entry.referenceDate, "beginning").toMillis()) : new Period(global_beginning.toMillis());

            try
            {
                console.log("CLIENT - UPDATING", this.timeSeriesClient.constructor.name);
                const activities_ = await this.timeSeriesClient.request(user_id, updatePeriod, this.client_aspect);
                console.log("DONE", this.timeSeriesClient.constructor.name);

                console.log("MANAGER - UPDATING", this.timeSeriesManager.constructor.name);
                if (await this.timeSeriesManager.update(activities_))
                    resolve(true)
                else
                    resolve(false);
                console.log("DONE", this.timeSeriesManager.constructor.name);
            }
            catch (e)
            {
                resolve(false);

                console.log("ERROR UPDATING", this.constructor.name, this.timeSeriesClient.constructor.name, this.timeSeriesManager.constructor.name);
            }
            finally
            {
                console.log("DONE", this.timeSeriesManager.constructor.name, this.timeSeriesClient.constructor.name, this.client_aspect);
            }
        });
    }
}
