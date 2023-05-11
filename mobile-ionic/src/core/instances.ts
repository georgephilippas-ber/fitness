import {ProductConsumptionManager, ProductManager} from "./model/nutrition/managers/product-manager";
import {storageClearPromise, storagePromise} from "./storage/storage";
import {fake_product_array} from "@shared/common/faker/nutrition";

export const productManager = new ProductManager(storagePromise);
export const productConsumptionManager = new ProductConsumptionManager(storagePromise);

storageClearPromise.then(value => {
    setTimeout(() =>
        productManager.insert(fake_product_array(0x10)).then(value => {
        }).then(value1 => productManager.all().then(value2 => console.log(value2))), 1_000);
});

productConsumptionManager.subject().subscribe(async value => {
    console.log(await productConsumptionManager.all());
});
