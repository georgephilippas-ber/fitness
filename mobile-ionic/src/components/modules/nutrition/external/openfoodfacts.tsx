import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from "@ionic/react";
import {useEffect, useState} from "react";
import axios from "axios";

function getURL(barcode: string): string {
    return `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
}

export function OpenFoodFacts({barcode}: { barcode: string }) {
    const [data, set_data] = useState<string>("");

    useEffect(() => {
        if (barcode)
            axios.get(getURL(barcode)).then(value => {
                set_data(JSON.stringify(value.data));
            });
    }, [barcode]);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>
                    {barcode}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {data}
            </IonCardContent>
        </IonCard>
    )
}
