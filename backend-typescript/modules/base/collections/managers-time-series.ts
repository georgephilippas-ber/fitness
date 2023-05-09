import {Manager} from "../../../core/base/managers/manager";
import {DatabaseProvider} from "../../../core/database-provider/database-provider";
import {WeightManager} from "../../activity/managers/weight/weight-manager";
import {ActivityManager} from "../../activity/managers/activity/activity-manager";
import {ActivitiesManager} from "../../activity/managers/activity/activities-manager";
import {client_aspect_type} from "../../activity/schema/schema";

export class ManagersTimeSeries
{
    managers: {
        [key in client_aspect_type]: Manager<any>
    }

    constructor(private databaseProvider: DatabaseProvider)
    {
        this.managers =
            {
                weight: new WeightManager(databaseProvider),
                activity: new ActivityManager(databaseProvider),
                activities: new ActivitiesManager(databaseProvider)
            }
    }

    getManager(client_aspect: client_aspect_type)
    {
        switch (client_aspect)
        {
            case "activities":
                return this.managers.activities as ActivitiesManager;
            case "weight":
                return this.managers.weight as WeightManager;
            case "activity":
                return this.managers.activity as ActivityManager;
        }
    }

    all(): Manager<any>[]
    {
        return Object.keys(this.managers).map((value: any) => this.managers[value as client_aspect_type]);
    }
}
