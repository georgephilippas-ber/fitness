import {DatabaseProvider} from "../../../../core/database-provider/database-provider";
import {TimeSeriesManager} from "../../../base/time-series/manager-time-series-base";
import {daily_activity_type} from "../../schema/schema";

export class ActivityManager extends TimeSeriesManager<daily_activity_type>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, ActivityManager.name);
    }
}
