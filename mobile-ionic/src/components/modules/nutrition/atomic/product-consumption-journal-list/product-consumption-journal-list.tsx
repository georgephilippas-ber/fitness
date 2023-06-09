import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonIcon, IonList} from "@ionic/react";
import {ProductConsumptionJournalEntry} from "../product-consumption-journal-entry/product-consumption-journal-entry";
import {getPairs} from "./product-consumption-journal-list-controller";

import "../product-consumption-journal-entry/product-consumption-journal-entry.css"
import {alarm, fastFood} from "ionicons/icons";

export function ProductConsumptionJournalList({product_consumption_array, products}: {
    product_consumption_array: product_consumption_type[],
    products: product_type[]
}) {
    return (
        <IonList>
            <div className={"product-consumption-journal-entry"}>
                <div className={"servings"}><IonIcon icon={fastFood}/></div>
                <div className={"name"}>Name</div>
                <div className={"energy"}>Calories</div>
                <div className={"time"}><IonIcon icon={alarm}/></div>
            </div>
            {getPairs(product_consumption_array, products).sort((a, b) => a[0].referenceDate - b[0].referenceDate).map(value => {
                return <ProductConsumptionJournalEntry key={value[0].id} product={value[1]}
                                                       product_consumption={value[0]}/>
            })}
        </IonList>
    )
}
