import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";

export function getProduct(product_consumption: product_consumption_type, products: product_type[]): product_type | undefined {
    return products.filter(value => value.id === product_consumption.product_id)?.[0];
}

export function getPairs(product_consumption_array: product_consumption_type[], products: product_type[]): [product_consumption_type, product_type][] {
    return product_consumption_array.map(value => [value, getProduct(value, products)] as [product_consumption_type, product_type | undefined]).filter(value => value[1]) as [product_consumption_type, product_type][];
}
