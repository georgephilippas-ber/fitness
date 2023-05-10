import {IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import {useState} from "react";

import {fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";

export type product_search_type =
    {
        barcode: string;
        food: string;
        name: string;
        characteristics: string;
        sort?:
            {
                key: keyof fundamental_nutrients_type;
                direction: "ascending" | "descending";
            }
    }

function empty_productSearch(): product_search_type {
    return {
        food: "",
        barcode: "",
        name: "",
        characteristics: ""
    }
}

export function ProductSearch() {
    const [product_search, set_product_search] = useState<product_search_type>(empty_productSearch());

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Search
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>

            </IonCardContent>
        </IonCard>
    )
}


// export function ProductSearch() {
//     const [selectedSegment, setSelectedSegment] = useState('segment1');
//
//     return (
//         <IonPage>
//             <IonContent>
//                 <IonSegment value={selectedSegment}
//                             onIonChange={e => setSelectedSegment(e.detail.value?.toString() || "segment1")}>
//                     <IonSegmentButton value="segment1">
//                         <IonLabel>Search</IonLabel>
//                     </IonSegmentButton>
//                     <IonSegmentButton value="segment2">
//                         <IonLabel>Products</IonLabel>
//                     </IonSegmentButton>
//                     <IonSegmentButton value="segment3">
//                         <IonLabel>Register</IonLabel>
//                     </IonSegmentButton>
//                 </IonSegment>
//
//                 <IonButton>asas</IonButton>
//                 {selectedSegment === 'segment1' && <p>This is the content for segment 1</p>}
//                 {selectedSegment === 'segment2' && <p>This is the content for segment 2</p>}
//                 {selectedSegment === 'segment3' && <p>This is the content for segment 3</p>}
//             </IonContent>
//         </IonPage>
//     );
// }

