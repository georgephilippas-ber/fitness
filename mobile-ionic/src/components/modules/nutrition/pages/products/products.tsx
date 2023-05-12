import {IonPage, IonSegment, IonSegmentButton} from "@ionic/react";
import {useEffect, useState} from "react";
import {SearchSegment} from "./segments/search";
import {productConsumptionManager, productManager} from "../../../../../core/instances";
import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {product_state_updater_type} from "../../../../schema/schema";
import {faker} from "@faker-js/faker";
import {DateTime} from "luxon";
import {JournalSegment} from "./segments/journal";

export function ProductsPage() {
    const [selectedTab, setSelectedTab] = useState('journal-tab');

    const handleTabChange = (e: any) => {
        setSelectedTab(e.detail.value);
    };

    const [available_products, set_available_products] = useState<product_type[]>([]);
    const [consumption, set_consumption] = useState<product_consumption_type[]>([]);

    useEffect(() => {
        const productManager_subscription = productManager.subject().subscribe(value => {
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

        const productConsumptionManager_subscription = productConsumptionManager.subject().subscribe(value => {
            switch (value) {
                case "subscribe":
                case "insert":
                case "update":
                case "remove":
                    productConsumptionManager.all().then(value1 => {
                            set_consumption(value1);
                        }
                    );
            }
        });

        return () => {
            productManager_subscription.unsubscribe();
            productConsumptionManager_subscription.unsubscribe();
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
            {selectedTab === "journal-tab" &&
                <JournalSegment product_consumption_array={consumption} products={available_products}/>}
        </IonPage>
    )
}
