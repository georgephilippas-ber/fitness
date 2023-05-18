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


function division_finiteOrZero(numerator: number, denominator: number)
{
    return denominator !== 0 ? numerator / denominator : 0.;
}

export class DietaryProfile
{
    constructor(private products: product_type[] = [], private product_consumption: product_consumption_type[] = [])
    {

    }

    public setProducts(products: product_type[])
    {
        this.products = products;
    }

    public setProductConsumption(product_consumption: product_consumption_type[])
    {
        this.product_consumption = product_consumption;
    }

    private pairs_byPeriod(period: Period): [product_consumption_type, product_type][]
    {
        return getPairs(this.product_consumption, this.products).filter(value => value[0].referenceDate >= period.getBeginning() && value[0].referenceDate <= period.getEnd());
    }

    private pairs_dayByReferenceDate(referenceDate: number): [product_consumption_type, product_type][]
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

    public servings(referenceDate: number)
    {
        return this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getServings_pair(currentValue), 0.);
    }

    public quantity(referenceDate: number)
    {
        return this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + currentValue[0].quantity, 0.);
    }

    public energy(referenceDate: number)
    {
        return this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("energy", currentValue), 0.);
    }

    public protein(referenceDate: number, percentage: boolean = false)
    {
        const protein_ = this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("protein", currentValue), 0.);

        if (percentage)
            return division_finiteOrZero(protein_, this.quantity(referenceDate));
        else
            return protein_;
    }

    public carbohydrates(referenceDate: number, percentage: boolean = false)
    {
        const carbohydrates_ = this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("carbohydrates", currentValue), 0.);

        if (percentage)
            return division_finiteOrZero(carbohydrates_, this.quantity(referenceDate));
        else
            return carbohydrates_;
    }

    public fat(referenceDate: number, percentage: boolean = false)
    {
        const fat_ = this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("fat", currentValue), 0.);

        if (percentage)
            return division_finiteOrZero(fat_, this.quantity(referenceDate));
        else
            return fat_;
    }

    public fiber(referenceDate: number, percentage: boolean = false)
    {
        const fiber_ = this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("fiber", currentValue), 0.);

        if (percentage)
            return division_finiteOrZero(fiber_, this.quantity(referenceDate));
        else
            return fiber_;
    }

    public sugar(referenceDate: number)
    {
        return this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("sugar", currentValue), 0.);
    }

    public sodium(referenceDate: number)
    {
        return this.pairs_dayByReferenceDate(referenceDate).reduce((previousValue, currentValue) => previousValue + this.getNutrient_pair("sodium", currentValue), 0.);
    }
}
