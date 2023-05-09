import axios from "axios";
import {product_quantity_units, product_quantity_units_type, product_type} from "../../schema/nutrition/nutrition";

import {evaluate} from "mathjs";

export type raw_product_type =
    {
        product?:
            {
                _id?: string;
                serving_size?: string;
                nutriments?:
                    {
                        fat_100g?: number;
                        carbohydrates_100g?: number;
                        sugars_100g?: number;
                        proteins_100g?: number;
                        "energy-kcal_100g"?: number;
                        fiber_100g?: number;
                        sodium_100g?: number;
                    }
                product_name?: string;
                brands?: string;
                categories?: string;
            }
    }

export function to_product(raw_product: raw_product_type | undefined): product_type | undefined
{
    if (raw_product)
        return {
            id: raw_product?.product?._id || "",
            product_designation:
                {
                    food: raw_product?.product?.categories?.split(",")?.[0].trim() || "",
                    characteristics: raw_product?.product?.categories?.split(",").map(value => value.trim()).slice(1, 3) || [],
                    company: raw_product?.product?.brands?.split(",")?.[0] || "",
                    name: raw_product?.product?.product_name || ""
                },
            serving_size: parse_serving_size(raw_product?.product?.serving_size || "")?.[0] || 0,
            units: parse_serving_size(raw_product?.product?.serving_size || "")?.[1] || "g",
            fundamental_nutrients:
                {
                    energy: raw_product?.product?.nutriments?.["energy-kcal_100g"] || 0.,
                    sodium: raw_product?.product?.nutriments?.sodium_100g || 0.,
                    sugar: raw_product?.product?.nutriments?.sugars_100g || 0.,
                    fiber: raw_product?.product?.nutriments?.fiber_100g || 0.,
                    protein: raw_product?.product?.nutriments?.proteins_100g || 0.,
                    fat: raw_product?.product?.nutriments?.fat_100g || 0.,
                    carbohydrates: raw_product?.product?.nutriments?.carbohydrates_100g || 0.,
                }
        }
    else
        return undefined;
}

export function parse_serving_size(input: string): [number, product_quantity_units_type] | undefined
{
    const regular_expression = new RegExp(`^([0-9+*\/\-^() ]+)(\s*)(${product_quantity_units().join("|")})(?:\s+.*)?$`);

    const regular_expression_match = input.match(regular_expression);

    if (regular_expression_match)
    {
        const expression = regular_expression_match?.[1];
        const units: string | undefined = regular_expression_match?.[3];

        if (expression && units)
        {
            try
            {
                const result = evaluate(expression);

                if (result <= 0. || result === undefined)
                    return undefined;
                else
                    return [result, units as product_quantity_units_type]
            }
            catch (e)
            {
                return undefined;
            }
        }
        else
            return undefined;
    }
    else
        return undefined;
}


export class OpenFoodFacts
{
    constructor()
    {
    }

    private static async retrieve_raw_product(barcode: string): Promise<raw_product_type | undefined>
    {
        return new Promise<raw_product_type | undefined>(resolve =>
        {
            axios.get<any>(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`).then(value =>
            {
                resolve(value.data);

                //TODO: validate received data here
            }).catch(reason =>
            {
                resolve(undefined);
            });
        });
    }

    public static async get_product(barcode: string): Promise<product_type | undefined>
    {
        return to_product(await this.retrieve_raw_product(barcode));
    }
}
