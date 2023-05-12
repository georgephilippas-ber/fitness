export type product_quantity_units_type = "g" | "ml";

export function product_quantity_units(): product_quantity_units_type[] {
    return ["g", "ml"];
}

export type product_type =
    {
        id: string;
        fundamental_nutrients: fundamental_nutrients_type;
        product_designation: product_designation_type;
        serving_size: number;
        units: product_quantity_units_type;
    }

export type fundamental_nutrients_type =
    {
        energy: number;
        carbohydrates: number;
        protein: number;
        fat: number;
        fiber: number;
        salt: number;
        sugar: number;
    }

export const fundamental_nutrients_keys: (keyof fundamental_nutrients_type)[] =
    ["fat", "carbohydrates", "energy", "protein", "salt", "sugar", "fiber"];

export const fundamental_nutrients_zero = (): fundamental_nutrients_type => ({

    energy: 0.,
    fiber: 0.,
    protein: 0.,
    salt: 0.,
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
