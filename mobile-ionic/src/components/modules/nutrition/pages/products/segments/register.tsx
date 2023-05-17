import {BarcodeEntry} from "../../../atomic/barcode-entry/barcode-entry";
import {useState} from "react";
import {OpenFoodFacts} from "../../../external/openfoodfacts";

export function RegisterSegment() {
    const [barcode, set_barcode] = useState<string>("");

    return (
        <>
            <BarcodeEntry onValidBarcode={barcode => set_barcode(barcode)}/>
            <OpenFoodFacts barcode={barcode}/>
        </>
    )
}