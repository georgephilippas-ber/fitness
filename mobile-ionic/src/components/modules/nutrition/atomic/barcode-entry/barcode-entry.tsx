import {IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput} from "@ionic/react";
import {useEffect, useState} from "react";

export function BarcodeEntry({onValidBarcode}: { onValidBarcode: (barcode: string) => void }) {
    const [barcodeField, set_barcodeField] = useState<string>("");

    const [update, forceUpdate] = useState<number>(0);

    useEffect(() => {
        switch (barcodeField.length) {
            case 8: // EAN-8
            case 12: // UPC
            case 13: // EAN-13
                onValidBarcode(barcodeField);
                break;
            default:
                onValidBarcode("");
        }

    }, [barcodeField])

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Packaged Product
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonInput inputMode={"numeric"} value={barcodeField} onIonInput={event => {
                    set_barcodeField((event.target.value?.toString() || "").replace(new RegExp("[^0-9]", "g"), ""));
                    forceUpdate(prevState => (prevState + 1) % 2);
                }} label={"product barcode"} labelPlacement={"floating"}/>
            </IonCardContent>
        </IonCard>
    )
}