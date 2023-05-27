import {IonContent} from "@ionic/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {activity_interface_base, running_interface} from "@shared/common/schema/activities/activities";
import {RunningCard} from "../../atomic/running-card/running-card";

export function ActivitiesContent() {
    const [activities, set_activities] = useState<activity_interface_base[]>([]);

    useEffect(() => {
        axios.post("http://localhost:4096/activities/all").then(value => {
            set_activities(value.data);
            console.log(value.data);
        }).catch(reason => console.log(reason));
    }, [])

    return (
        <div>
            {activities.map(value => <RunningCard key={value.id} running_interface_={value as running_interface}/>)}
        </div>
    )
}