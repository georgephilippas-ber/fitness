import {IonButton, IonContent, IonPage} from "@ionic/react";
import {DietaryProfileManagedCard} from "../../managed/dietary-profile/dietary-profile-managed-card";
import {useHistory} from "react-router-dom";
import {
    CalorieConsumptionTimeSeriesManagedCard
} from "../../managed/dietary-profile/calorie-consumption-time-series-managed-card";

export function NutritionDashboard()
{
    const history = useHistory();

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/")}>Back</IonButton>
            <IonContent>
                <DietaryProfileManagedCard/>
                <CalorieConsumptionTimeSeriesManagedCard/>
            </IonContent>
        </IonPage>
    )
}
