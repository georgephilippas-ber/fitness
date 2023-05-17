import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle} from "@ionic/react";
import {useEffect, useState} from "react";
import axios from "axios";
import {product_input_type} from "../../../schema/schema";

function getURL(barcode: string): string {
    return `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
}

type OpenFoodFacts_product_type =
    {
        "saturated-fat_100g": number;
        "proteins_100g": number;
        "carbohydrates_100g": number;
        "sodium_100g": number;
        "fiber_100g": number;
        "energy_100g": number;
        "sugars_100g": number;
        "serving_size": string;
        "serving_quantity": string;
        "categories_tags": string[]
        "categories_hierarchy": string[],
        "purchase_places": string,
        "quantity": string;
        "product_name": string;
        "nutriscore_grade": string;
        "nutriscore_score": number;
        "image_front_url": string;
    }

function to_OpenFoodFacts_product(data: any): OpenFoodFacts_product_type | undefined {
    try {
        return {
            "saturated-fat_100g": data["product"]["nutriments"]["saturated-fat_100g"] || 0,
            "proteins_100g": data["product"]["nutriments"]["proteins_100g"] || 0,
            "carbohydrates_100g": data["product"]["nutriments"]["carbohydrates_100g"] || 0,
            "sodium_100g": data["product"]["nutriments"]["sodium_100g"] || 0,
            "fiber_100g": data["product"]["nutriments"]["fiber_100g"] || 0,
            "energy_100g": data["product"]["nutriments"]["energy_100g"] || 0,
            "sugars_100g": data["product"]["nutriments"]["sugars_100g"] || 0,
            "serving_size": data["product"]["serving_size"] || "",
            "serving_quantity": data["product"]["serving_quantity"] || "",
            "categories_tags": data["product"]["categories_tags"] || [],
            "categories_hierarchy": data["product"]["categories_hierarchy"] || [],
            "purchase_places": data["product"]["purchase_places"] || "",
            "quantity": data["product"]["quantity"] || "",
            "product_name": data["product"]["product_name"] || "",
            "nutriscore_grade": data["product"]["nutriscore_grade"] || "",
            "nutriscore_score": data["product"]["nutriscore_score"] || 0,
            "image_front_url": data["product"]["image_front_url"] || ""
        };
    } catch (e) {
        return undefined;
    }
}

function to_product_input(OpenFoodFacts_product: OpenFoodFacts_product_type): product_input_type {
    return {
        product_designation: "",
        serving: "",
        fundamental_nutrients: ""
    }
}

export function OpenFoodFacts({barcode, handleProductInput}: {
    barcode: string,
    handleProductInput?: (product_input: product_input_type) => void
}) {
    const [data, set_data] = useState<string>("");

    const [product_input, set_product_input] = useState<product_input_type>({
        fundamental_nutrients: "",
        serving: "",
        product_designation: ""
    });

    useEffect(() => {
        if (barcode)
            axios.get(getURL(barcode)).then(value => {
                set_data(JSON.stringify(to_OpenFoodFacts_product(value.data)));
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
