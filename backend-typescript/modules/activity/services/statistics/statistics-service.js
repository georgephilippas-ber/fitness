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
exports.StatisticsService = void 0;
const period_1 = require("@sprinter-common/features/time/period/period");
const luxon_1 = require("luxon");
class StatisticsService {
    constructor(activityManager, weightManager) {
        this.activityManager = activityManager;
        this.weightManager = weightManager;
    }
    activity_statistics(user_id, period, activity_name) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline_ = [
                {
                    "$match": {
                        user_id,
                        "$and": [{
                                referenceDate: {
                                    "$gte": period.getBeginning()
                                }
                            },
                            {
                                referenceDate: {
                                    "$lte": period.getEnd()
                                }
                            },
                        ]
                    }
                },
                {
                    "$group": {
                        "_id": null,
                        activities_count: {
                            "$sum": 1
                        },
                        activeZoneMinutes_total: {
                            "$sum": "$activeZoneMinutes"
                        },
                        activeZoneMinutes_average: {
                            "$avg": "$activeZoneMinutes"
                        },
                        distance_total: {
                            "$sum": "$distance"
                        },
                        distance_average: {
                            "$avg": "$distance"
                        },
                        calories_total: {
                            "$sum": "$calories"
                        },
                        calories_average: {
                            "$avg": "$calories"
                        },
                        duration_total: {
                            "$sum": "$duration"
                        },
                        duration_average: {
                            "$avg": "$duration"
                        },
                        average_heart_rate: {
                            "$avg": "$averageHeartRate"
                        },
                        beginning_timestamp: {
                            "$min": "$referenceDate"
                        },
                        end_timestamp: {
                            "$max": "$referenceDate"
                        }
                    }
                },
            ];
            if ((activity_name === null || activity_name === void 0 ? void 0 : activity_name[0]) !== "all")
                pipeline_[0]["$match"]["$or"] = activity_name.map(value => {
                    return {
                        "name": value
                    };
                });
            const aggregate_ = (_a = (yield this.activityManager.collection().aggregate(pipeline_).toArray())) === null || _a === void 0 ? void 0 : _a[0];
            return aggregate_ ? {
                name: "aggregate",
                user_id,
                beginning_timestamp: isFinite(period.getBeginning()) ? Math.max(period.getBeginning(), period_1.global_beginning.toMillis()) : period_1.global_beginning.toMillis(),
                end_timestamp: isFinite(period.getEnd()) ? period.getEnd() : luxon_1.DateTime.now().toMillis(),
                distance: {
                    total: aggregate_["distance_total"],
                    average: aggregate_["distance_average"]
                },
                duration: {
                    total: aggregate_["duration_total"],
                    average: aggregate_["duration_average"]
                },
                calories: {
                    total: aggregate_["calories_total"],
                    average: aggregate_["calories_average"]
                },
                activities_count: aggregate_["activities_count"],
                average_heart_rate: aggregate_["average_heart_rate"],
                activeZoneMinutes: {
                    total: aggregate_["activeZoneMinutes_total"],
                    average: aggregate_["activeZoneMinutes_average"],
                }
            } : undefined;
        });
    }
    weight_statistics(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            const measurements_ = yield (this.weightManager.collection().find({
                user_id,
                referenceDate: {
                    "$gte": period.getBeginning(),
                    "$lte": period.getEnd()
                }
            }).sort("referenceDate", "ascending")).toArray();
            if (measurements_.length) {
                const firstMeasurement = measurements_[0];
                const lastMeasurement = measurements_[measurements_.length - 1];
                const hours_measurementDifference = luxon_1.DateTime.fromMillis(lastMeasurement.referenceDate).diff(luxon_1.DateTime.fromMillis(firstMeasurement.referenceDate), "hours").hours;
                const hours_reportingPeriod = 7. * 24.; //week
                return Object.assign({ user_id, measurements_count: measurements_.length, extreme_measurements: [firstMeasurement, lastMeasurement], beginning_timestamp: isFinite(period.getBeginning()) ? Math.max(period.getBeginning(), period_1.global_beginning.toMillis()) : period_1.global_beginning.toMillis(), end_timestamp: isFinite(period.getEnd()) ? period.getEnd() : luxon_1.DateTime.now().toMillis() }, (measurements_.length > 1 ? {
                    delta: {
                        weight: lastMeasurement.measurement.weight - firstMeasurement.measurement.weight,
                        fat_ratio: lastMeasurement.measurement.fat_ratio && firstMeasurement.measurement.fat_ratio ? lastMeasurement.measurement.fat_ratio - firstMeasurement.measurement.fat_ratio : undefined,
                        muscle_ratio: lastMeasurement.measurement.muscle_ratio && firstMeasurement.measurement.muscle_ratio ? lastMeasurement.measurement.muscle_ratio - firstMeasurement.measurement.muscle_ratio : undefined
                    },
                    rate: {
                        weight: (lastMeasurement.measurement.weight - firstMeasurement.measurement.weight) / hours_measurementDifference * hours_reportingPeriod,
                        fat_ratio: lastMeasurement.measurement.fat_ratio && firstMeasurement.measurement.fat_ratio ? (lastMeasurement.measurement.fat_ratio - firstMeasurement.measurement.fat_ratio) / hours_measurementDifference * hours_reportingPeriod : undefined,
                        muscle_ratio: lastMeasurement.measurement.muscle_ratio && firstMeasurement.measurement.muscle_ratio ? (lastMeasurement.measurement.muscle_ratio - firstMeasurement.measurement.muscle_ratio) / hours_measurementDifference * hours_reportingPeriod : undefined,
                    }
                } : {}));
            }
            else
                return undefined;
        });
    }
}
exports.StatisticsService = StatisticsService;
