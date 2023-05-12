import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonList} from "@ionic/react";
import {ProductConsumptionJournalEntry} from "../product-consumption-journal-entry/product-consumption-journal-entry";

function getProduct(product_consumption: product_consumption_type, products: product_type[]): product_type | undefined {
    return products.filter(value => value.id === product_consumption.product_id)?.[0];
}

function getPairs(product_consumption_array: product_consumption_type[], products: product_type[]): [product_consumption_type, product_type][] {
    return product_consumption_array.map(value => [value, getProduct(value, products)] as [product_consumption_type, product_type | undefined]).filter(value => value[1]) as [product_consumption_type, product_type][];
}

export function ProductConsumptionJournalList({product_consumption_array, products}: {
    product_consumption_array: product_consumption_type[],
    products: product_type[]
}) {
    return (
        <IonList>
            {getPairs(product_consumption_array, products).sort((a, b) => a[0].referenceDate - b[0].referenceDate).map(value => {
                return <ProductConsumptionJournalEntry key={value[0].id} product={value[1]}
                                                       product_consumption={value[0]}/>
            })}
        </IonList>
    )
}
