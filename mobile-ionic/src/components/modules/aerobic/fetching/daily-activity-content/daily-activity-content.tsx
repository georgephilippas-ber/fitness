import {useEffect, useState} from "react";
import {DailyActivity} from "../../charts/daily-activity/daily-activity";
import {fake_daily_activity} from "@shared/common/faker/activities";
import {IonContent} from "@ionic/react";
import axios from "axios";
import {daily_activity_type} from "@shared/common/schema/activities/activities";

export function DailyActivityContent() {
    const [daily_activity, set_daily_activity] = useState<daily_activity_type | undefined>(undefined);

    useEffect(() => {
        axios.post<undefined, daily_activity_type>("http://localhost:4096/activity/latest").then(value => {
            set_daily_activity(daily_activity);
        });
    }, []);

    return (
        daily_activity ?
            <IonContent>
                <DailyActivity daily_activity={daily_activity}/>
            </IonContent> : null
    )
}
