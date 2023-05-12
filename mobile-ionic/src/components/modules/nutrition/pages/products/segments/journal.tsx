import {
    fromScore,
    nutriscore_categories_type,
    product_consumption_type,
    product_type
} from "@shared/common/schema/nutrition/nutrition";
import {
    ProductConsumptionJournalList
} from "../../../atomic/product-consumption-journal-list/product-consumption-journal-list";
import {IonCard, IonCardContent, IonContent} from "@ionic/react";
import {faker} from "@faker-js/faker";
import {NutriScore} from "../../../../../../assets/Nutri-Score/NutriScore";
import {useEffect, useState} from "react";
import {getPairs} from "../../../atomic/product-consumption-journal-list/product-consumption-journal-list-controller";

function average(array: number[]): number | undefined {
    return array.length ? array.reduce((previousValue, currentValue) => previousValue + currentValue) / array.length : undefined;
}

export function JournalSegment({products, product_consumption_array}: {
    products: product_type[],
    product_consumption_array: product_consumption_type[]
}) {

    const [category_, set_category_] = useState<nutriscore_categories_type>("E");

    useEffect(() => {
        const scores_ = getPairs(product_consumption_array, products).map(value => value[1].evaluation.nutriscore.score)

        set_category_(fromScore(average(scores_) || Infinity, "solid"));
    }, []);

    return (<>
            <div style={{display: "flex", alignItems: "center", gap: "1em", margin: "1em"}}>
                <NutriScore height={"4em"} category={category_}/>
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

