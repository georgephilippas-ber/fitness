import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonInput } from "@ionic/react";
import { useEffect, useState } from "react";

import { Camera } from "../../camera/camera";


export function BarcodeEntry({ initialValue, onValidBarcode }: {
    initialValue?: string,
    onValidBarcode: (barcode: string) => void
})
{
    const [barcodeField, set_barcodeField] = useState<string>(initialValue || "");

    const [update, forceUpdate] = useState<number>(0);

    useEffect(() =>
    {
        switch (barcodeField.length)
        {
            case 8: // EAN-8
            case 12: // UPC
            case 13: // EAN-13
                onValidBarcode(barcodeField);
                break;
            default:
                onValidBarcode("");
        }

    }, [barcodeField])

    useEffect(() =>
    {
        set_barcodeField(initialValue || "");
    }, [initialValue])

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Packaged Product
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <IonInput inputMode={"numeric"} value={barcodeField} onIonInput={event =>
                {
                    set_barcodeField((event.target.value?.toString() || "").replace(new RegExp("[^0-9]", "g"), ""));
                    forceUpdate(prevState => (prevState + 1) % 2);
                }} label={"product barcode"} labelPlacement={"floating"} />
                <Camera onBarcode={(barcode: string) =>
                {
                    set_barcodeField(barcode);
                    console.log(barcode);
                }} />
            </IonCardContent>
        </IonCard>
    )
}