import {IonButton, IonPage, IonRouterOutlet, setupIonicReact} from '@ionic/react';

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
import {Route, useHistory} from "react-router-dom";

import {IonReactRouter} from "@ionic/react-router";
import {ProductsPage} from "./components/modules/nutrition/pages/products/products";
import {NutritionDashboard} from "./components/modules/nutrition/pages/nutrition-dashboard/nutrition-dashboard";
import {AerobicDashboard} from "./components/modules/aerobic/pages/dashboard/aerobic-dashboard";

setupIonicReact();

export function MainHome() {
    const history = useHistory();

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/nutrition-home")}>Nutrition</IonButton>
            <IonButton onClick={() => history.push("/aerobic-home")}>Aerobic</IonButton>
        </IonPage>
    )
}

export function NutritionHome() {
    const history = useHistory();

    return (
        <IonPage>
            <IonButton onClick={() => history.push("/")}>Main</IonButton>
            <IonButton onClick={() => history.push("/products")}>Products</IonButton>
            <IonButton onClick={() => history.push("/nutrition-dashboard")}>Dashboard</IonButton>
        </IonPage>
    );
}

const test: boolean = false;

function Test() {
    return (
        <AerobicDashboard/>
    )
}

function App() {
    return (test ? <Test/> :
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact={true} path={"/"}>
                        <MainHome/>
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
                    <Route exact={true} path={"/aerobic-home"}>
                        <AerobicDashboard/>
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
