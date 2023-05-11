import {ProductSearch} from "../product-search/product-search";
import {ProductsList_Card} from "../products-list/products-list";
import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {useState} from "react";
import {search} from "../product-search/product-search-controller";

export function ProductsListSearch({products}: { products: product_type[] }) {
    const [productsState, set_productsState] = useState<product_type[]>(products);

    return (
        <>
            <ProductSearch handleSearch={product_search => {
                search(product_search, products, Math.floor(Math.min(0.1 * products.length, 0x08))).then(value => {
                    set_productsState(value.sort((a, b) => (a.fundamental_nutrients[product_search.sort.key] - b.fundamental_nutrients[product_search.sort.key]) * (product_search.sort.direction === "ascending" ? 1 : -1)))
                })
            }}/>
            <ProductsList_Card products={productsState}/>
        </>
    )
}
