import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonContent, IonToast} from "@ionic/react";
import {ProductCard} from "../product-card/product-card";
import {useState} from "react";

export function ProductsList({products}: { products: product_type[] }) {
    const [productAdded_toast, set_productAdded_toast] = useState<[string, number, number] | undefined>(undefined)

    return (
        <>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>
                        {products.length} products
                    </IonCardSubtitle>
                </IonCardHeader>
            </IonCard>
            <IonContent>
                {products.map(value => <ProductCard add={(id, quantity, servings) => {
                    set_productAdded_toast([id, quantity, servings])
                }} hideCardHeader={false} hideCardContent={true} key={value.id}
                                                    product={value}/>)}

                <IonToast
                    message={"added " + productAdded_toast?.[2]?.toFixed(1) + " serving(s) of " + products.filter(value => value.id === productAdded_toast?.[0])?.[0]?.product_designation.name}
                    isOpen={!!productAdded_toast}
                    onDidDismiss={() => set_productAdded_toast(undefined)} duration={1_750}/>
            </IonContent>
        </>
    );
}
