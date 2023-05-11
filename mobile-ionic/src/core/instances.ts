import {ProductManager} from "./model/nutrition/managers/product-manager";
import {storageClearPromise, storagePromise} from "./storage/storage";
import {fake_product_array} from "@shared/common/faker/nutrition";

export const productManager = new ProductManager(storagePromise);
storageClearPromise.then(value => {
    setTimeout(() =>
    Promise.all(fake_product_array(0x10).map(value => productManager.insert(value))).then(value => {
        console.log(value);
    }), 5_000);
})
