"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityManager = void 0;
const manager_time_series_base_1 = require("../../../base/time-series/manager-time-series-base");
class ActivityManager extends manager_time_series_base_1.TimeSeriesManager {
    constructor(databaseProvider) {
        super(databaseProvider, ActivityManager.name);
    }
}
exports.ActivityManager = ActivityManager;
