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
exports.ClientsTimeSeries = void 0;
const fitbit_1 = require("../../activity/incoming/clients/fitbit/fitbit");
const withings_1 = require("../../activity/incoming/clients/withings/withings");
const activity_time_series_client_fitbit_1 = require("../../activity/incoming/time-series/fitbit/activity-time-series-client-fitbit");
const activities_time_series_client_fitbit_1 = require("../../activity/incoming/time-series/fitbit/activities-time-series-client-fitbit");
const weight_time_series_client_withings_1 = require("../../activity/incoming/time-series/withings/weight-time-series-client-withings");
const random_1 = require("../../activity/incoming/time-series/random/random");
const series_update_generic_1 = require("../../activity/services/update/series-update-generic");
class ClientsTimeSeries {
    constructor(timeSeriesManagers, authorizationManager, userManager, statisticsService, authorizationService) {
        this.timeSeriesManagers = timeSeriesManagers;
        this.authorizationManager = authorizationManager;
        this.userManager = userManager;
        this.statisticsService = statisticsService;
        this.authorizationService = authorizationService;
        this.fitbitClient = new fitbit_1.FitbitClient(authorizationService, authorizationManager);
        this.withingsClient = new withings_1.WithingsClient(authorizationService, authorizationManager, userManager);
        this.clients =
            {
                "weight": {
                    withings: new weight_time_series_client_withings_1.Weight_TimeSeriesClient_Withings(this.withingsClient),
                    random: new random_1.WeightRandom()
                },
                "activities": {
                    fitbit: new activities_time_series_client_fitbit_1.Activities_TimeSeriesClient_Fitbit(this.fitbitClient),
                    random: new random_1.ActivitiesRandom()
                },
                "activity": {
                    fitbit: new activity_time_series_client_fitbit_1.Activity_TimeSeriesClient_Fitbit(this.fitbitClient),
                    random: new random_1.ActivityRandom()
                }
            };
    }
    update(user_id, client_aspect, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.clients[client_aspect][provider]) {
                const updater = new series_update_generic_1.SeriesUpdateGeneric(this.timeSeriesManagers.getManager(client_aspect), this.clients[client_aspect][provider], client_aspect);
                return updater.update(user_id);
            }
            else {
                console.log(client_aspect, provider, "not registered");
                return false;
            }
        });
    }
}
exports.ClientsTimeSeries = ClientsTimeSeries;
