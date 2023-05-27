export type client_aspect_type = "activities" | "weight" | "activity";

export type activity_name_type =
    "cycling-bike"
    | "high-intensity-interval-training"
    | "running"
    | "treadmill-running"
    | "walking"
    | "other"


export interface activity_interface_base
{
    id: string;
    user_id: number;
    referenceDate: number;
    calories: number;
    locationName?: string;
    duration: number; //seconds
    name: activity_name_type;
    raw_name?: string;
    activeZoneMinutes: number;
    distance: number; //meters
}

export type weight_measurement_type =
    {
        weight: number;
        muscle_ratio?: number;
        fat_ratio?: number;
    }

export interface weight_interface
{
    id: string;
    user_id: number;
    referenceDate: number;
    measurement: weight_measurement_type;
}

export type activity_statistics_type =
    {
        name: string;
        user_id: number;
        activities_count: number;
        beginning_timestamp: number;
        end_timestamp: number;
        distance: {
            total: number;
            average: number;
        };
        duration:
            {
                total: number;
                average: number;
            }
        calories: {
            total: number;
            average: number;
        };
        average_heart_rate: number;
        activeZoneMinutes: {
            total: number;
            average: number;
        };
    }

export type weight_statistics_type =
    {
        user_id: number;
        beginning_timestamp: number;
        end_timestamp: number;
        measurements_count: number;
        extreme_measurements: [weight_interface, weight_interface];
        delta?: weight_measurement_type;
        rate?: weight_measurement_type;
    }

export interface high_intensity_interval_training_interface extends activity_interface_base
{
    averageHeartRate: number;
    steps: number;
}

export interface other_activity_interface extends Partial<activity_interface_base>, Partial<high_intensity_interval_training_interface>, Partial<running_interface>, Partial<cycling_bike_interface>
{
    raw_name: string;
}

export interface running_interface extends activity_interface_base
{
    maximumSpeed: number;

    averageHeartRate: number;
    maximumHeartRate: number;

    averagePace: number; //minutes per kilometer

    steps: number;
}

export interface cycling_bike_interface extends activity_interface_base
{
    speed: number //kilometers/hour
    averageHeartRate: number;
}

type active_zone_minutes_type =
    {
        fatBurnActiveZoneMinutes: number;
        cardioActiveZoneMinutes: number;
        peakActiveZoneMinutes: number;
        activeZoneMinutes: number;
    }

export type daily_activity_type =
    {
        id: string;
        user_id: number;
        referenceDate: number;
        activity_calories: number;
        calories: number;
        calories_BMR: number;
        distance: number;
        elevation: number;
        floors: number;
        steps: number;
        active_zone_minutes: active_zone_minutes_type;
    }

export type provider_type = "fitbit" | "withings" | "myfitnesspal" | "random";

export type clients_type<T> =
    {
        [key in client_aspect_type]:
        {
            [key in provider_type]?: T;
        }
    }

export interface time_series_request_base_interface
{
    beginning_timestamp?: number;
    end_timestamp?: number;
}

export interface activity_statistics_request_type extends time_series_request_base_interface
{
    activity_name: activity_name_type[] | ["all"];
}
