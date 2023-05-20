import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {
    ProductConsumptionJournalList
} from "../../../atomic/product-consumption-journal-list/product-consumption-journal-list";
import {IonCard, IonCardContent, IonContent} from "@ionic/react";
import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import {getPairs} from "../../../atomic/product-consumption-journal-list/product-consumption-journal-list-controller";

function average(array: number[]): number | undefined {
    return array.length ? array.reduce((previousValue, currentValue) => previousValue + currentValue) / array.length : undefined;
}

export function JournalSegment({products, product_consumption_array}: {
    products: product_type[],
    product_consumption_array: product_consumption_type[]
}) {
    const [dietScore, set_dietScore] = useState<number | undefined>(undefined);

    useEffect(() => {
        const scores_ = getPairs(product_consumption_array, products).map(value => value[1].evaluation.nutriscore?.score || value[1].evaluation.foundation?.score || value[1]?.evaluation.subjective?.score || 0.)

        set_dietScore(average(scores_));
    }, []);

    return (<>
            <div style={{fontSize: "2.75em", display: "flex", alignItems: "center", padding: "0.65em", margin: "auto"}}>
                {dietScore && dietScore * 100.}
            </div>
            <IonContent>
                {product_consumption_array.length ?
                    <ProductConsumptionJournalList product_consumption_array={product_consumption_array}
                                                   products={products}/>
                    :
                    <IonCard style={{
                        width: "80vw",
                        margin: "2.65em auto",
                    }}><IonCardContent>{faker.lorem.lines(20)}</IonCardContent></IonCard>}
            </IonContent>
        </>
    )
}

