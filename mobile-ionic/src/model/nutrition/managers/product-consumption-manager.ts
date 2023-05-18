import {UniqueManager} from "../../../core/managers/manager";
import {product_consumption_type} from "@shared/common/schema/nutrition/nutrition";
import {Storage} from "@ionic/storage";

export class ProductConsumptionManager extends UniqueManager<product_consumption_type, "id"> {
    constructor(storagePromise: Promise<Storage>) {
        super(storagePromise, "ProductConsumptionManager", "id");
    }
}
