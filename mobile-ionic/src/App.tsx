import {IonContent, IonPage, setupIonicReact} from '@ionic/react';

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
import {fake_product_array, fake_product_consumption_array} from "@shared/common/faker/nutrition";
import React from "react";
import {
    ProductConsumptionJournalList
} from "./components/modules/nutrition/atomic/product-consumption-journal-list/product-consumption-journal-list";

setupIonicReact();

const fakeProducts = fake_product_array(0x10);
const fakeProductConsumption = fake_product_consumption_array(fakeProducts, 68);

function App() {
    return (
        <IonPage>
            <IonContent>
                <ProductConsumptionJournalList product_consumption_array={fakeProductConsumption} products={fakeProducts}/>
            </IonContent>
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
