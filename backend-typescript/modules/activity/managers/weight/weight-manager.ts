import {DatabaseProvider} from "../../../../core/database-provider/database-provider";
import {TimeSeriesManager} from "../../../base/time-series/manager-time-series-base";
import {weight_interface} from "@sprinter-common/schema/activities/activities";

export class WeightManager extends TimeSeriesManager<weight_interface>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, WeightManager.name);
    }
}
