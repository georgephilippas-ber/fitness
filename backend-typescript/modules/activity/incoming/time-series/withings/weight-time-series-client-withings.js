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
exports.Weight_TimeSeriesClient_Withings = void 0;
const client_time_series_base_1 = require("../../../../base/time-series/client-time-series-base");
class Weight_TimeSeriesClient_Withings extends client_time_series_base_1.ClientTimeSeriesBase {
    constructor(withingsClient_raw) {
        super();
        this.withingsClient_raw = withingsClient_raw;
        console.log("WITHINGS Client");
    }
    request(user_id, period, aspect = "weight") {
        return __awaiter(this, void 0, void 0, function* () {
            switch (aspect) {
                case "weight":
                    return this.withingsClient_raw.request(user_id, period);
                default:
                    return [];
            }
        });
    }
}
exports.Weight_TimeSeriesClient_Withings = Weight_TimeSeriesClient_Withings;
