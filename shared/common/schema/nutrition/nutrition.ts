export type product_quantity_units_type = "g" | "ml";

export function product_quantity_units(): product_quantity_units_type[] {
    return ["g", "ml"];
}

export type evaluation_type =
    {
        nutriscore?:
            {
                category: nutriscore_categories_type;
                score: number;
            };
        foundation?:
            {
                score: number;
            }
    }

export type product_type =
    {
        id: string;
        fundamental_nutrients: fundamental_nutrients_type;
        product_designation: product_designation_type;
        serving_size: number;
        serving_description?: {
            amount: number,
            units: string,
        };
        evaluation: evaluation_type;
        units: product_quantity_units_type;
    }

export type fundamental_nutrients_type =
    {
        energy: number;
        carbohydrates: number;
        protein: number;
        fat: number;
        fiber: number;
        sodium: number;
        sugar: number;
    }

export const fundamental_nutrients_keys: (keyof fundamental_nutrients_type)[] =
    ["fat", "carbohydrates", "energy", "protein", "sodium", "sugar", "fiber"];

export const fundamental_nutrients_zero = (): fundamental_nutrients_type => ({

    energy: 0.,
    fiber: 0.,
    protein: 0.,
    sodium: 0.,
    sugar: 0.,
    carbohydrates: 0.,
    fat: 0.
});

export type product_designation_type =
    {
        food: string;
        name: string;
        company: string;
        characteristics: string[];
    }

export type product_consumption_type =
    {
        id: string;
        referenceDate: number;
        product_id: string;
        quantity: number;
    }

export type nutriscore_categories_type = "A" | "B" | "C" | "D" | "E";

export const nutriscore_categories: nutriscore_categories_type[] = ["A", "B", "C", "D", "E"];

export function fromScore(score: number, type: "solid" | "beverage"): nutriscore_categories_type {
    const limits_solid: number[] = [-1, 2, 10, 18, 40];
    const limits_beverage: number[] = [0, 1, 5, 9, 40];

    if (type === "solid") {
        for (let i = 0; i < limits_solid.length; i++)
            if (score <= limits_solid[i])
                return nutriscore_categories[i];
    } else
        for (let i = 0; i < limits_beverage.length; i++)
            if (score <= limits_beverage[i])
                return nutriscore_categories[i];

    return "E";
}