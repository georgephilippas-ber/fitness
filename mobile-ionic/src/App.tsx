import {IonPage, setupIonicReact} from '@ionic/react';

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
import {ProductsPage} from "./components/modules/nutrition/pages/products/products";
import {BarcodeEntry} from "./components/modules/nutrition/atomic/barcode-entry/barcode-entry";
import {RegisterSegment} from "./components/modules/nutrition/pages/products/segments/register";

setupIonicReact();

function App() {
    return (
        // <div>
        //     <NutriScore category={fromScore(faker.datatype.number({min: -15, max: 40}), "solid")}/>
        // </div>
        // // <OpenFoodFactsView barcode={"737628064502"}/>
        // <ProductsPage/>
        <IonPage>
            <RegisterSegment/>
        </IonPage>
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
