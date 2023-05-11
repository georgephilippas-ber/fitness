import {product_consumption_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {useState} from "react";

import "./product-consumption-journal-entry.css";

export function ProductConsumptionJournalEntry({product, product_consumption}: {
    product: product_type,
    product_consumption: product_consumption_type
}) {
    const [referenceDate_state, set_referenceDate_state] = useState<number>(product_consumption.referenceDate);

    return (
        <div>

        </div>
    );
}
