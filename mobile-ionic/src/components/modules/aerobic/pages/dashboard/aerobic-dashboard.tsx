import React, {useState} from "react";
import {IonButton, IonPage, IonSegment, IonSegmentButton} from "@ionic/react";
import {ActivitiesContent} from "../../fetching/activities-content/activities-content";
import {DailyActivityContent} from "../../fetching/daily-activity-content/daily-activity-content";
import {useHistory} from "react-router-dom";

export function AerobicDashboard() {
    const history = useHistory();

    const [selectedTab, setSelectedTab] = useState('daily-tab');

    const handleTabChange = (e: any) => {
        setSelectedTab(e.detail.value);
    };

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/")}>Main</IonButton>

            <IonSegment value={selectedTab} onIonChange={handleTabChange}>
                <IonSegmentButton value="daily-tab">
                    Daily Activity
                </IonSegmentButton>
                <IonSegmentButton value="activities-tab">
                    Activities
                </IonSegmentButton>
            </IonSegment>
            {selectedTab === "activities-tab" && <ActivitiesContent/>}
            {selectedTab === "daily-tab" && <DailyActivityContent/>}
        </IonPage>
    );
}