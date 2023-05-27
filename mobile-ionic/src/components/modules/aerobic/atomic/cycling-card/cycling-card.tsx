import {cycling_bike_interface} from "@shared/common/schema/activities/activities";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import {DateTime, Duration} from "luxon";

import "./cycling-card.css";

export function CyclingCard({cycling_bike_interface_}: { cycling_bike_interface_: cycling_bike_interface }) {
    if (cycling_bike_interface_.name === "cycling-bike")
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        {cycling_bike_interface_.name} {cycling_bike_interface_.locationName ? ["in", cycling_bike_interface_.locationName].join(" ") : null} - {DateTime.fromMillis(cycling_bike_interface_.referenceDate).toLocaleString(DateTime.DATE_MED)}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        <strong>{(cycling_bike_interface_.distance / 1.0e3).toFixed(2)} km</strong> - {Duration.fromDurationLike({second: cycling_bike_interface_.duration}).toFormat("hh:mm:ss")}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className={"cycling-card-container"}>
                    <div className={"grid-element-container"}>
                        <div className={"grid-element-header"}>
                            Activity
                        </div>
                        <div className={"grid-element-content"}>
                            {cycling_bike_interface_.activeZoneMinutes} minutes
                        </div>
                    </div>
                    <div className={"grid-element-container"}>
                        <div className={"grid-element-header"}>
                            Energy
                        </div>
                        <div className={"grid-element-content"}>
                            {cycling_bike_interface_.calories} kCal
                        </div>
                    </div>
                    <div className={"grid-element-container"}>
                        <div className={"grid-element-header"}>
                            Average HR
                        </div>
                        <div className={"grid-element-content"}>
                            {cycling_bike_interface_.averageHeartRate} BPM
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>)
    else return null;
}