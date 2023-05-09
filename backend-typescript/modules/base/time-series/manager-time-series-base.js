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
exports.TimeSeriesManager = void 0;
const period_1 = require("@sprinter-common/features/time/period/period");
const manager_1 = require("../../../core/base/managers/manager");
class TimeSeriesManager extends manager_1.Manager {
    constructor(databaseProvider, collectionName) {
        super(databaseProvider, collectionName);
        this.databaseProvider = databaseProvider;
        this.collectionName = collectionName;
    }
    update(elements) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return elements.map(value => {
                    return this.upsertOne({ referenceDate: value.referenceDate }, value);
                }).every(value => value);
            }
            catch (e) {
                console.log(e.message);
                console.log(this.update.name);
                return false;
            }
        });
    }
    latest(user_id, period = new period_1.Period()) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (_a = (yield this.collection().find({
                    user_id, referenceDate: {
                        "$gte": period.getBeginning(),
                        "$lte": period.getEnd()
                    }
                }).sort({ referenceDate: "descending" }).limit(1).toArray())) === null || _a === void 0 ? void 0 : _a[0];
            }
            catch (e) {
                console.log(e.message);
                console.log(this.latest.name);
                return undefined;
            }
        });
    }
    forPeriod(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection().find({
                user_id, referenceDate: {
                    "$gte": period.getBeginning(),
                    "$lte": period.getEnd()
                }
            }).sort("referenceDate", "descending").toArray());
        });
    }
}
exports.TimeSeriesManager = TimeSeriesManager;
