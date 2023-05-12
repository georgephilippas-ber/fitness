import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {
    ProductConsumptionJournalList
} from "../../../atomic/product-consumption-journal-list/product-consumption-journal-list";
import {IonContent, IonLabel} from "@ionic/react";

export function JournalSegment({products, product_consumption_array}: {
    products: product_type[],
    product_consumption_array: product_consumption_type[]
}) {
    return (
        <IonContent>
            {product_consumption_array.length &&
                <ProductConsumptionJournalList product_consumption_array={product_consumption_array}
                                               products={products}/>}
            {!product_consumption_array.length && <IonLabel>!product_consumption_array</IonLabel>}
        </IonContent>
    )
}
