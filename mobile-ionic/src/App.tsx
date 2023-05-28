import {IonButton, IonContent, IonPage, IonRouterOutlet, setupIonicReact} from '@ionic/react';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import React from "react";
import {Redirect, Route, useHistory} from "react-router-dom";
import {IonReactRouter} from "@ionic/react-router";
import {ProductsPage} from "./components/modules/nutrition/pages/products/products";
import {NutritionDashboard} from "./components/modules/nutrition/pages/nutrition-dashboard/nutrition-dashboard";
import {ActivitiesContent} from "./components/modules/aerobic/fetching/activities-content/activities-content";
import {DailyActivity} from "./components/modules/aerobic/charts/daily-activity/daily-activity";
import {fake_daily_activity, fake_running_activity} from "@shared/common/faker/activities";
import {
    DailyActivityContent
} from "./components/modules/aerobic/fetching/daily-activity-content/daily-activity-content";

setupIonicReact();

export function NutritionHome() {
    const history = useHistory();

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/products")}>Products</IonButton>
            <IonButton onClick={() => history.push("/nutrition-dashboard")}>Dashboard</IonButton>
        </IonPage>
    )
}

const test: boolean = true;

fake_running_activity()

function Test() {
    return (
        <IonPage>
            <DailyActivityContent/>
            <ActivitiesContent/>
        </IonPage>
    )
}

function App() {
    return (test ? <Test/> :
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact={true} path={"/"}>
                        <Redirect to={"/nutrition-home"}/>
                    </Route>
                    <Route exact={true} path={"/nutrition-home"}>
                        <NutritionHome/>
                    </Route>
                    <Route exact={true} path={"/products"}>
                        <ProductsPage/>
                    </Route>
                    <Route exact={true} path={"/nutrition-dashboard"}>
                        <NutritionDashboard/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
    )
}

export default App;

// const App: React.FC = () => (
//     <IonApp>
//         <IonReactRouter>
//             <IonRouterOutlet>
//                 <Route exact path="/home">
//                     <Home/>
//                 </Route>
//                 <Route exact path="/">
//                     <Redirect to="/home"/>
//                 </Route>
//             </IonRouterOutlet>
//         </IonReactRouter>
//     </IonApp>
// );
