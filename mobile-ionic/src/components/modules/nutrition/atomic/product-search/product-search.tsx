import {
    IonCard,
    IonCardContent,
    IonCardHeader, IonCardSubtitle,
    IonCardTitle,
    IonInput,
    IonLabel,
    IonRadio,
    IonRadioGroup, IonSearchbar,
    IonSelect,
    IonSelectOption
} from "@ionic/react";
import React, {useEffect, useState} from "react";

import {fundamental_nutrients_keys, fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";
import {empty_productSearch, product_search_type, sort_direction_type} from "./product-search-controller";

export function ProductSearch({handleSearch}: { handleSearch?: (product_search: product_search_type) => void }) {
    const [productSearch, set_productSearch] = useState<product_search_type>(empty_productSearch());

    const [sortDirection, set_sortDirection] = useState<sort_direction_type>("descending");
    const [sortCriterion, set_sortCriterion] = useState<keyof fundamental_nutrients_type>("energy");

    const handleSortDirectionChange = (event: CustomEvent<{ value: sort_direction_type }>): void => {
        set_sortDirection(event.detail.value);
    };

    function handleSortCriterionChange(event: CustomEvent<{ value: keyof fundamental_nutrients_type }>) {
        set_sortCriterion(event.detail.value);
    }

    useEffect(() => {
        set_productSearch(prevState => {
            return {
                ...prevState, sort: {
                    key: sortCriterion,
                    direction: sortDirection
                }
            };
        });
    }, [sortDirection, sortCriterion]);

    useEffect(() => {
        handleSearch?.(productSearch);
    }, [productSearch]);

    const [searchContent_visible, set_searchContent_visble] = useState<boolean>(true);

    return (
        <IonCard>
            <IonCardHeader onClick={() => set_searchContent_visble(prevState => !prevState)}>
                <IonCardTitle>
                    Search
                </IonCardTitle>
                <IonCardSubtitle>
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent style={{display: searchContent_visible ? "block" : "none"}}>
                <IonInput onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, barcode: e.detail.value || ""}
                })} value={productSearch.barcode} label={"barcode"} labelPlacement={"floating"}/>
                <IonSearchbar placeholder={"name"} onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, name: e.detail.value || ""}
                })} value={productSearch.name} animated={true}/>
                <IonSearchbar placeholder={"food"} onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, food: e.detail.value || ""}
                })} value={productSearch.food}/>
                <IonSearchbar placeholder={"characteristics"} onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, characteristics: e.detail.value || ""}
                })} value={productSearch.characteristics}/>

                <div style={{display: "flex", alignItems: "flex-end", gap: "0.85em"}}>
                    <IonSelect style={{maxWidth: "10em"}} labelPlacement={"floating"} label={"sort by"}
                               value={sortCriterion} onIonChange={handleSortCriterionChange}>
                        {fundamental_nutrients_keys.sort().map(value => <IonSelectOption key={value}
                                                                                         value={value}>{value}</IonSelectOption>)}
                    </IonSelect>
                    <IonRadioGroup onIonChange={handleSortDirectionChange} value={sortDirection} style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "0.85em",
                        marginBottom: "0.60em"
                    }}>
                        <div style={{display: "flex", flexDirection: "row", gap: "0.45em"}}>
                            <IonLabel>ascending</IonLabel>
                            <IonRadio color={"medium"} slot="start" value="ascending" name="myRadioGroup"/>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", gap: "0.45em"}}>
                            <IonLabel>descending</IonLabel>
                            <IonRadio color={"medium"} slot="start" value="descending" name="myRadioGroup"/>
                        </div>
                    </IonRadioGroup>
                </div>
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

