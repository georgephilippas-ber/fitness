import {daily_activity_type, running_interface} from "../schema/activities/activities";

import {faker} from "@faker-js/faker";
import {DateTime} from "luxon";

export function fake_daily_activity(): daily_activity_type {
    return {
        id: faker.datatype.uuid(),
        calories: faker.datatype.number({min: 1.e2, max: 2.e3}),
        distance: faker.datatype.number({min: 4.e1, max: 1.e4}),
        referenceDate: DateTime.now().minus({hour: faker.datatype.number({min: 1, max: 4})}).toMillis(),
        activity_calories: faker.datatype.number({min: 1.e2, max: 1.e3}),
        active_zone_minutes:
            {
                activeZoneMinutes: 10.,
                cardioActiveZoneMinutes: 0,
                fatBurnActiveZoneMinutes: 0,
                peakActiveZoneMinutes: 0,
            },
        steps: faker.datatype.number({min: 1.e3, max: 1.e4}),
        user_id: -2,
        calories_BMR: faker.datatype.number({min: 1.e2, max: 7.e2}),
        elevation: 0.,
        floors: 0x0f
    }
}

export function fake_running_activity(): running_interface {
    return {
        id: faker.datatype.uuid(),
        activeZoneMinutes: faker.datatype.number({min: 2., max: 40}),
        referenceDate: DateTime.now().minus({hour: faker.datatype.number({min: 0, max: 4})}).toMillis(),
        averageHeartRate: faker.datatype.number({min: 90, max: 170}),
        averagePace: faker.datatype.float({min: 5., max: 7.}),
        calories: faker.datatype.number({min: 1.e2, max: 3.e2}),
        distance: faker.datatype.number({min: 1.e3, max: 5.e3}),
        duration: faker.datatype.number({min: 1.e2, max: 1.e3}),
        locationName: faker.address.cityName(),
        maximumHeartRate: faker.datatype.number({min: 150, max: 180}),
        name: faker.helpers.arrayElement(["running", "treadmill-running"]),
        maximumSpeed: faker.datatype.number({min: 5, max: 7}),
        raw_name: "",
        user_id: -2,
        steps: faker.datatype.number({min: 1.e3, max: 6.e3})
    }
}
