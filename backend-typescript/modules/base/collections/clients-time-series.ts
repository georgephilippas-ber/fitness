import {ClientTimeSeriesBase} from "../time-series/client-time-series-base";
import {AuthorizationManager, AuthorizationService} from "../../../core/features/authorization/authorization";
import {UserManager} from "../../../model/managers/user/user-manager";
import {FitbitClient} from "../../activity/incoming/clients/fitbit/fitbit";
import {WithingsClient} from "../../activity/incoming/clients/withings/withings";
import {
    Activity_TimeSeriesClient_Fitbit
} from "../../activity/incoming/time-series/fitbit/activity-time-series-client-fitbit";
import {
    Activities_TimeSeriesClient_Fitbit
} from "../../activity/incoming/time-series/fitbit/activities-time-series-client-fitbit";
import {
    Weight_TimeSeriesClient_Withings
} from "../../activity/incoming/time-series/withings/weight-time-series-client-withings";
import {ActivitiesRandom, ActivityRandom, WeightRandom} from "../../activity/incoming/time-series/random/random";
import {StatisticsService} from "../../activity/services/statistics/statistics-service";
import {SeriesUpdateGeneric} from "../../activity/services/update/series-update-generic";
import {ManagersTimeSeries} from "./managers-time-series";
import {client_aspect_type, clients_type, provider_type} from "@sprinter-common/schema/activities/activities";

export class ClientsTimeSeries
{
    private readonly clients: clients_type<ClientTimeSeriesBase>;

    private readonly fitbitClient: FitbitClient;
    private readonly withingsClient: WithingsClient;

    constructor(private timeSeriesManagers: ManagersTimeSeries, private authorizationManager: AuthorizationManager, private userManager: UserManager, private statisticsService: StatisticsService, private authorizationService: AuthorizationService)
    {
        this.fitbitClient = new FitbitClient(authorizationService, authorizationManager);
        this.withingsClient = new WithingsClient(authorizationService, authorizationManager, userManager);

        this.clients =
            {
                "weight":
                    {
                        withings: new Weight_TimeSeriesClient_Withings(this.withingsClient),
                        random: new WeightRandom()
                    },
                "activities":
                    {
                        fitbit: new Activities_TimeSeriesClient_Fitbit(this.fitbitClient),
                        random: new ActivitiesRandom()
                    },
                "activity":
                    {
                        fitbit: new Activity_TimeSeriesClient_Fitbit(this.fitbitClient),
                        random: new ActivityRandom()
                    }
            }
    }

    async update(user_id: number, client_aspect: client_aspect_type, provider: provider_type): Promise<boolean>
    {
        if (this.clients[client_aspect][provider])
        {
            const updater = new SeriesUpdateGeneric<any>(this.timeSeriesManagers.getManager(client_aspect), this.clients[client_aspect][provider] as ClientTimeSeriesBase, client_aspect);

            return updater.update(user_id);

        }
        else
        {
            console.log(client_aspect, provider, "not registered");

            return false;
        }
    }
}
