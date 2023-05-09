import {Manager} from "./core/base/managers/manager";

import {DatabaseProvider} from "./core/database-provider/database-provider";

import {RESTful, run_RESTful} from "./core/server/RESTful/RESTful";

import {UserManager} from "./model/managers/user/user-manager";
import {UserRouter} from "./model/routers/user/user-router";

import {AuthenticationFeature} from "./core/features/authentication/authentication-feature";

import {AuthenticationManager} from "./model/managers/authentication/authentication-manager";
import {AuthenticationRouter} from "./model/routers/authentication/authentication-router";
import {AuthenticationService} from "./model/services/authentication/authentication-service";

import {Registry} from "./core/registry/registry";
import {UsersPage} from "./model/pages/users-page";
import {
    AuthorizationManager,
    AuthorizationRouter,
    AuthorizationService
} from "./core/features/authorization/authorization";
import {ActivitiesRouter} from "./modules/activity/routers/activities-router";

import {ActivitiesManager} from "./modules/activity/managers/activity/activities-manager";
import {WeightManager} from "./modules/activity/managers/weight/weight-manager";

import {StatisticsService} from "./modules/activity/services/statistics/statistics-service";

import {servers} from "./configuration/servers/location";
import {ActivityManager} from "./modules/activity/managers/activity/activity-manager";
import {ActivityRouter} from "./modules/activity/routers/activity-router";
import {WeightRouter} from "./modules/activity/routers/weight-router";
import {UpdateRouter} from "./modules/activity/routers/update-router";
import {ClientsTimeSeries} from "./modules/base/collections/clients-time-series";
import {ActivityUserInformationManager} from "./modules/activity/managers/user-information/user-information";
import {seed} from "./executables/seed/seed";
import {ManagersTimeSeries} from "./modules/base/collections/managers-time-series";
import {ProductManager} from "./modules/nutrition/managers/product-manager";
import {ProductRouter} from "./modules/nutrition/routers/product-router";

const databaseProvider = new DatabaseProvider({
    uri: servers.mongodb.url,
    db: "corporate"
});

const userManager = new UserManager(databaseProvider);
const authenticationManager = new AuthenticationManager(databaseProvider);

const authenticationService = new AuthenticationService(userManager, authenticationManager);
const authenticationFeature = new AuthenticationFeature("SECRET");

const userRouter = new UserRouter(userManager);

const authenticationRouter = new AuthenticationRouter(userManager, authenticationService, authenticationFeature);

const registry: Registry = new Registry(authenticationFeature, [new UsersPage(authenticationFeature, userManager)]);

const authorizationManager = new AuthorizationManager(databaseProvider);
const authorizationService = new AuthorizationService(authorizationManager);
const authorizationRouter = new AuthorizationRouter(authorizationManager);

const timeSeriesManagers: ManagersTimeSeries = new ManagersTimeSeries(databaseProvider);

const activityUserInformationManager: ActivityUserInformationManager = new ActivityUserInformationManager(databaseProvider);

const statisticsService = new StatisticsService(timeSeriesManagers.getManager("activities") as ActivitiesManager, timeSeriesManagers.getManager("weight") as WeightManager);

const clients: ClientsTimeSeries = new ClientsTimeSeries(timeSeriesManagers, authorizationManager, userManager, statisticsService, authorizationService);

const activitiesRouter = new ActivitiesRouter(timeSeriesManagers.getManager("activities") as ActivitiesManager, statisticsService, authenticationFeature);
const activityRouter: ActivityRouter = new ActivityRouter(timeSeriesManagers.getManager("activity") as ActivityManager, authenticationFeature);
const weightRouter: WeightRouter = new WeightRouter(timeSeriesManagers.getManager("weight") as WeightManager, statisticsService, authenticationFeature);

const updateRouter: UpdateRouter = new UpdateRouter(clients, timeSeriesManagers, activityUserInformationManager, authenticationFeature);

const productManager = new ProductManager(databaseProvider);
const productRouter = new ProductRouter(productManager);

const customRouters = [activitiesRouter, activityRouter, weightRouter, updateRouter, productRouter];

const drop = async (managers: Manager<any>[]): Promise<void> =>
{
    await Promise.all(managers.map(value => value.drop()));
};

async function main()
{
    const main_server: RESTful = new RESTful(servers.backend.port as number, [userRouter, authenticationRouter, authorizationRouter, ...customRouters], registry, authenticationFeature, authenticationService);


    // await drop(timeSeriesManagers.all());
    await seed(userManager, authenticationManager, activityUserInformationManager);

    console.log((await userManager.all())[0].username, (await userManager.all())[0].email);
    console.log((await userManager.all())[1].username, (await userManager.all())[1].email);

    authorizationRouter.clientSuccessfullyAuthorizedObservable().subscribe(async value =>
    {
        switch (value.client_identifier)
        {
            case "fitbit":
                console.log("fitbit");
                // await clients.update(value.user_id, "activity", "fitbit");
                // await clients.update(value.user_id, "activities", "fitbit");
                break;
            case "withings":
                console.log("withings");
                // await clients.update(value.user_id, "weight", "withings");
                break;
        }
    });

    await run_RESTful([main_server], databaseProvider, async () =>
    {
    });

    // const wsServer = new SeriesUpdateServer(4097, {
    //     activities: activitiesUpdate,
    //     intake: intakeUpdate,
    //     activity: activityUpdate,
    //     weight: weightUpdate
    // }, authenticationFeature);
    //
    // wsServer.setup();
    // wsServer.start();
    //
    // await input();
    // wsServer.stop();
}

async function index()
{
}

main();
index();
