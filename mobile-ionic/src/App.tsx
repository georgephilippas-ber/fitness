import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Home from './pages/Home';

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
import {ProductSearch} from "./components/modules/nutrition/atomic/product-search/product-search";
import {ProductCard} from "./components/modules/nutrition/atomic/product-card/product-card";
import {fake_product} from "@shared/common/faker/nutrition";

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
        <ProductSearch/>
        {/*<ProductCard hideCardContent product={fake_product()}/>*/}
        {/*<ProductCard hideCardContent product={fake_product()}/>*/}
        {/*<ProductCard hideCardHeader={true} product={fake_product()}/>*/}
        {/*<ProductCard hideCardHeader={true} product={fake_product()}/>*/}
    </>
}

export default App;
