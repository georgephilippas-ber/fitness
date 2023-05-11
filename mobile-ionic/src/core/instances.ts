import {storageClearPromise, storagePromise} from "./storage/storage";

import {ProductManager} from "./model/nutrition/managers/product-manager";
import {ProductConsumptionManager} from "./model/nutrition/managers/product-consumption-manager";

import {fake_product_array} from "@shared/common/faker/nutrition";

export const productManager = new ProductManager(storagePromise);
export const productConsumptionManager = new ProductConsumptionManager(storagePromise);


function seed() {
    storageClearPromise.then(value => {
        setTimeout(() =>
            productManager.insert(fake_product_array(0x10)).then(value => {
            }).then(value1 => productManager.all().then(value2 => console.log(value2))), 4_000);
    });
}

function subscribe() {
    productConsumptionManager.subject().subscribe(async value => {
        console.log(await productConsumptionManager.all());
    });

}

seed();
subscribe();
