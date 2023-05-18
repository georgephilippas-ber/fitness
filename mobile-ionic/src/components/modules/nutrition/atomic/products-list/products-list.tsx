import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonCard, IonCardHeader, IonCardSubtitle, IonContent, IonToast} from "@ionic/react";
import {ProductCard} from "../product-card/product-card";
import {useState} from "react";

import {Virtuoso} from 'react-virtuoso';
import {product_state_updater_type} from "../../../../../model/schema/schema";

export function ProductsList({products, add_handler}: {
    products: product_type[],
    add_handler?: product_state_updater_type
}) {
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
                <Virtuoso style={{height: "100%"}} totalCount={products.length} data={products}
                          itemContent={(index, data) => {
                              return <ProductCard add={(id, quantity, servings) => {
                                  add_handler?.(id, quantity, servings);

                                  set_productAdded_toast([id, quantity, servings]);
                              }} hideCardHeader={false} hideCardContent={true} key={data.id}
                                                  product={data}/>
                          }}/>
                <IonToast
                    message={"added " + productAdded_toast?.[2]?.toFixed(1) + " serving(s) of " + products.filter(value => value.id === productAdded_toast?.[0])?.[0]?.product_designation.name}
                    isOpen={!!productAdded_toast}
                    onDidDismiss={() => set_productAdded_toast(undefined)} duration={1_750}/>
            </IonContent>
        </>
    );
}
