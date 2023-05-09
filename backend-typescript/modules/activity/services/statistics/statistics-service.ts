import {ActivitiesManager} from "../../managers/activity/activities-manager";
import {global_beginning, Period} from "@sprinter-common/features/time/period/period";

import {WeightManager} from "../../managers/weight/weight-manager";
import {DateTime} from "luxon";
import {activity_name_type, activity_statistics_type, weight_statistics_type} from "../../schema/schema";

export class StatisticsService
{
    constructor(private activityManager: ActivitiesManager, private weightManager: WeightManager)
    {
    }

    async activity_statistics(user_id: number, period: Period, activity_name: activity_name_type[] | ["all"]): Promise<activity_statistics_type | undefined>
    {
        const pipeline_: any = [
            {
                "$match":
                    {
                        user_id,
                        "$and":
                            [{
                                referenceDate:
                                    {
                                        "$gte": period.getBeginning()
                                    }
                            },
                                {
                                    referenceDate:
                                        {
                                            "$lte": period.getEnd()
                                        }
                                },
                            ]
                    }
            },
            {
                "$group":
                    {
                        "_id": null,
                        activities_count:
                            {
                                "$sum": 1
                            },
                        activeZoneMinutes_total:
                            {
                                "$sum": "$activeZoneMinutes"
                            },
                        activeZoneMinutes_average:
                            {
                                "$avg": "$activeZoneMinutes"
                            },
                        distance_total:
                            {
                                "$sum": "$distance"
                            },
                        distance_average:
                            {
                                "$avg": "$distance"
                            },
                        calories_total:
                            {
                                "$sum": "$calories"
                            },
                        calories_average:
                            {
                                "$avg": "$calories"
                            },
                        duration_total:
                            {
                                "$sum": "$duration"
                            },
                        duration_average:
                            {
                                "$avg": "$duration"
                            },
                        average_heart_rate:
                            {
                                "$avg": "$averageHeartRate"
                            },
                        beginning_timestamp:
                            {
                                "$min": "$referenceDate"
                            },
                        end_timestamp:
                            {
                                "$max": "$referenceDate"
                            }
                    }
            },
        ];

        if (activity_name?.[0] !== "all")
            pipeline_[0]["$match"]["$or"] = activity_name.map(value =>
            {
                return {
                    "name": value
                }
            });

        const aggregate_ = (await this.activityManager.collection().aggregate(pipeline_).toArray())?.[0];

        return aggregate_ ? {
            name: "aggregate",
            user_id,
            beginning_timestamp: isFinite(period.getBeginning()) ? Math.max(period.getBeginning(), global_beginning.toMillis()) : global_beginning.toMillis(),
            end_timestamp: isFinite(period.getEnd()) ? period.getEnd() : DateTime.now().toMillis(),
            distance:
                {
                    total: aggregate_["distance_total"],
                    average: aggregate_["distance_average"]
                },
            duration:
                {
                    total: aggregate_["duration_total"],
                    average: aggregate_["duration_average"]
                },
            calories:
                {
                    total: aggregate_["calories_total"],
                    average: aggregate_["calories_average"]
                },
            activities_count: aggregate_["activities_count"],
            average_heart_rate: aggregate_["average_heart_rate"],
            activeZoneMinutes:
                {
                    total: aggregate_["activeZoneMinutes_total"],
                    average: aggregate_["activeZoneMinutes_average"],
                }
        } : undefined;
    }

    async weight_statistics(user_id: number, period: Period): Promise<weight_statistics_type | undefined>
    {
        const measurements_ = await (this.weightManager.collection().find({
            user_id,
            referenceDate:
                {
                    "$gte": period.getBeginning(),
                    "$lte": period.getEnd()
                }
        }).sort("referenceDate", "ascending")).toArray();

        if (measurements_.length)
        {
            const firstMeasurement = measurements_[0];
            const lastMeasurement = measurements_[measurements_.length - 1];

            const hours_measurementDifference: number = DateTime.fromMillis(lastMeasurement.referenceDate).diff(DateTime.fromMillis(firstMeasurement.referenceDate), "hours").hours;
            const hours_reportingPeriod: number = 7. * 24.; //week

            return {
                user_id,
                measurements_count: measurements_.length,
                extreme_measurements: [firstMeasurement, lastMeasurement],
                beginning_timestamp: isFinite(period.getBeginning()) ? Math.max(period.getBeginning(), global_beginning.toMillis()) : global_beginning.toMillis(),
                end_timestamp: isFinite(period.getEnd()) ? period.getEnd() : DateTime.now().toMillis(),
                ...(measurements_.length > 1 ? {
                    delta:
                        {
                            weight: lastMeasurement.measurement.weight - firstMeasurement.measurement.weight,
                            fat_ratio: lastMeasurement.measurement.fat_ratio && firstMeasurement.measurement.fat_ratio ? lastMeasurement.measurement.fat_ratio - firstMeasurement.measurement.fat_ratio : undefined,
                            muscle_ratio: lastMeasurement.measurement.muscle_ratio && firstMeasurement.measurement.muscle_ratio ? lastMeasurement.measurement.muscle_ratio - firstMeasurement.measurement.muscle_ratio : undefined
                        },
                    rate:
                        {
                            weight: (lastMeasurement.measurement.weight - firstMeasurement.measurement.weight) / hours_measurementDifference * hours_reportingPeriod,
                            fat_ratio: lastMeasurement.measurement.fat_ratio && firstMeasurement.measurement.fat_ratio ? (lastMeasurement.measurement.fat_ratio - firstMeasurement.measurement.fat_ratio) / hours_measurementDifference * hours_reportingPeriod : undefined,
                            muscle_ratio: lastMeasurement.measurement.muscle_ratio && firstMeasurement.measurement.muscle_ratio ? (lastMeasurement.measurement.muscle_ratio - firstMeasurement.measurement.muscle_ratio) / hours_measurementDifference * hours_reportingPeriod : undefined,
                        }
                } : {}),
            }
        }
        else return undefined;
    }
}
