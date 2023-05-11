import {IonList, IonPage, setupIonicReact} from '@ionic/react';

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
import {fake_product, fake_product_array, fake_product_consumption} from "@shared/common/faker/nutrition";
import {ProductsListSearch} from "./components/modules/nutrition/atomic/products-list-search/products-list-search";
import {ProductAddControls} from "./components/modules/nutrition/atomic/product-add-controls/product-add-controls";
import {ProductCard} from "./components/modules/nutrition/atomic/product-card/product-card";
import {ProductsPage} from "./components/modules/nutrition/pages/products/products";
import {
    ProductConsumptionJournalEntry
} from "./components/modules/nutrition/atomic/product-consumption-journal-entry/product-consumption-journal-entry";
import {DateTime} from "luxon";
import {faker} from "@faker-js/faker";

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

const products = fake_product_array(0x10);

function App() {
    return <>
        {/*<ProductsPage/>*/}
        <IonList>
            <ProductConsumptionJournalEntry product={faker.helpers.arrayElement(products)}
                                            product_consumption={fake_product_consumption(products, DateTime.now())}/>
            <ProductConsumptionJournalEntry product={faker.helpers.arrayElement(products)}
                                            product_consumption={fake_product_consumption(products, DateTime.now())}/>
            <ProductConsumptionJournalEntry product={faker.helpers.arrayElement(products)}
                                            product_consumption={fake_product_consumption(products, DateTime.now())}/>
            <ProductConsumptionJournalEntry product={faker.helpers.arrayElement(products)}
                                            product_consumption={fake_product_consumption(products, DateTime.now())}/>
        </IonList>
    </>
}

export default App;
