import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {useState} from "react";
import {IonDatetime, IonItem, IonItemOption, IonItemOptions, IonItemSliding} from "@ionic/react";
import {DateTime} from "luxon";

import "./product-consumption-journal-entry.css";

export function ProductConsumptionJournalEntry({product, product_consumption}: {
    product: product_type,
    product_consumption: product_consumption_type
}) {
    const [referenceDate_state, set_referenceDate_state] = useState<number>(product_consumption.referenceDate);

    const [displayPicker, set_displayPicker] = useState<boolean>(false);

    return <IonItemSliding>
        <IonItem className={"product-consumption-journal-entry"}>
            <div>
                {product.product_designation.name}
            </div>
            <div>
                {(product_consumption.quantity / product.serving_size).toFixed(1)}
            </div>
            <div>
                {(product_consumption.quantity / 100. * product.fundamental_nutrients.energy).toFixed(1)}
            </div>
            <div onClick={() => set_displayPicker(true)}>
                {DateTime.fromMillis(referenceDate_state).toLocaleString(DateTime.TIME_24_SIMPLE)}
            </div>
            {displayPicker &&
                <IonDatetime style={{position: "absolute", width: "fit-content", padding: "1em"}}
                             onClick={() => set_displayPicker(false)} onIonChange={(e) => {
                    set_referenceDate_state(prevState => {
                        let current_: DateTime = DateTime.fromMillis(product_consumption.referenceDate);

                        try {
                            const time_ = DateTime.fromISO(typeof e.detail.value === "string" ? (e.detail.value) : "");

                            current_ = current_.set({
                                hour: time_.hour,
                                minute: time_.minute,
                                second: 0.,
                                millisecond: 0.
                            });

                            return current_.toMillis();
                        } catch (e) {

                            return prevState;
                        }
                    });
                }} presentation={"time"} value={DateTime.fromMillis(referenceDate_state).toISO()}></IonDatetime>}
        </IonItem>
        <IonItemOptions side="end">
            <IonItemOption color="danger" expandable onClick={() => console.log('Delete clicked')}>
                Delete
            </IonItemOption>
        </IonItemOptions>
    </IonItemSliding>
}