import nutriscore_category_a from "./Nutri-score-A.svg";
import nutriscore_category_b from "./Nutri-score-B.svg";
import nutriscore_category_c from "./Nutri-score-C.svg";
import nutriscore_category_d from "./Nutri-score-D.svg";
import nutriscore_category_e from "./Nutri-score-E.svg";

export type nutriscore_categories_type = "A" | "B" | "C" | "D" | "E";

const nutriscore_categories: nutriscore_categories_type[] = ["A", "B", "C", "D", "E"];

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

function nutriscore_svg(category: nutriscore_categories_type): string {
    switch (category) {
        case "A":
            return nutriscore_category_a;
        case "B":
            return nutriscore_category_b;
        case "C":
            return nutriscore_category_c;
        case "D":
            return nutriscore_category_d;
        case "E":
            return nutriscore_category_e;
    }
}

export function NutriScore({category, height = "2.25em"}: { category: nutriscore_categories_type, height?: string }) {
    return (
        <img style={{height}} alt={category} src={nutriscore_svg(category)}/>
    )
}
