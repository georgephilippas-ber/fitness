import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonList} from "@ionic/react";
import {ProductConsumptionJournalEntry} from "../product-consumption-journal-entry/product-consumption-journal-entry";
import {getPairs} from "./product-consumption-journal-list-controller";


export function ProductConsumptionJournalList({product_consumption_array, products}: {
    product_consumption_array: product_consumption_type[],
    products: product_type[]
}) {
    return (
        <IonList>
            <div>
                calories
            </div>
            {getPairs(product_consumption_array, products).sort((a, b) => a[0].referenceDate - b[0].referenceDate).map(value => {
                return <ProductConsumptionJournalEntry key={value[0].id} product={value[1]}
                                                       product_consumption={value[0]}/>
            })}
        </IonList>
    )
}
