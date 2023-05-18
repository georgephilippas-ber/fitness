import {
    fundamental_nutrients_type,
    product_designation_type,
    product_quantity_units,
    product_quantity_units_type
} from "@shared/common/schema/nutrition/nutrition";

function parseFiniteFloat(string_: string): number | undefined {
    const number_ = parseFloat(string_);

    return isFinite(number_) ? number_ : undefined;
}

export function processServing(serving: string): [number, product_quantity_units_type] | undefined {
    const [quantity_string, units_string] = serving.replace(",", " ").split(" ").map(value => value.trim().toLowerCase()).filter(value => value);

    const quantity_ = parseFiniteFloat(quantity_string);
    const units_ = units_string.trim().toLowerCase().replace(/\b(gram|grams?|gr)\b/gi, "g").replace(/\b(mls|milliliters?)\b/gi, "ml");

    if (quantity_ && product_quantity_units().includes(units_ as any))
        return [quantity_, units_ as product_quantity_units_type];
    else
        return undefined;
}

export function processProductDesignation(product_designation: string): product_designation_type | undefined {
    const [food_string = "", name_string = "", company_string = "", ...characteristics] = product_designation.split(",").map(value => value.trim()).filter(value => value);

    if (food_string && name_string) {
        return {
            characteristics,
            food: food_string,
            company: company_string,
            name: name_string
        }
    } else
        return undefined;
}

export function processFundamentalNutrients(valueString: string): fundamental_nutrients_type | undefined {
    const values = valueString.split(/[,\s]+/);

    if (values.length !== 7) {
        return undefined;
    }

    const parsedValues = values.map(parseFloat);

    if (parsedValues.some(value => !isFinite(value) || value < 0)) {
        return undefined;
    }

    const [energy, carbohydrates, protein, fat, fiber, sugar, sodium] = parsedValues;

    return {
        energy,
        carbohydrates,
        protein,
        fat,
        fiber,
        sodium,
        sugar,
    };
}

