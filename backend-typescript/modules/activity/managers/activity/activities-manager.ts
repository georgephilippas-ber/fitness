import {DatabaseProvider} from "../../../../core/database-provider/database-provider";
import {Period} from "@sprinter-common/features/time/period/period";
import {TimeSeriesManager} from "../../../base/time-series/manager-time-series-base";
import {activity_interface_base} from "../../schema/schema";

export class ActivitiesManager extends TimeSeriesManager<activity_interface_base>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, ActivitiesManager.name);
    }

    async update(activities: activity_interface_base[]): Promise<boolean>
    {
        try
        {
            return activities.map(value =>
            {
                return this.upsertOne({referenceDate: value.referenceDate}, value);
            }).every(value => value);
        }
        catch (e)
        {
            console.log((e as Error).message);
            console.log(this.update.name);

            return false;
        }
    }

    async latest(user_id: number, period: Period = new Period()): Promise<activity_interface_base | undefined>
    {
        try
        {
            return (await this.collection().find({
                user_id, referenceDate:
                    {
                        "$gte": period.getBeginning(),
                        "$lte": period.getEnd()
                    }
            }).sort({referenceDate: "descending"}).limit(1).toArray())?.[0]
        }
        catch (e)
        {
            console.log((e as Error).message);
            console.log(this.latest.name);

            return undefined;
        }
    }
}
