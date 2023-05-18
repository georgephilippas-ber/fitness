import {BarcodeEntry} from "../../../atomic/barcode-entry/barcode-entry";
import {useEffect, useState} from "react";
import {useOpenFoodFacts} from "../../../../../../model/nutrition/hooks/openfoodfacts";
import {NutriScore} from "../../../../../../assets/Nutri-Score/NutriScore";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from "@ionic/react";


export function RegisterSegment() {
    const [barcode, set_barcode] = useState<string>("");

    const [product_input, score] = useOpenFoodFacts(barcode);

    useEffect(() => {
        //TODO: try to get a product_type from the product_input and display the corresponding nutrition card
    }, [product_input]);


    return (
        <>
            <BarcodeEntry onValidBarcode={barcode => set_barcode(barcode)}/>
            {product_input ?
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>
                            NutriScore
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div style={{margin: "auto", width: "fit-content"}}>
                            {score?.[1] ? <NutriScore height={"3em"} category={score[1]}/> : null}
                        </div>
                    </IonCardContent>
                </IonCard> : null}
        </>
    )
}