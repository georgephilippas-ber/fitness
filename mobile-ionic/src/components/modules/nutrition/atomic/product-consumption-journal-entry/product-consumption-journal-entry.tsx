import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {useState} from "react";

import "./product-consumption-journal-entry.css";
import {IonBackdrop, IonButton, IonDatetime, IonModal} from "@ionic/react";


function Modal({open, onDidDismiss}: { open: boolean, onDidDismiss: () => void }) {
    return (
        <IonModal onDidDismiss={() => onDidDismiss()} isOpen={open}>

            <div style={{position: "relative", zIndex: 100}}>
                <IonDatetime presentation={"month"}/>
                <IonButton style={{position: "absolute", zIndex: 300}} onClick={(e) => {
                    console.log("clicked");
                    // e.stopPropagation();
                    onDidDismiss();
                }}>Ok</IonButton>

            </div>
            <IonBackdrop></IonBackdrop>
        </IonModal>)
}

export function ProductConsumptionJournalEntry({product, product_consumption}: {
    product: product_type,
    product_consumption: product_consumption_type
}) {
    const [referenceDate_state, set_referenceDate_state] = useState<number>(product_consumption.referenceDate);

    const [modalOpen, set_modalOpen] = useState<boolean>(false);

    return (
        <div>
            <IonButton onClick={() => set_modalOpen(true)}>Modal</IonButton>
            {modalOpen &&
                <Modal open={true} onDidDismiss={() => set_modalOpen(false)}/>}
        </div>
    );
}
