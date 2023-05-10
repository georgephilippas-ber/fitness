import {fundamental_nutrients_type, product_type} from "@shared/common/schema/nutrition/nutrition";

import {levenshteinDistance} from "@shared/common/features/fuzzy-search/fuzzy-search";

export type product_search_type =
    {
        barcode: string;
        food: string;
        name: string;
        characteristics: string;
        sort?:
            {
                key: keyof fundamental_nutrients_type;
                direction: "ascending" | "descending";
            }
    }

export function empty_productSearch(): product_search_type {
    return {
        food: "",
        barcode: "",
        name: "",
        characteristics: ""
    }
}

export type sort_direction_type = "ascending" | "descending";

export async function search(productSearch: product_search_type, products: product_type[]): Promise<product_type[]> {
    const characteristics = productSearch.characteristics.replace(",", " ").split(" ").map(value => value.trim()).filter(value => value).join(" ");

    const outcome = await levenshteinDistance([productSearch.barcode, productSearch.name, productSearch.food, characteristics], products.map(value => {
        return {
            barcode: value.id,
            name: value.product_designation.name,
            food: value.product_designation.food,
            characteristics: value.product_designation.characteristics.join(" ")
        }
    }), ["barcode", "name", "food", "characteristics"], 0x08);

    return outcome.map(value => products[value[0]]);
}
