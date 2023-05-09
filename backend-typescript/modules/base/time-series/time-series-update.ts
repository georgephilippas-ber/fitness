import {ClientTimeSeriesBase} from "./client-time-series-base";
import {TimeSeriesManager} from "./manager-time-series-base";

export abstract class TimeSeriesUpdate<T extends { user_id: number, referenceDate: number }>
{
    protected constructor(protected timeSeriesManager: TimeSeriesManager<T>, protected timeSeriesClient: ClientTimeSeriesBase)
    {
    }

    abstract update(user_id: number): Promise<boolean>;
}
