import {IonContent, IonPage} from "@ionic/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    activity_interface_base,
    cycling_bike_interface,
    running_interface
} from "@shared/common/schema/activities/activities";
import {RunningCard} from "../../atomic/running-card/running-card";
import {CyclingCard} from "../../atomic/cycling-card/cycling-card";

export function ActivitiesContent() {
    const [activities, set_activities] = useState<activity_interface_base[]>([]);

    useEffect(() => {
        axios.post("http://localhost:4096/activities/all").then(value => {
            set_activities(value.data);
        }).catch(reason => console.log(reason));
    }, [])

    return (
        <IonContent>
            {activities.map(value => {
                switch (value.name) {
                    case "cycling-bike":
                        return <CyclingCard key={value.id}
                                            cycling_bike_interface_={value as cycling_bike_interface}/>
                    case "treadmill-running":
                    case "running":
                        return <RunningCard key={value.id} running_interface_={value as running_interface}/>
                    default:
                        return null;
                }
            })}
        </IonContent>
    )
}