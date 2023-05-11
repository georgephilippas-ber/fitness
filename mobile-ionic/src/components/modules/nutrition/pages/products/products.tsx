import {IonPage, IonSegment, IonSegmentButton} from "@ionic/react";
import {useEffect, useState} from "react";
import {ProductsListSearch} from "../../atomic/products-list-search/products-list-search";
import {fake_product_array} from "@shared/common/faker/nutrition";
import {SearchSegment} from "./segments/search";
import {productManager} from "../../../../../core/instances";
import {product_type} from "@shared/common/schema/nutrition/nutrition";

export function ProductsPage() {
    const [selectedTab, setSelectedTab] = useState('journal-tab');

    const handleTabChange = (e: any) => {
        setSelectedTab(e.detail.value);
    };

    const [available_products, set_available_products] = useState<product_type[]>([]);

    useEffect(() => {
        const subscription = productManager.subject().subscribe(value => {
            switch (value) {
                case "subscribe":
                case "insert":
                case "update":
                case "remove":
                    productManager.all().then(value1 => set_available_products(value1));
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

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
            {selectedTab === "search-tab" && <SearchSegment products={available_products}/>}
        </IonPage>
    )
}
