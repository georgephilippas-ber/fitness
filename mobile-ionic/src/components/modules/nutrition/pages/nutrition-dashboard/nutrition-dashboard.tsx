import {IonButton, IonContent, IonPage} from "@ionic/react";
import {DietaryProfileManagedCard} from "../../managed/dietary-profile/dietary-profile-managed-card";
import {useHistory} from "react-router-dom";

export function NutritionDashboard()
{
    const history = useHistory();

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/")}>Back</IonButton>
            <IonContent>
                <DietaryProfileManagedCard/>
            </IonContent>
        </IonPage>
    )
}
