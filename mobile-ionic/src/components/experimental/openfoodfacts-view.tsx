import {useEffect, useState} from "react";
import axios from "axios";

export function OpenFoodFactsView({barcode}: { barcode: string }) {
    const [data, set_data] = useState<string>("");

    useEffect(() => {
        axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`).then(value => {
            set_data(JSON.stringify(value.data));
        }).catch(reason => {
            set_data("error")
        });
    }, [])

    return (
        <div>
            {data}
        </div>
    )
}