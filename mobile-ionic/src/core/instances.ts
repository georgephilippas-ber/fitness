import {ProductManager} from "./model/nutrition/managers/product-manager";
import {storagePromise} from "./storage/storage";

export const productManager = new ProductManager(storagePromise);
