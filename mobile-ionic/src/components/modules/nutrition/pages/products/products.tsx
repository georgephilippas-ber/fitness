import {IonPage, IonSegment, IonSegmentButton} from "@ionic/react";
import {useEffect, useState} from "react";
import {ProductsListSearch} from "../../atomic/products-list-search/products-list-search";
import {fake_product_array} from "@shared/common/faker/nutrition";
import {SearchSegment} from "./segments/search";
import {productManager} from "../../../../../core/instances";

const fake = fake_product_array(400);

export function ProductsPage() {
    const [selectedTab, setSelectedTab] = useState('journal-tab');

    const handleTabChange = (e: any) => {
        setSelectedTab(e.detail.value);
    };

    useEffect(() => {
       productManager.subject().subscribe(value => {

       });
    });

    return (
        <IonPage>
            <IonSegment value={selectedTab} onIonChange={handleTabChange}>
                <IonSegmentButton value="search-tab">
                    Search
                </IonSegmentButton>
                <IonSegmentButton value="journal-tab">
                    Journal
                </IonSegmentButton>
                <IonSegmentButton value="register-tab">
                    Register
                </IonSegmentButton>
            </IonSegment>
            {selectedTab === "search-tab" && <SearchSegment  products={fake}/>}
        </IonPage>
    )
}
