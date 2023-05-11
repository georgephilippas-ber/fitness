import {UniqueManager} from "../../../managers/manager";
import {Storage} from "@ionic/storage";
import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";

export class ProductManager extends UniqueManager<product_type, "id"> {
    constructor(storagePromise: Promise<Storage>) {
        super(storagePromise, "ProductManager", "id")
    }
}

