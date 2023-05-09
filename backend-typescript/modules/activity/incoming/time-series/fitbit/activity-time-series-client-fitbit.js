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
exports.Activity_TimeSeriesClient_Fitbit = void 0;
const client_time_series_base_1 = require("../../../../base/time-series/client-time-series-base");
class Activity_TimeSeriesClient_Fitbit extends client_time_series_base_1.ClientTimeSeriesBase {
    constructor(fitbitClient_raw) {
        super();
        this.fitbitClient_raw = fitbitClient_raw;
        console.log("FITBIT Client - Activity");
    }
    request(user_id, period, client_aspect = "activity") {
        return __awaiter(this, void 0, void 0, function* () {
            switch (client_aspect) {
                case "activity":
                    return this.fitbitClient_raw.getActivityTimeSeries(user_id, period);
                default:
                    return [];
            }
        });
    }
}
exports.Activity_TimeSeriesClient_Fitbit = Activity_TimeSeriesClient_Fitbit;
