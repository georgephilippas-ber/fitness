import {
    fundamental_nutrients_type,
    product_consumption_type,
    product_type
} from "@shared/common/schema/nutrition/nutrition";
import {
    getPairs
} from "../../../components/modules/nutrition/atomic/product-consumption-journal-list/product-consumption-journal-list-controller";
import {day_fromMillis, Period} from "@shared/common/features/time/period/period";

type product_consumption_pair_type = [product_consumption_type, product_type];

export class DietaryProfile
{
    constructor(private products: product_type[], private product_consumption: product_consumption_type[])
    {

    }

    private pairs_byPeriod(period: Period): [product_consumption_type, product_type][]
    {
        return getPairs(this.product_consumption, this.products).filter(value => value[0].referenceDate >= period.getBeginning() && value[0].referenceDate <= period.getEnd());
    }

    private pairs_byReferenceDate(referenceDate: number): [product_consumption_type, product_type][]
    {
        return this.pairs_byPeriod(new Period(day_fromMillis(referenceDate, "beginning").toMillis(), day_fromMillis(referenceDate, "end").toMillis()))
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
