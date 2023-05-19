import {IonButton, IonContent, IonPage} from "@ionic/react";
import {DietaryProfile} from "../../managed/dietary-profile/dietary-profile";
import {useHistory} from "react-router-dom";

export function NutritionDashboard()
{
    const history = useHistory();

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/")}>Back</IonButton>
            <IonContent>
                <DietaryProfile/>
            </IonContent>
        </IonPage>
    )
}
