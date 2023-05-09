import {DatabaseProvider} from "../../../core/database-provider/database-provider";
import {Period} from "@sprinter-common/features/time/period/period";
import {Manager} from "../../../core/base/managers/manager";

export class TimeSeriesManager<T extends { user_id: number, referenceDate: number }> extends Manager<T>
{
    constructor(protected databaseProvider: DatabaseProvider, protected collectionName: string)
    {
        super(databaseProvider, collectionName);
    }

    async update(elements: T[]): Promise<boolean>
    {
        try
        {
            return elements.map(value =>
            {
                return this.upsertOne({referenceDate: value.referenceDate} as any, value);
            }).every(value => value);
        }
        catch (e)
        {
            console.log((e as Error).message);
            console.log(this.update.name);

            return false;
        }
    }

    async latest(user_id: number, period: Period = new Period()): Promise<T | undefined>
    {
        try
        {
            return (await this.collection().find({
                user_id, referenceDate: {
                    "$gte": period.getBeginning(),
                    "$lte": period.getEnd()
                }
            } as any).sort({referenceDate: "descending"}).limit(1).toArray())?.[0] as T | undefined
        }
        catch (e)
        {
            console.log((e as Error).message);
            console.log(this.latest.name);

            return undefined;
        }
    }

    async forPeriod(user_id: number, period: Period): Promise<T[]>
    {
        return (await this.collection().find({
            user_id, referenceDate:
                {
                    "$gte": period.getBeginning(),
                    "$lte": period.getEnd()
                }
        } as any).sort("referenceDate", "descending").toArray()) as T[];
    }
}
