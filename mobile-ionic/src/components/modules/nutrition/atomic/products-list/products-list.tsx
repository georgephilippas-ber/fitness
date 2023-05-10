import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonContent} from "@ionic/react";
import {ProductCard} from "../product-card/product-card";

export function ProductsList({products}: { products: product_type[] }) {
    return (
        <IonContent>
            {products.map(value => <ProductCard key={value.id} product={value}/>)}
        </IonContent>
    )
}
