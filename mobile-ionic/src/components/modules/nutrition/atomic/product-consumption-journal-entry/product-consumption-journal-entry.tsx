import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {useState} from "react";

import "./product-consumption-journal-entry.css";
import {DateTime} from "luxon";


export function ProductConsumptionJournalEntry({product, product_consumption}: {
    product: product_type,
    product_consumption: product_consumption_type
}) {
    const [referenceDate_state, set_referenceDate_state] = useState<number>(product_consumption.referenceDate);

    const scale_ = product_consumption.quantity / 100.;
    const servings_ = product_consumption.quantity / product.serving_size;

    return (
        <div className={"product-consumption-journal-entry"}>
            <div className={"servings"}>
                {servings_.toFixed(1)}
            </div>
            <div className={"name"}>
                {product.product_designation.name} {product.id.startsWith("foundation") ? "(" + product.product_designation.characteristics.join(", ") + ")": null}
            </div>
            <div className={"energy"}>
                {(product.fundamental_nutrients.energy * scale_).toFixed(1)}
            </div>
            <div className={"time"}>
                {DateTime.fromMillis(product_consumption.referenceDate).toLocaleString(DateTime.TIME_SIMPLE)}
            </div>
        </div>
    );
}
