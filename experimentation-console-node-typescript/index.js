"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fuzzy_search_1 = require("./fuzzy-search/fuzzy-search");
const faker_1 = require("@faker-js/faker");
const array = Array(10).fill(0).map(value => ({
    company: faker_1.faker.company.name(),
    product: faker_1.faker.commerce.productName(),
    color: faker_1.faker.color.human(),
    animal: faker_1.faker.animal.type(),
    f: ["a"],
    g: 3
}));
console.log(array);
console.log((0, fuzzy_search_1.distance)("lion", array, "animal", 3));
