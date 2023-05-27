import {running_interface} from "../schema/activities/activities";

import {faker} from "@faker-js/faker";
import {day_fromMillis} from "../features/time/period/period";
import {DateTime} from "luxon";

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
