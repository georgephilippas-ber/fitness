import {distance} from "./fuzzy-search/fuzzy-search";
import {faker} from "@faker-js/faker";

const array = Array(10).fill(0).map(value => ({
    company: faker.company.name(),
    product: faker.commerce.productName(),
    color: faker.color.human(),
    animal: faker.animal.type(),
    f: ["a"],
    g: 3
}));

console.log(array);

console.log(distance("lion", array, "animal", 3));
