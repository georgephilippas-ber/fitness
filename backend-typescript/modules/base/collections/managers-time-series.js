"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagersTimeSeries = void 0;
const weight_manager_1 = require("../../activity/managers/weight/weight-manager");
const activity_manager_1 = require("../../activity/managers/activity/activity-manager");
const activities_manager_1 = require("../../activity/managers/activity/activities-manager");
class ManagersTimeSeries {
    constructor(databaseProvider) {
        this.databaseProvider = databaseProvider;
        this.managers =
            {
                weight: new weight_manager_1.WeightManager(databaseProvider),
                activity: new activity_manager_1.ActivityManager(databaseProvider),
                activities: new activities_manager_1.ActivitiesManager(databaseProvider)
            };
    }
    getManager(client_aspect) {
        switch (client_aspect) {
            case "activities":
                return this.managers.activities;
            case "weight":
                return this.managers.weight;
            case "activity":
                return this.managers.activity;
        }
    }
    all() {
        return Object.keys(this.managers).map((value) => this.managers[value]);
    }
}
exports.ManagersTimeSeries = ManagersTimeSeries;
