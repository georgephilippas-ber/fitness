import {IonPage, IonSegment, IonSegmentButton} from "@ionic/react";
import {useEffect, useState} from "react";
import {SearchSegment} from "./segments/search";
import {productConsumptionManager, productManager} from "../../../../../core/instances";
import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {product_state_updater_type} from "../../../../schema/schema";
import {faker} from "@faker-js/faker";
import {DateTime} from "luxon";

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
                    productManager.all().then(value1 => {
                            set_available_products(value1);
                        }
                    );
            }
        });

        return () => {
            subscription.unsubscribe();
        }
    }, []);

    const add_handler: product_state_updater_type = async (id, quantity, servings) => {
        await productConsumptionManager.insert([{
            product_id: id,
            quantity,
            id: faker.datatype.uuid(),
            referenceDate: DateTime.now().toMillis()
        }]);
    };

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
            {selectedTab === "search-tab" && <SearchSegment add_handler={add_handler} products={available_products}/>}
        </IonPage>
    )
}
