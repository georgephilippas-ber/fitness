import {ProductsListSearch} from "../../../atomic/products-list-search/products-list-search";
import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {product_state_updater_type} from "../../../../../../model/nutrition/schema/schema";

export function SearchSegment({products, add_handler}: {
    products: product_type[],
    add_handler?: product_state_updater_type
}) {
    return <ProductsListSearch add_handler={add_handler}
                               products={products}/>
}
