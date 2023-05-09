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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FitbitClient = void 0;
const period_1 = require("@sprinter-common/features/time/period/period");
const luxon_1 = require("luxon");
const axios_1 = __importDefault(require("axios"));
const faker_1 = require("@faker-js/faker");
function to_global_activity_name(fitbitActivityName) {
    switch (fitbitActivityName) {
        case "Walk":
            return "walking";
        case "Run":
            return "running";
        case "Bike":
            return "cycling-bike";
        default:
            return "other";
    }
}
function to_global_cycling_activity(user_id, raw_activity) {
    var _a, _b;
    if (!["cycling-bike"].includes(to_global_activity_name(raw_activity.activityName)))
        return null;
    const rawActivity_cycling = raw_activity;
    return {
        id: raw_activity.logId.toFixed(),
        name: to_global_activity_name(rawActivity_cycling.activityName),
        referenceDate: luxon_1.DateTime.fromISO(rawActivity_cycling.originalStartTime).toMillis(),
        user_id,
        averageHeartRate: rawActivity_cycling.averageHeartRate,
        locationName: undefined,
        calories: rawActivity_cycling.calories,
        distance: rawActivity_cycling.distance * 1000,
        duration: rawActivity_cycling.duration / 1000,
        activeZoneMinutes: (_b = (_a = rawActivity_cycling === null || rawActivity_cycling === void 0 ? void 0 : rawActivity_cycling.activeZoneMinutes) === null || _a === void 0 ? void 0 : _a.totalMinutes) !== null && _b !== void 0 ? _b : 0,
        speed: rawActivity_cycling.speed
    };
}
function to_other(user_id, raw_activity) {
    var _a, _b, _c;
    return {
        user_id,
        raw_name: (_a = raw_activity === null || raw_activity === void 0 ? void 0 : raw_activity.activityName) === null || _a === void 0 ? void 0 : _a.toLowerCase(),
        id: raw_activity.logId.toString(),
        name: to_global_activity_name(raw_activity.activityName),
        referenceDate: luxon_1.DateTime.fromISO(raw_activity.originalStartTime).toMillis(),
        activeZoneMinutes: (_c = (_b = raw_activity === null || raw_activity === void 0 ? void 0 : raw_activity.activeZoneMinutes) === null || _b === void 0 ? void 0 : _b.totalMinutes) !== null && _c !== void 0 ? _c : 0,
        averageHeartRate: raw_activity === null || raw_activity === void 0 ? void 0 : raw_activity.averageHeartRate,
        duration: (raw_activity === null || raw_activity === void 0 ? void 0 : raw_activity.activeDuration) / 1000,
        calories: raw_activity === null || raw_activity === void 0 ? void 0 : raw_activity.calories,
        steps: raw_activity === null || raw_activity === void 0 ? void 0 : raw_activity.steps
    };
}
function to_global_running_activity(user_id, raw_activity) {
    var _a, _b;
    if (!["running", "walking"].includes(to_global_activity_name(raw_activity.activityName)))
        return null;
    const rawActivity_running = raw_activity;
    const distance = rawActivity_running.distance ? rawActivity_running.distance * 1000 : 0.67 * rawActivity_running.steps;
    const duration = rawActivity_running.duration / 1000;
    return {
        id: rawActivity_running.logId.toFixed(),
        name: to_global_activity_name(rawActivity_running.activityName),
        referenceDate: luxon_1.DateTime.fromISO(rawActivity_running.originalStartTime).toMillis(),
        user_id,
        averageHeartRate: rawActivity_running.averageHeartRate,
        locationName: undefined,
        calories: rawActivity_running.calories,
        distance,
        steps: rawActivity_running.steps,
        duration,
        averagePace: rawActivity_running.pace ? rawActivity_running.pace / 60 : (duration / 60) / (distance / 1000),
        maximumSpeed: 0,
        maximumHeartRate: 0,
        activeZoneMinutes: (_b = (_a = rawActivity_running === null || rawActivity_running === void 0 ? void 0 : rawActivity_running.activeZoneMinutes) === null || _a === void 0 ? void 0 : _a.totalMinutes) !== null && _b !== void 0 ? _b : 0
    };
}
let resource_paths = ["steps", "calories", "distance", "active-zone-minutes", "activityCalories", "caloriesBMR", "elevation", "floors"];
//override
resource_paths = ["calories", "distance", "active-zone-minutes"];
class FitbitClient {
    constructor(authorizationService, authorizationManager) {
        this.authorizationService = authorizationService;
        this.authorizationManager = authorizationManager;
    }
    getActivityTimeSeries_singleSource(user_id, period, resource_path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const accessToken = yield this.authorizationManager.getAccessToken(user_id, "fitbit");
                let start_date_ = luxon_1.DateTime.fromMillis(period.hasFiniteBeginning() ? period.getBeginning() : period_1.global_beginning.toMillis()).toSQLDate();
                let end_date_ = period.hasFiniteEnd() ? (0, period_1.day_fromMillis)(period.getEnd(), "end").toSQLDate() : (0, period_1.today)("end").toSQLDate();
                try {
                    const get_res_ = yield axios_1.default.get(`https://api.fitbit.com/1/user/-/activities/${resource_path}/date/${start_date_}/${end_date_}.json`, {
                        headers: {
                            "authorization": ["Bearer", accessToken].join(" "),
                            "accept": "application/json"
                        },
                        timeout: 3000
                    });
                    resolve(get_res_.data);
                }
                catch (err) {
                    console.log("ERROR", this.getActivityTimeSeries_singleSource.name, resource_path, err.code);
                    reject(err);
                }
            }));
        });
    }
    getActivityTimeSeries(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const accessToken = yield this.authorizationManager.getAccessToken(user_id, "fitbit");
                try {
                    const series_ = yield Promise.all(resource_paths.map(value => this.getActivityTimeSeries_singleSource(user_id, period, value)));
                    const series_processed_ = {};
                    series_[0]["activities-calories"].forEach(value => series_processed_[value["dateTime"]] =
                        {
                            calories: value["value"]
                        });
                    series_[1]["activities-distance"].forEach(value => series_processed_[value["dateTime"]] = Object.assign(Object.assign({}, series_processed_[value["dateTime"]]), { distance: value["value"] }));
                    series_[2]["activities-active-zone-minutes"].forEach(value => series_processed_[value["dateTime"]] = Object.assign(Object.assign({}, series_processed_[value["dateTime"]]), { active_zone_minutes: value["value"] }));
                    const daily_activity_series_ = Object.keys(series_processed_).map((value, index) => {
                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                        return {
                            user_id,
                            calories: parseFloat((_a = series_processed_[value]) === null || _a === void 0 ? void 0 : _a["calories"]),
                            distance: parseFloat((_b = series_processed_[value]) === null || _b === void 0 ? void 0 : _b["distance"]),
                            active_zone_minutes: {
                                activeZoneMinutes: ((_d = (_c = series_processed_[value]) === null || _c === void 0 ? void 0 : _c["active_zone_minutes"]) === null || _d === void 0 ? void 0 : _d["activeZoneMinutes"]) || 0.,
                                fatBurnActiveZoneMinutes: ((_f = (_e = series_processed_[value]) === null || _e === void 0 ? void 0 : _e["active_zone_minutes"]) === null || _f === void 0 ? void 0 : _f["fatBurnActiveZoneMinutes"]) || 0.,
                                cardioActiveZoneMinutes: ((_h = (_g = series_processed_[value]) === null || _g === void 0 ? void 0 : _g["active_zone_minutes"]) === null || _h === void 0 ? void 0 : _h["cardioActiveZoneMinutes"]) || 0.,
                                peakActiveZoneMinutes: ((_k = (_j = series_processed_[value]) === null || _j === void 0 ? void 0 : _j["active_zone_minutes"]) === null || _k === void 0 ? void 0 : _k["peakActiveZoneMinutes"]) || 0.,
                            },
                            activity_calories: 0.,
                            steps: 0.,
                            referenceDate: (0, period_1.day_fromMillis)(luxon_1.DateTime.fromISO(value, { zone: "UTC" }).toMillis(), "beginning").toMillis(),
                            id: index.toString() + faker_1.faker.datatype.uuid(),
                            floors: 0.,
                            elevation: 0.,
                            calories_BMR: 0.
                        };
                    });
                    resolve(daily_activity_series_);
                }
                catch (e) {
                    console.log(this.getActivityTimeSeries.name);
                    console.log(e.message);
                    reject(e);
                }
            }));
        });
    }
    getActivities(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const accessToken = yield this.authorizationManager.getAccessToken(user_id, "fitbit");
                try {
                    let afterDate = period.hasFiniteBeginning() ? (0, period_1.day_fromMillis)(period.getBeginning(), "beginning").toSQLDate() : period_1.global_beginning.toSQLDate();
                    const get_res_ = yield axios_1.default.get("https://api.fitbit.com/1/user/-/activities/list.json", {
                        params: {
                            afterDate,
                            sort: "desc",
                            offset: 0,
                            limit: 100
                        },
                        headers: {
                            "authorization": ["Bearer", accessToken].join(" "),
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                    });
                    if (get_res_.data.activities && Array.isArray(get_res_.data.activities)) {
                        console.log("fitbit request", user_id, get_res_.data.activities.length, "activities", period.readable());
                        const array_ = get_res_.data.activities.filter(value => value.duration > 60);
                        resolve(array_);
                    }
                    else
                        reject("");
                }
                catch (err) {
                    reject(err);
                    console.log(this.getActivities.name, accessToken);
                    console.log(err.code);
                }
            }));
        });
    }
    getActivities_global(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            function convert(rawActivity_common) {
                return rawActivity_common.map(value => {
                    switch (to_global_activity_name(value.activityName)) {
                        case "running":
                        case "walking":
                            return to_global_running_activity(user_id, value);
                        case "cycling-bike":
                            return to_global_cycling_activity(user_id, value);
                        case "other":
                            return to_other(user_id, value);
                    }
                }).filter(value => !!value);
            }
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let rawActivity_common = [];
                try {
                    rawActivity_common = yield this.getActivities(user_id, period);
                    resolve(convert(rawActivity_common));
                }
                catch (err) {
                    try {
                        console.log("refresh", yield this.authorizationService.refresh(user_id, "fitbit"));
                        rawActivity_common = yield this.getActivities(user_id, period);
                        resolve(convert(rawActivity_common));
                    }
                    catch (err) {
                        console.log("fitbit requires authorization");
                        reject(err);
                    }
                }
            }));
        });
    }
}
exports.FitbitClient = FitbitClient;
