import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {
    ProductConsumptionJournalList
} from "../../../atomic/product-consumption-journal-list/product-consumption-journal-list";
import {IonCard, IonCardContent, IonContent, IonLabel} from "@ionic/react";
import {faker} from "@faker-js/faker";

export function JournalSegment({products, product_consumption_array}: {
    products: product_type[],
    product_consumption_array: product_consumption_type[]
}) {
    return (
        <IonContent>
            {product_consumption_array.length ?
                <ProductConsumptionJournalList product_consumption_array={product_consumption_array}
                                               products={products}/> :
                <IonCard style={{
                    width: "80vw",
                    margin: "2.65em auto",
                }}><IonCardContent>{faker.lorem.lines(20)}</IonCardContent></IonCard>}
        </IonContent>
    )
}

