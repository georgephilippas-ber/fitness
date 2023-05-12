import {readdirSync, readFileSync} from "fs";
import path from "path";
import {findKeyPaths} from "./object-path/object-path";
import {openfoodfacts} from "./openfoodfacts/openfoodfacts";

function fromJSON(filename: string): any {
    return JSON.parse(readFileSync(path.join(__dirname, "openfoodfacts", filename), "utf-8"));
}

const key_: string = "image_front_url";


const filenames: string[] = readdirSync(path.join(__dirname, "openfoodfacts")).filter(value => value.endsWith(".json"));

const results_ = filenames.map(value => {
    return fromJSON(value)
}).map(value => findKeyPaths(value, key_));

const percentage_ = results_.filter(value => value.length).length / filenames.length * 1.0e2;

results_.forEach(value => {
    if (value.length)
        console.log(value[0]);
});

console.log(filenames.length, percentage_.toFixed(2));