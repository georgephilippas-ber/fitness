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
exports.SeriesUpdateGeneric = void 0;
const period_1 = require("@sprinter-common/features/time/period/period");
const time_series_update_1 = require("../../../base/time-series/time-series-update");
class SeriesUpdateGeneric extends time_series_update_1.TimeSeriesUpdate {
    constructor(timeSeriesManager, timeSeriesClient, client_aspect) {
        super(timeSeriesManager, timeSeriesClient);
        this.client_aspect = client_aspect;
    }
    update(user_id, drop = false) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user_id, this.timeSeriesManager.constructor.name, this.timeSeriesClient.constructor.name);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (drop)
                    yield this.timeSeriesManager.drop();
                const latest_entry = yield this.timeSeriesManager.latest(user_id);
                let updatePeriod = latest_entry ? new period_1.Period((0, period_1.day_fromMillis)(latest_entry.referenceDate, "beginning").toMillis()) : new period_1.Period(period_1.global_beginning.toMillis());
                try {
                    console.log("CLIENT - UPDATING", this.timeSeriesClient.constructor.name);
                    const activities_ = yield this.timeSeriesClient.request(user_id, updatePeriod, this.client_aspect);
                    console.log("DONE", this.timeSeriesClient.constructor.name);
                    console.log("MANAGER - UPDATING", this.timeSeriesManager.constructor.name);
                    if (yield this.timeSeriesManager.update(activities_))
                        resolve(true);
                    else
                        resolve(false);
                    console.log("DONE", this.timeSeriesManager.constructor.name);
                }
                catch (e) {
                    resolve(false);
                    console.log("ERROR UPDATING", this.constructor.name, this.timeSeriesClient.constructor.name, this.timeSeriesManager.constructor.name);
                }
                finally {
                    console.log("DONE", this.timeSeriesManager.constructor.name, this.timeSeriesClient.constructor.name, this.client_aspect);
                }
            }));
        });
    }
}
exports.SeriesUpdateGeneric = SeriesUpdateGeneric;
