import {levenshteinDistance, levenshteinDistanceSync} from "./fuzzy-search/fuzzy-search";
import {faker} from "@faker-js/faker";

const array = Array(20).fill(0).map(value => ({
    company: faker.company.name(),
    product: faker.commerce.productName(),
    color: faker.color.human(),
    animal: faker.animal.type(),
}));

console.log(array);

levenshteinDistance(["lion", "azure", "frozen"], array, ["animal", "color", "product"], 5).then(value => {
    console.log(array[value[0][0]])
});
