import {
    evaluation_type,
    fundamental_nutrients_type,
    nutriscore_categories_type,
    product_designation_type,
    product_quantity_units,
    product_quantity_units_type,
    product_type
} from "@shared/common/schema/nutrition/nutrition";
import {product_input_type} from "../../schema/schema";
import {faker} from "@faker-js/faker";

function parseFiniteFloat(valueString: string): number | undefined {
    const number_ = parseFloat(valueString);

    return isFinite(number_) ? number_ : undefined;
}

function processServing(valueString: string): [number, product_quantity_units_type, {
    amount: number,
    units: string
}] | undefined {
    const [quantity_string = "", units_string = "g", serving_description_string = ""] = valueString.replace(",", " ").split(" ").map(value => value.trim().toLowerCase()).filter(value => value);

    const quantity_ = parseFiniteFloat(quantity_string);
    const units_ = units_string.trim().toLowerCase().replace(/\b(gram|grams?|gr)\b/gi, "g").replace(/\b(mls|milliliters?)\b/gi, "ml");

    const toServing = (serving_description: string): { amount: number, units: string } => {
        const regex = /\((\d+)\s*[, ]\s*([^\)]+)\)/;
        const match = serving_description.match(regex);

        const amount: number = parseFloat(match?.[1] || "");
        const units: string = (match?.[2] || "").trim().toLowerCase() || "item";

        if (isFinite(amount))
            return {
                amount,
                units
            }
        else
            return {
                amount: 1,
                units
            }
    }

    if (quantity_ && product_quantity_units().includes(units_ as any))
        return [quantity_, units_ as product_quantity_units_type, toServing(serving_description_string)];
    else
        return undefined;
}

function processProductDesignation(valueString: string): product_designation_type | undefined {
    const [food_string = "", name_string = "", company_string = "", ...characteristics] = valueString.split(",").map(value => value.trim()).filter(value => value);

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

function processFundamentalNutrients(valueString: string): fundamental_nutrients_type | undefined {
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

function processEvaluation(valueString: string): evaluation_type {
    const [score_, scoring_system_, category_] = valueString.replace(",", " ").split(" ").map(value => value.trim().toLowerCase());

    switch (scoring_system_) {
        case "nutriscore":
            return {
                nutriscore:
                    {
                        category: (category_ || "E") as nutriscore_categories_type,
                        score: parseFiniteFloat(score_) || 40
                    }
            }
        default:
            return {
                subjective:
                    {
                        score: parseFiniteFloat(score_) || -1.
                    }
            }
    }

}

export function parseProduct(product_input: product_input_type): product_type | undefined {
    const serving = processServing(product_input.serving);
    const product_designation = processProductDesignation(product_input.product_designation);
    const fundamental_nutrients = processFundamentalNutrients(product_input.fundamental_nutrients);
    const evaluation = processEvaluation(product_input.product_evaluation);

    if (serving && product_designation && fundamental_nutrients)
        return {
            id: ["user", faker.datatype.uuid()].join(", "),
            product_designation: product_designation,
            evaluation: evaluation,
            serving_description: serving[2],
            units: serving[1],
            fundamental_nutrients,
            serving_size: serving[0]
        }
    else
        return undefined;
}
