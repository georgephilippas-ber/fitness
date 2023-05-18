import {
    fundamental_nutrients_type,
    product_consumption_type,
    product_type
} from "@shared/common/schema/nutrition/nutrition";
import {
    getPairs
} from "../../../components/modules/nutrition/atomic/product-consumption-journal-list/product-consumption-journal-list-controller";

type product_consumption_pair_type = [product_consumption_type, product_type];

export class DietaryProfile
{
    constructor(private products: product_type[], private product_consumption: product_consumption_type[])
    {

    }

    private pairs(): [product_consumption_type, product_type][]
    {
        return getPairs(this.product_consumption, this.products);
    }

    private getServings_pair(pair: product_consumption_pair_type): number
    {
        return pair[0].quantity / pair[1].serving_size;
    }

    private getNutrient_pair(nutrient: keyof fundamental_nutrients_type, pair: product_consumption_pair_type)
    {
        return pair[1].fundamental_nutrients[nutrient] / 100. * pair[0].quantity
    }


}
