"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeightManager = void 0;
const manager_time_series_base_1 = require("../../../base/time-series/manager-time-series-base");
class WeightManager extends manager_time_series_base_1.TimeSeriesManager {
    constructor(databaseProvider) {
        super(databaseProvider, WeightManager.name);
    }
}
exports.WeightManager = WeightManager;
