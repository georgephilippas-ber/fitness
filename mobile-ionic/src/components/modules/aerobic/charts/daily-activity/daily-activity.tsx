import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import React from "react";

import {daily_activity_type} from "@shared/common/schema/activities/activities";
import {DateTime} from "luxon";

import "./daily-activity.css";
import {day_fromMillis} from "@shared/common/features/time/period/period";

export function DailyActivity({daily_activity}: { daily_activity: daily_activity_type }) {

    if (daily_activity.referenceDate === day_fromMillis(DateTime.now().toMillis(), "beginning").toMillis())
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        Daily Activity
                    </IonCardTitle>
                    <IonCardSubtitle>
                        {DateTime.fromMillis(daily_activity.referenceDate).toLocaleString(DateTime.DATE_HUGE)}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    <div className={"container"}>
                        <div className={"title"}>
                            Energy Expenditure
                        </div>
                        <div className={"data"}>
                            {daily_activity.calories} kCal
                        </div>
                    </div>
                    <div className={"container"}>
                        <div className={"title"}>
                            Distance
                        </div>
                        <div className={"data"}>
                            {(daily_activity.distance / 1.0e3).toFixed(2)} km
                        </div>
                    </div>
                    <div className={"container"}>
                        <div className={"title"}>
                            Active Minutes
                        </div>
                        <div className={"data"}>
                            {(daily_activity.active_zone_minutes.activeZoneMinutes).toFixed(0)}
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>
        );
    else
        return null;
}
