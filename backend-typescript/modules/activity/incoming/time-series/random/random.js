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
exports.WeightRandom = exports.ActivityRandom = exports.ActivitiesRandom = void 0;
const client_time_series_base_1 = require("../../../../base/time-series/client-time-series-base");
const faker_1 = require("@faker-js/faker");
class ActivitiesRandom extends client_time_series_base_1.ClientTimeSeriesBase {
    constructor() {
        super();
        console.log(this.constructor.name + " " + "Client");
    }
    request(user_id, period, client_aspect) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                resolve(period.days_range().map(value => {
                    return {
                        user_id,
                        distance: faker_1.faker.datatype.number({ min: 1.e3, max: 2.e4 }),
                        calories: faker_1.faker.datatype.number({ min: 1.e2, max: 4.e2 }),
                        activeZoneMinutes: faker_1.faker.datatype.number({ min: 0., max: 1.e2 }),
                        referenceDate: value.toMillis(),
                        duration: faker_1.faker.datatype.number({ min: 10., max: 40. }) * 60.,
                        name: "running",
                        id: faker_1.faker.datatype.uuid(),
                        locationName: faker_1.faker.address.cityName(),
                        raw_name: ""
                    };
                }));
            });
        });
    }
}
exports.ActivitiesRandom = ActivitiesRandom;
class ActivityRandom extends client_time_series_base_1.ClientTimeSeriesBase {
    constructor() {
        super();
        console.log(this.constructor.name + " " + "Client");
    }
    request(user_id, period, client_aspect) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                resolve(period.days_range().map(value => {
                    return {
                        user_id,
                        distance: faker_1.faker.datatype.number({ min: 0., max: 10. }),
                        id: faker_1.faker.datatype.uuid(),
                        referenceDate: value.toMillis(),
                        calories: faker_1.faker.datatype.number({ min: 1.e3, max: 4.e3 }),
                        floors: faker_1.faker.datatype.number({ min: 0, max: 40 }),
                        elevation: faker_1.faker.datatype.number({ min: 1.e2, max: 3.e2 }),
                        steps: faker_1.faker.datatype.number({ min: 5.e2, max: 3.e4 }),
                        active_zone_minutes: {
                            activeZoneMinutes: faker_1.faker.datatype.number({ min: 0., max: 1.e2 }),
                            cardioActiveZoneMinutes: 1.e1,
                            fatBurnActiveZoneMinutes: 3.e1,
                            peakActiveZoneMinutes: 5.
                        },
                        activity_calories: faker_1.faker.datatype.number({ min: 1.e2, max: 2.e2 }),
                        calories_BMR: 1.e3
                    };
                }));
            });
        });
    }
}
exports.ActivityRandom = ActivityRandom;
class WeightRandom extends client_time_series_base_1.ClientTimeSeriesBase {
    constructor() {
        super();
        console.log(this.constructor.name + " " + "Client");
    }
    request(user_id, period, client_aspect) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                resolve(period.days_range().map(value => {
                    return {
                        user_id,
                        id: faker_1.faker.datatype.uuid(),
                        referenceDate: value.toMillis(),
                        measurement: {
                            weight: faker_1.faker.datatype.number({ min: 60., max: 100. }),
                            fat_ratio: faker_1.faker.datatype.float({ min: 0.08, max: 0.18 }),
                            muscle_ratio: faker_1.faker.datatype.number({ min: 0.4, max: 0.6 })
                        }
                    };
                }));
            });
        });
    }
}
exports.WeightRandom = WeightRandom;
