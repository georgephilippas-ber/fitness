import {useEffect, useState} from "react";
import {DailyActivity} from "../../charts/daily-activity/daily-activity";
import {IonContent} from "@ionic/react";
import axios from "axios";
import {daily_activity_type} from "@shared/common/schema/activities/activities";

export function DailyActivityContent() {
    const [daily_activity, set_daily_activity] = useState<daily_activity_type | undefined>(undefined);

    useEffect(() => {
        axios.post("http://localhost:4096/activity/latest").then(value => {
            set_daily_activity(value.data);
        }).catch(reason => console.log(reason));
    }, []);

    return (
        <IonContent>
            {daily_activity ?
                <DailyActivity daily_activity={daily_activity}/> : null}
        </IonContent>
    );
}
