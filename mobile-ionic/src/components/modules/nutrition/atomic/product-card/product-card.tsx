import {fundamental_nutrients_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonCard, IonCardContent, IonCardHeader} from "@ionic/react";

import "./product-card.css";

export function ProductCard({product}: { product: product_type }) {
    return (
        <IonCard>
            <IonCardHeader>

            </IonCardHeader>
            <IonCardContent>
                <FundamentalNutrients fundamental_nutrients={product.fundamental_nutrients}/>
            </IonCardContent>
        </IonCard>
    )
}

export function FundamentalNutrients({fundamental_nutrients}: { fundamental_nutrients: fundamental_nutrients_type }) {
    return (
        <div className={"fundamental-nutrients-container"}>
            Nutrients
        </div>
    )
}