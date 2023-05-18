import {product_input_type} from "../../schema/schema";
import {useEffect, useState} from "react";
import axios from "axios";
import {nutriscore_categories_type} from "@shared/common/schema/nutrition/nutrition";

function getURL(barcode: string): string {
    return `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
}

type OpenFoodFacts_product_type =
    {
        "code": string;
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
        "ingredients_hierarchy": string[]
        "brands": string;
    }

function to_OpenFoodFacts_product(data: any): OpenFoodFacts_product_type | undefined {
    try {
        return {
            "code": data["product"]["code"] || "",
            "brands": data["product"]["brands"] || "",
            "saturated-fat_100g": data["product"]["nutriments"]["saturated-fat_100g"] || 0,
            "proteins_100g": data["product"]["nutriments"]["proteins_100g"] || 0,
            "carbohydrates_100g": data["product"]["nutriments"]["carbohydrates_100g"] || 0,
            "sodium_100g": data["product"]["nutriments"]["sodium_100g"] || 0,
            "fiber_100g": data["product"]["nutriments"]["fiber_100g"] || 0,
            "energy_100g": data["product"]["nutriments"]["energy_100g"] || 0,
            "sugars_100g": data["product"]["nutriments"]["sugars_100g"] || 0,
            "serving_size": data["product"]["serving_size"] || "",
            "serving_quantity": data["product"]["serving_quantity"] || "",
            "categories_tags": data["product"]["categories_tags"]?.map((value: string) => value.slice(3).split("-").join(" ")) || [],
            "categories_hierarchy": data["product"]["categories_hierarchy"]?.map((value: string) => value.slice(3).split("-").join(" ")) || [],
            "purchase_places": data["product"]["purchase_places"] || "",
            "quantity": data["product"]["quantity"] || "",
            "product_name": data["product"]["product_name"] || "",
            "nutriscore_grade": data["product"]["nutriscore_grade"] || "undefined",
            "nutriscore_score": data["product"]["nutriscore_score"] || -100,
            "image_front_url": data["product"]["image_front_url"] || "",
            "ingredients_hierarchy": data["product"]["ingredients_hierarchy"]?.map((value: string) => value.slice(3).split("-").join(" ")) || []
        };
    } catch (e) {
        return undefined;
    }
}

function to_product_input(OpenFoodFacts_product: OpenFoodFacts_product_type): product_input_type {
    return {
        product_designation: [OpenFoodFacts_product.ingredients_hierarchy?.[0], OpenFoodFacts_product.product_name, OpenFoodFacts_product.brands, ...OpenFoodFacts_product.categories_hierarchy.sort((a, b) => a.length - b.length).slice(undefined, 3)].join(", "),
        serving: OpenFoodFacts_product.serving_size,
        fundamental_nutrients: [OpenFoodFacts_product.energy_100g, OpenFoodFacts_product.carbohydrates_100g, OpenFoodFacts_product.proteins_100g, OpenFoodFacts_product["saturated-fat_100g"], OpenFoodFacts_product.fiber_100g, OpenFoodFacts_product.sugars_100g, OpenFoodFacts_product.sodium_100g].join(" "),
        product_evaluation: [((-OpenFoodFacts_product.nutriscore_score + 40) / 55).toFixed(1), "nutriscore"].join(" ")
    }
}

export function useOpenFoodFacts(barcode?: string): [product_input_type | undefined, [number, nutriscore_categories_type] | undefined] {
    const [product_input, set_product_input] = useState<product_input_type | undefined>(undefined);

    const [nutriscore, set_nutriscore] = useState<[number, nutriscore_categories_type] | undefined>(undefined);

    useEffect(() => {
        if (barcode) {
            axios.get(getURL(barcode)).then(value => {
                const OpenFoodFacts_product = to_OpenFoodFacts_product(value.data);

                if (OpenFoodFacts_product) {
                    set_product_input(to_product_input(OpenFoodFacts_product));
                    set_nutriscore([OpenFoodFacts_product.nutriscore_score, OpenFoodFacts_product.nutriscore_grade as nutriscore_categories_type]);
                } else {
                    set_product_input(undefined);
                    set_nutriscore(undefined);
                }
            }).catch(reason => {
                set_product_input(undefined);
                set_nutriscore(undefined);
            });
        } else {
            set_product_input(undefined);
            set_nutriscore(undefined);
        }
    }, [barcode]);

    return [product_input, nutriscore];
}
