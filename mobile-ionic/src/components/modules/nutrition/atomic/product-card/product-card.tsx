import {fundamental_nutrients_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";

import "./product-card.css";
import {ProductAddControls} from "../product-add-controls/product-add-controls";
import {MouseEventHandler, useState} from "react";

export function ProductCard({product, hideCardHeader = false, hideCardContent = false, add}: {
    product: product_type;
    hideCardHeader?: boolean;
    hideCardContent?: boolean;
    add?: (id: string, quantity: number, servings: number) => void
}) {

    const [scaleState, set_scaleState] = useState<number>(1);

    const [hideCardContent_state, set_hideCardContent_state] = useState<boolean>(hideCardContent);

    return (
        <IonCard>
            {!hideCardHeader && <ProductDescription_IonCardHeader
                onHeaderClick={event => set_hideCardContent_state(prevState => !prevState)} product={product} add={add}
                change={(id, quantity) => set_scaleState(quantity / 100.)}/>}
            {!hideCardContent_state && <FundamentalNutrients_IonCardContent scale={scaleState}
                                                                            product={product}/>}
        </IonCard>
    )
}

const Value = ({nutrient, quantity, units}: {
    nutrient: keyof fundamental_nutrients_type,
    quantity: number,
    units: string
}) => {
    return (
        <div className={"grid-item"}>
            <div style={{fontWeight: "700", fontSize: "0.80em"}}>
                {nutrient}
            </div>
            <div style={{display: "flex", alignItems: "flex-end", gap: "0.25em"}}>
                {quantity.toFixed(1)} <em style={{fontSize: "0.85em"}}> {units}</em>
            </div>
        </div>
    )
}

function foundationServingDetails(product: product_type): string | undefined {
    if (product.serving_description) {
        return "(" + [product.serving_description.amount.toFixed(0), product.serving_description.units].join(" ") + ")";
    } else
        return undefined;
}

export function ProductDescription_IonCardHeader({product, change, add, onHeaderClick}: {
    product: product_type,
    change?: (id: string, quantity: number, servings: number) => void
    add?: (id: string, quantity: number, servings: number) => void
    onHeaderClick?: MouseEventHandler<HTMLIonCardHeaderElement>
}) {
    return (
        <IonCardHeader onClick={onHeaderClick} className={"product-description-container"}>
            <div>
                <IonCardTitle>
                    {product.product_designation.name} {product.id.startsWith("foundation") ? " - " + product.product_designation.characteristics.join(", ") : null}
                </IonCardTitle>
                <IonCardSubtitle>
                    {product.product_designation.food} - {product.serving_size.toFixed(1)} {product.units} per
                    serving {product.id.startsWith("foundation") ? foundationServingDetails(product) : null}
                </IonCardSubtitle>
            </div>
            <ProductAddControls product={product} change={change} add={add}/>
        </IonCardHeader>
    )
}

export function FundamentalNutrients_IonCardContent({product, scale}: {
    product: product_type,
    scale: number
}) {
    return (
        <IonCardContent>
            <div style={{display: "flex", gap: "1em"}}>
                <em style={{fontSize: "0.85em"}}>value
                    per {(1.0e2 * scale).toFixed(1)} g
                    ({(1.0e2 * scale / product.serving_size).toFixed(1)} servings)</em>
            </div>
            <div className={"fundamental-nutrients-container"}>
                <Value nutrient={"energy"} quantity={product.fundamental_nutrients.energy * scale} units={"kCal"}/>
                <Value nutrient={"carbohydrates"} quantity={product.fundamental_nutrients.carbohydrates * scale}
                       units={"g"}/>
                <Value nutrient={"fat"} quantity={product.fundamental_nutrients.fat * scale} units={"g"}/>
                <Value nutrient={"protein"} quantity={product.fundamental_nutrients.protein * scale} units={"g"}/>
                <Value nutrient={"fiber"} quantity={product.fundamental_nutrients.fiber * scale} units={"g"}/>
                <Value nutrient={"sugar"} quantity={product.fundamental_nutrients.sugar * scale} units={"g"}/>
                <Value nutrient={"sodium"} quantity={product.fundamental_nutrients.sodium * 1.0e3 * scale}
                       units={"mg"}/>
            </div>
        </IonCardContent>
    )
}
