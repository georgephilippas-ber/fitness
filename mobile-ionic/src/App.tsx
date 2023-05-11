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
import {fake_product, fake_product_array} from "@shared/common/faker/nutrition";
import {ProductsListSearch} from "./components/modules/nutrition/atomic/products-list-search/products-list-search";
import {ProductAddControls} from "./components/modules/nutrition/atomic/product-add-controls/product-add-controls";

setupIonicReact();

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

function App() {
    return <>
        <IonPage>
            <ProductAddControls product={fake_product("10")}/>
        </IonPage>
    </>
}

export default App;
