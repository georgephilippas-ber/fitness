import {writeFileSync} from "fs";
import path from "path";
import axios from "axios";

export async function openfoodfacts(_id: string): Promise<boolean> {
    try {
        writeFileSync(path.join(__dirname, `${_id}.json`), JSON.stringify((await axios.get(`https://world.openfoodfacts.org/api/v0/product/${_id}.json`)).data), "utf-8");

        return true;
    } catch (e) {
        return false;
    }
}
