import {storageClearPromise, storagePromise} from "./storage/storage";

import {ProductManager} from "./model/nutrition/managers/product-manager";
import {ProductConsumptionManager} from "./model/nutrition/managers/product-consumption-manager";

import {fake_product_array} from "@shared/common/faker/nutrition";

export const productManager = new ProductManager(storagePromise);
export const productConsumptionManager = new ProductConsumptionManager(storagePromise);

async function seed() {

    await storageClearPromise;
    await productManager.insert(fake_product_array(0x10));
}

function subscribe() {
    productConsumptionManager.subject().subscribe(value => {
        productConsumptionManager.all().then(value1 => console.log(value1));
    });
}

seed().then(value => subscribe());
