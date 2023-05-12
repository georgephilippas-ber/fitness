import nutriscore_category_a from "./Nutri-score-A.svg";
import nutriscore_category_b from "./Nutri-score-B.svg";
import nutriscore_category_c from "./Nutri-score-C.svg";
import nutriscore_category_d from "./Nutri-score-D.svg";
import nutriscore_category_e from "./Nutri-score-E.svg";

export type nutriscore_categories_type = "A" | "B" | "C" | "D" | "E";

export function fromScore(score: number): nutriscore_categories_type {
    switch (score) {
        case 1:
            return "E";
        case 2:
            return "D";
        case 3:
            return "C";
        case 4:
            return "B";
        case 5:
            return "A";
        default:
            if (score > 5)
                return "A";
            else
                return "E";
    }
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
