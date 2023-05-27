import {ClientTimeSeriesBase} from "../../../../base/time-series/client-time-series-base";
import {Period} from "@sprinter-common/features/time/period/period";
import {faker} from "@faker-js/faker";
import {
    activity_interface_base,
    client_aspect_type,
    daily_activity_type,
    weight_interface
} from "@sprinter-common/schema/activities/activities";

export class ActivitiesRandom extends ClientTimeSeriesBase
{
    constructor()
    {
        super();

        console.log(this.constructor.name + " " + "Client");
    }

    async request(user_id: number, period: Period, client_aspect: client_aspect_type): Promise<activity_interface_base[]>
    {
        return new Promise<activity_interface_base[]>(resolve =>
        {
            resolve(period.days_range().map(value =>
            {
                return {
                    user_id,
                    distance: faker.datatype.number({min: 1.e3, max: 2.e4}),
                    calories: faker.datatype.number({min: 1.e2, max: 4.e2}),
                    activeZoneMinutes: faker.datatype.number({min: 0., max: 1.e2}),
                    referenceDate: value.toMillis(),
                    duration: faker.datatype.number({min: 10., max: 40.}) * 60.,
                    name: "running",
                    id: faker.datatype.uuid(),
                    locationName: faker.address.cityName(),
                    raw_name: ""
                }
            }));
        });
    }
}

export class ActivityRandom extends ClientTimeSeriesBase
{
    constructor()
    {
        super();

        console.log(this.constructor.name + " " + "Client");
    }

    async request(user_id: number, period: Period, client_aspect: client_aspect_type): Promise<daily_activity_type[]>
    {
        return new Promise<daily_activity_type[]>(resolve =>
        {
            resolve(period.days_range().map(value =>
            {
                return {
                    user_id,
                    distance: faker.datatype.number({min: 0., max: 10.}),
                    id: faker.datatype.uuid(),
                    referenceDate: value.toMillis(),
                    calories: faker.datatype.number({min: 1.e3, max: 4.e3}),
                    floors: faker.datatype.number({min: 0, max: 40}),
                    elevation: faker.datatype.number({min: 1.e2, max: 3.e2}),
                    steps: faker.datatype.number({min: 5.e2, max: 3.e4}),
                    active_zone_minutes: {
                        activeZoneMinutes: faker.datatype.number({min: 0., max: 1.e2}),
                        cardioActiveZoneMinutes: 1.e1,
                        fatBurnActiveZoneMinutes: 3.e1,
                        peakActiveZoneMinutes: 5.
                    },
                    activity_calories: faker.datatype.number({min: 1.e2, max: 2.e2}),
                    calories_BMR: 1.e3
                }
            }));
        });
    }
}

export class WeightRandom extends ClientTimeSeriesBase
{
    constructor()
    {
        super();

        console.log(this.constructor.name + " " + "Client");
    }

    async request(user_id: number, period: Period, client_aspect: client_aspect_type): Promise<weight_interface[]>
    {
        return new Promise<weight_interface[]>(resolve =>
        {
            resolve(period.days_range().map(value =>
            {
                return {
                    user_id,
                    id: faker.datatype.uuid(),
                    referenceDate: value.toMillis(),
                    measurement:
                        {
                            weight: faker.datatype.number({min: 60., max: 100.}),
                            fat_ratio: faker.datatype.float({min: 0.08, max: 0.18}),
                            muscle_ratio: faker.datatype.number({min: 0.4, max: 0.6})
                        }
                }
            }));
        });
    }
}
