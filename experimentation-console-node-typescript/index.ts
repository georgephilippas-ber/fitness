import {readdirSync, readFileSync} from "fs";
import path from "path";
import {findKeyPaths} from "./object-path/object-path";
import {openfoodfacts} from "./openfoodfacts/openfoodfacts";
import * as util from "util";

import {product_type} from "../shared/common/schema/nutrition/nutrition"

function fromJSON(filename: string): any {
    return JSON.parse(readFileSync(path.join(__dirname, "openfoodfacts", filename), "utf-8"));
}

const filenames: string[] = readdirSync(path.join(__dirname, "openfoodfacts")).filter(value => value.endsWith(".json"));

function search(key: string): [number, number, any] {
    const results_ = filenames.map(value => {
        // console.log(categories_tags(fromJSON(value)["product"]["categories_tags"]))

        return fromJSON(value);
    }).map(value => findKeyPaths(value, key)).filter(value => value.length);

    const percentage_ = results_.filter(value => value.length).length / filenames.length * 1.0e2;

    return [filenames.length, percentage_, results_];
}

console.log(util.inspect(search("saturated-fat_100g")[2], {depth: null}));
console.log(util.inspect(search("proteins_100g")[1], {depth: null}));
console.log(util.inspect(search("carbohydrates_100g")[1], {depth: null}));
console.log(util.inspect(search("sodium_100g")[1], {depth: null}));
console.log(util.inspect(search("fiber_100g")[1], {depth: null}));
console.log(util.inspect(search("energy_100g")[1], {depth: null}));

console.log(util.inspect(search("categories_tags")[1], {depth: null}));
console.log(util.inspect(search("categories_hierarchy")[1], {depth: null}));

console.log(util.inspect(search("purchase_places")[1], {depth: null}));
console.log(util.inspect(search("product_name")[1], {depth: null}));

// console.log(util.inspect(search("energy_"), {depth: null}));

function categories(tags_: string[]) {
    return tags_.filter(value => value.startsWith("en:")).map(value => value.slice(3).split("-").join(" "))
}

// fromJSON("4000405002636.json")["product"]["categories_hierarchy"]