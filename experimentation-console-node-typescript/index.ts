import {levenshteinDistance} from "./fuzzy-search/fuzzy-search";
import {faker} from "@faker-js/faker";

const array = Array(400).fill(0).map(value => ({
    company: faker.company.name(),
    product: faker.commerce.productName(),
    color: faker.color.human(),
    animal: faker.animal.type(),
    f: ["a"],
    g: 3
}));

console.log(array);

let f = levenshteinDistance(["lion", "azure", "frozen"], array, ["animal", "color", "product"], 5);

console.log(array[f[0][0]])
