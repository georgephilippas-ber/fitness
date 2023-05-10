import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonInput, IonLabel,
    IonRadio, IonRadioGroup,
    IonSelect, IonSelectOption, RadioGroupChangeEventDetail
} from "@ionic/react";
import React, {FormEvent, FormEventHandler, useEffect, useState} from "react";

import {fundamental_nutrients_keys, fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";

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

type sort_direction_type = "ascending" | "descending";

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
        console.log(sortCriterion, sortDirection);

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

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Search
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonInput onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, barcode: e.detail.value || ""}
                })} value={productSearch.barcode} label={"barcode"} labelPlacement={"floating"}/>
                <IonInput onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, name: e.detail.value || ""}
                })} value={productSearch.name} label={"name"} labelPlacement={"floating"}/>
                <IonInput onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, food: e.detail.value || ""}
                })} value={productSearch.food} label={"food"} labelPlacement={"floating"}/>
                <IonInput onIonInput={(e) => set_productSearch(prevState => {
                    return {...prevState, characteristics: e.detail.value || ""}
                })} value={productSearch.characteristics} label={"characteristics"} labelPlacement={"floating"}/>

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
                            <IonRadio slot="start" value="ascending" name="myRadioGroup"/>
                        </div>
                        <div style={{display: "flex", flexDirection: "row", gap: "0.45em"}}>
                            <IonLabel>descending</IonLabel>
                            <IonRadio slot="start" value="descending" name="myRadioGroup"/>
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

