import {useEffect} from "react";
import {DailyActivity} from "../../charts/daily-activity/daily-activity";
import {fake_daily_activity} from "@shared/common/faker/activities";

export function DailyActivityContent() {
    useEffect(() => {

    }, []);

    return (
        <DailyActivity daily_activity={fake_daily_activity()}/>
    )
}
