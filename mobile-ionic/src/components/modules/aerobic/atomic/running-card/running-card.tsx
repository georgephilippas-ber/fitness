import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";

import {
    activity_interface_base,
    activity_name_type,
    running_interface
} from "@shared/common/schema/activities/activities"
import {Duration} from "luxon";

import "./running-card.css";

export function RunningCard({running_interface_}: { running_interface_: running_interface }) {
    if ((["running", "treadmill-running"] as activity_name_type[]).includes(running_interface_.name))
        return (
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>
                        {running_interface_.name} {running_interface_.locationName ? ["in", running_interface_.locationName].join(" ") : null} - {Duration.fromDurationLike({minute: running_interface_.averagePace}).toFormat("mm:ss")}
                    </IonCardTitle>
                    <IonCardSubtitle>
                        <strong>{(running_interface_.distance / 1.0e3).toFixed(2)} km</strong> - {Duration.fromDurationLike({second: running_interface_.duration}).toFormat("hh:mm:ss")}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className={"running-card-container"}>
                    <div className={"grid-element-container"}>
                        <div className={"grid-element-header"}>
                            Activity
                        </div>
                        <div className={"grid-element-content"}>
                            {running_interface_.activeZoneMinutes} minutes
                        </div>
                    </div>
                    <div className={"grid-element-container"}>
                        <div className={"grid-element-header"}>
                            Energy
                        </div>
                        <div className={"grid-element-content"}>
                            {running_interface_.calories} kCal
                        </div>
                    </div>
                    <div className={"grid-element-container"}>
                        <div className={"grid-element-header"}>
                            Average HR
                        </div>
                        <div className={"grid-element-content"}>
                            {running_interface_.calories} BPM
                        </div>
                    </div>
                </IonCardContent>
            </IonCard>)
    else return null;
}
