"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("./core/database-provider/database-provider");
const RESTful_1 = require("./core/server/RESTful/RESTful");
const user_manager_1 = require("./model/managers/user/user-manager");
const user_router_1 = require("./model/routers/user/user-router");
const authentication_feature_1 = require("./core/features/authentication/authentication-feature");
const authentication_manager_1 = require("./model/managers/authentication/authentication-manager");
const authentication_router_1 = require("./model/routers/authentication/authentication-router");
const authentication_service_1 = require("./model/services/authentication/authentication-service");
const registry_1 = require("./core/registry/registry");
const users_page_1 = require("./model/pages/users-page");
const authorization_1 = require("./core/features/authorization/authorization");
const activities_router_1 = require("./modules/activity/routers/activities-router");
const statistics_service_1 = require("./modules/activity/services/statistics/statistics-service");
const location_1 = require("./configuration/servers/location");
const activity_router_1 = require("./modules/activity/routers/activity-router");
const weight_router_1 = require("./modules/activity/routers/weight-router");
const update_router_1 = require("./modules/activity/routers/update-router");
const clients_time_series_1 = require("./modules/base/collections/clients-time-series");
const user_information_1 = require("./modules/activity/managers/user-information/user-information");
const seed_1 = require("./executables/seed/seed");
const managers_time_series_1 = require("./modules/base/collections/managers-time-series");
const product_manager_1 = require("./modules/nutrition/managers/product-manager");
const product_router_1 = require("./modules/nutrition/routers/product-router");
const databaseProvider = new database_provider_1.DatabaseProvider({
    uri: location_1.servers.mongodb.url,
    db: "corporate"
});
const userManager = new user_manager_1.UserManager(databaseProvider);
const authenticationManager = new authentication_manager_1.AuthenticationManager(databaseProvider);
const authenticationService = new authentication_service_1.AuthenticationService(userManager, authenticationManager);
const authenticationFeature = new authentication_feature_1.AuthenticationFeature("SECRET");
const userRouter = new user_router_1.UserRouter(userManager);
const authenticationRouter = new authentication_router_1.AuthenticationRouter(userManager, authenticationService, authenticationFeature);
const registry = new registry_1.Registry(authenticationFeature, [new users_page_1.UsersPage(authenticationFeature, userManager)]);
const authorizationManager = new authorization_1.AuthorizationManager(databaseProvider);
const authorizationService = new authorization_1.AuthorizationService(authorizationManager);
const authorizationRouter = new authorization_1.AuthorizationRouter(authorizationManager);
const timeSeriesManagers = new managers_time_series_1.ManagersTimeSeries(databaseProvider);
const activityUserInformationManager = new user_information_1.ActivityUserInformationManager(databaseProvider);
const statisticsService = new statistics_service_1.StatisticsService(timeSeriesManagers.getManager("activities"), timeSeriesManagers.getManager("weight"));
const clients = new clients_time_series_1.ClientsTimeSeries(timeSeriesManagers, authorizationManager, userManager, statisticsService, authorizationService);
const activitiesRouter = new activities_router_1.ActivitiesRouter(timeSeriesManagers.getManager("activities"), statisticsService, authenticationFeature);
const activityRouter = new activity_router_1.ActivityRouter(timeSeriesManagers.getManager("activity"), authenticationFeature);
const weightRouter = new weight_router_1.WeightRouter(timeSeriesManagers.getManager("weight"), statisticsService, authenticationFeature);
const updateRouter = new update_router_1.UpdateRouter(clients, timeSeriesManagers, activityUserInformationManager, authenticationFeature);
const productManager = new product_manager_1.ProductManager(databaseProvider);
const productRouter = new product_router_1.ProductRouter(productManager);
const customRouters = [activitiesRouter, activityRouter, weightRouter, updateRouter, productRouter];
const drop = (managers) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(managers.map(value => value.drop()));
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const main_server = new RESTful_1.RESTful(location_1.servers.backend.port, [userRouter, authenticationRouter, authorizationRouter, ...customRouters], registry, authenticationFeature, authenticationService);
        // await drop(timeSeriesManagers.all());
        yield (0, seed_1.seed)(userManager, authenticationManager, activityUserInformationManager);
        console.log((yield userManager.all())[0].username, (yield userManager.all())[0].email);
        console.log((yield userManager.all())[1].username, (yield userManager.all())[1].email);
        authorizationRouter.clientSuccessfullyAuthorizedObservable().subscribe((value) => __awaiter(this, void 0, void 0, function* () {
            switch (value.client_identifier) {
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
        }));
        yield (0, RESTful_1.run_RESTful)([main_server], databaseProvider, () => __awaiter(this, void 0, void 0, function* () {
        }));
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
    });
}
function index() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
main();
index();
