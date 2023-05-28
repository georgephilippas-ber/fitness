import {useEffect} from "react";
import {DailyActivity} from "../../charts/daily-activity/daily-activity";
import {fake_daily_activity} from "@shared/common/faker/activities";
import {IonContent} from "@ionic/react";

export function DailyActivityContent() {
    useEffect(() => {

    }, []);

    return (
        <IonContent style={{height: "80%"}}>
            <DailyActivity daily_activity={fake_daily_activity()}/>
        </IonContent>
    )
}
