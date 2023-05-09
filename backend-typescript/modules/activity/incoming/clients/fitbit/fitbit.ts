import {AuthorizationManager, AuthorizationService} from "../../../../../core/features/authorization/authorization";
import {day_fromMillis, global_beginning, Period, today} from "@sprinter-common/features/time/period/period";

import {DateTime} from "luxon";

import axios, {AxiosError} from "axios";

import {faker} from "@faker-js/faker";
import {
    activity_interface_base,
    activity_name_type,
    cycling_bike_interface,
    daily_activity_type,
    other_activity_interface,
    running_interface
} from "../../../schema/schema";

type fitbit_activity_name_type = "Walk" | "Bike" | "Run" | string;

function to_global_activity_name(fitbitActivityName: fitbit_activity_name_type): activity_name_type
{
    switch (fitbitActivityName)
    {
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

interface raw_activity_base
{
    logId: number;
    activityName: fitbit_activity_name_type;
    lastModified: string;
    originalStartTime: string;
    averageHeartRate: number;
    calories: number;
    distance: number;
    duration: number;
    activeDuration: number;
    steps: number;
    activeZoneMinutes:
        {
            totalMinutes: number;
        }
}

interface raw_activity_running_interface extends raw_activity_base
{
    pace: number;
    speed: number;
    steps: number;
}

interface raw_activity_cycling_interface extends raw_activity_running_interface
{
    // equal
}

type activities_response_type =
    {
        activities: raw_activity_base[];
        pagination:
            {
                afterDate: string;
                limit: number;
                next: string;
                offset: number;
                previous: number;
                sort: string;
            }
    }

function to_global_cycling_activity(user_id: number, raw_activity: raw_activity_base): cycling_bike_interface | null
{
    if (!(["cycling-bike"] as activity_name_type[]).includes(to_global_activity_name(raw_activity.activityName)))
        return null;

    const rawActivity_cycling: raw_activity_cycling_interface = raw_activity as raw_activity_cycling_interface;

    return {
        id: raw_activity.logId.toFixed(),
        name: to_global_activity_name(rawActivity_cycling.activityName),
        referenceDate: DateTime.fromISO(rawActivity_cycling.originalStartTime).toMillis(),
        user_id,
        averageHeartRate: rawActivity_cycling.averageHeartRate,
        locationName: undefined,
        calories: rawActivity_cycling.calories,
        distance: rawActivity_cycling.distance * 1_000,
        duration: rawActivity_cycling.duration / 1_000,
        activeZoneMinutes: rawActivity_cycling?.activeZoneMinutes?.totalMinutes ?? 0,
        speed: rawActivity_cycling.speed
    }
}

function to_other(user_id: number, raw_activity: raw_activity_base): other_activity_interface
{
    return {
        user_id,
        raw_name: raw_activity?.activityName?.toLowerCase(),
        id: raw_activity.logId.toString(),
        name: to_global_activity_name(raw_activity.activityName),
        referenceDate: DateTime.fromISO(raw_activity.originalStartTime).toMillis(),
        activeZoneMinutes: raw_activity?.activeZoneMinutes?.totalMinutes ?? 0,
        averageHeartRate: raw_activity?.averageHeartRate,
        duration: raw_activity?.activeDuration / 1_000,
        calories: raw_activity?.calories,
        steps: raw_activity?.steps
    }
}

function to_global_running_activity(user_id: number, raw_activity: raw_activity_base): running_interface | null
{
    if (!(["running", "walking"] as activity_name_type[]).includes(to_global_activity_name(raw_activity.activityName)))
        return null;

    const rawActivity_running: raw_activity_running_interface = raw_activity as raw_activity_running_interface;

    const distance = rawActivity_running.distance ? rawActivity_running.distance * 1_000 : 0.67 * rawActivity_running.steps;
    const duration = rawActivity_running.duration / 1_000;

    return {
        id: rawActivity_running.logId.toFixed(),
        name: to_global_activity_name(rawActivity_running.activityName),
        referenceDate: DateTime.fromISO(rawActivity_running.originalStartTime).toMillis(),
        user_id,
        averageHeartRate: rawActivity_running.averageHeartRate,
        locationName: undefined,
        calories: rawActivity_running.calories,
        distance,
        steps: rawActivity_running.steps,
        duration,
        averagePace: rawActivity_running.pace ? rawActivity_running.pace / 60 : (duration / 60) / (distance / 1_000),
        maximumSpeed: 0,
        maximumHeartRate: 0,
        activeZoneMinutes: rawActivity_running?.activeZoneMinutes?.totalMinutes ?? 0
    }
}

type resource_path_type =
    "active-zone-minutes"
    | "activityCalories"
    | "calories"
    | "caloriesBMR"
    | "distance"
    | "elevation"
    | "floors"
    | "steps";

let resource_paths: resource_path_type[] =
    ["steps", "calories", "distance", "active-zone-minutes", "activityCalories", "caloriesBMR", "elevation", "floors"];

//override
resource_paths = ["calories", "distance", "active-zone-minutes"];

type resource_response_type =
    { [resource in string]: { dateTime: string; value: any }[] }

export class FitbitClient
{
    constructor(private authorizationService: AuthorizationService, private authorizationManager: AuthorizationManager)
    {
    }

    async getActivityTimeSeries_singleSource(user_id: number, period: Period, resource_path: resource_path_type): Promise<resource_response_type>
    {
        return new Promise<resource_response_type>(async (resolve, reject) =>
        {
            const accessToken = await this.authorizationManager.getAccessToken(user_id, "fitbit");

            let start_date_: string | null = DateTime.fromMillis(period.hasFiniteBeginning() ? period.getBeginning() : global_beginning.toMillis()).toSQLDate();
            let end_date_: string | null = period.hasFiniteEnd() ? day_fromMillis(period.getEnd(), "end").toSQLDate() : today("end").toSQLDate();

            try
            {
                const get_res_ = await axios.get<resource_response_type>(`https://api.fitbit.com/1/user/-/activities/${resource_path}/date/${start_date_}/${end_date_}.json`, {
                    headers:
                        {
                            "authorization": ["Bearer", accessToken].join(" "),
                            "accept": "application/json"
                        },
                    timeout: 3_000
                });

                resolve(get_res_.data);
            }
            catch (err)
            {
                console.log("ERROR", this.getActivityTimeSeries_singleSource.name, resource_path, (err as AxiosError).code);

                reject(err);
            }
        });
    }

    async getActivityTimeSeries(user_id: number, period: Period): Promise<daily_activity_type[]>
    {
        return new Promise<daily_activity_type[]>(async (resolve, reject) =>
        {
            const accessToken = await this.authorizationManager.getAccessToken(user_id, "fitbit");

            try
            {
                const series_ = await Promise.all(resource_paths.map(value => this.getActivityTimeSeries_singleSource(user_id, period, value)));

                const series_processed_: any = {};

                series_[0]["activities-calories"].forEach(value => series_processed_[value["dateTime"]] =
                    {
                        calories: value["value"]
                    });
                series_[1]["activities-distance"].forEach(value => series_processed_[value["dateTime"]] =
                    {
                        ...series_processed_[value["dateTime"]],
                        distance: value["value"]
                    });
                series_[2]["activities-active-zone-minutes"].forEach(value => series_processed_[value["dateTime"]] =
                    {
                        ...series_processed_[value["dateTime"]],
                        active_zone_minutes: value["value"]
                    });
                const daily_activity_series_ = Object.keys(series_processed_).map((value, index) =>
                {
                    return {
                        user_id,
                        calories: parseFloat(series_processed_[value]?.["calories"]),
                        distance: parseFloat(series_processed_[value]?.["distance"]),
                        active_zone_minutes: {
                            activeZoneMinutes: series_processed_[value]?.["active_zone_minutes"]?.["activeZoneMinutes"] || 0.,
                            fatBurnActiveZoneMinutes: series_processed_[value]?.["active_zone_minutes"]?.["fatBurnActiveZoneMinutes"] || 0.,
                            cardioActiveZoneMinutes: series_processed_[value]?.["active_zone_minutes"]?.["cardioActiveZoneMinutes"] || 0.,
                            peakActiveZoneMinutes: series_processed_[value]?.["active_zone_minutes"]?.["peakActiveZoneMinutes"] || 0.,
                        },
                        activity_calories: 0.,
                        steps: 0.,
                        referenceDate: day_fromMillis(DateTime.fromISO(value, {zone: "UTC"}).toMillis(), "beginning").toMillis(),
                        id: index.toString() + faker.datatype.uuid(),
                        floors: 0.,
                        elevation: 0.,
                        calories_BMR: 0.
                    }
                }) as daily_activity_type[];

                resolve(daily_activity_series_);
            }
            catch (e)
            {
                console.log(this.getActivityTimeSeries.name);
                console.log((e as Error).message);

                reject(e);
            }
        });
    }

    private async getActivities(user_id: number, period: Period): Promise<raw_activity_base[]>
    {
        return new Promise<raw_activity_base[]>(async (resolve, reject) =>
        {
            const accessToken = await this.authorizationManager.getAccessToken(user_id, "fitbit");

            try
            {
                let afterDate: string | null = period.hasFiniteBeginning() ? day_fromMillis(period.getBeginning(), "beginning").toSQLDate() : global_beginning.toSQLDate();

                const get_res_ = await axios.get<activities_response_type>("https://api.fitbit.com/1/user/-/activities/list.json", {
                    params:
                        {
                            afterDate,
                            sort: "desc",
                            offset: 0,
                            limit: 100
                        },
                    headers:
                        {
                            "authorization": ["Bearer", accessToken].join(" "),
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                });

                if (get_res_.data.activities && Array.isArray(get_res_.data.activities))
                {
                    console.log("fitbit request", user_id, get_res_.data.activities.length, "activities", period.readable());

                    const array_: raw_activity_base[] = (get_res_.data.activities as raw_activity_base[]).filter(value => value.duration > 60);

                    resolve(array_);
                }
                else
                    reject("");
            }
            catch (err)
            {
                reject(err);

                console.log(this.getActivities.name, accessToken);
                console.log((err as AxiosError).code);
            }
        });
    }

    public async getActivities_global(user_id: number, period: Period): Promise<activity_interface_base[]>
    {
        function convert(rawActivity_common: raw_activity_base[]): activity_interface_base[]
        {
            return rawActivity_common.map(value =>
            {
                switch (to_global_activity_name(value.activityName))
                {
                    case "running":
                    case "walking":
                        return to_global_running_activity(user_id, value);
                    case "cycling-bike":
                        return to_global_cycling_activity(user_id, value);
                    case "other":
                        return to_other(user_id, value);
                }
            }).filter(value => !!value) as activity_interface_base[];
        }

        return new Promise<activity_interface_base[]>(async (resolve, reject) =>
        {
            let rawActivity_common: raw_activity_base[] = [];

            try
            {
                rawActivity_common = await this.getActivities(user_id, period);

                resolve(convert(rawActivity_common));
            }
            catch (err)
            {
                try
                {
                    console.log("refresh", await this.authorizationService.refresh(user_id, "fitbit"));

                    rawActivity_common = await this.getActivities(user_id, period);

                    resolve(convert(rawActivity_common));
                }
                catch (err)
                {
                    console.log("fitbit requires authorization");

                    reject(err);
                }
            }
        });
    }
}
