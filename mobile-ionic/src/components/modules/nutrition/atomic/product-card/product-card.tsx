import {fundamental_nutrients_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCheckbox,
    IonRadio
} from "@ionic/react";

import "./product-card.css";
import {ProductAddControls} from "../product-add-controls/product-add-controls";

export function ProductCard({product, scale = 1, hideCardHeader = false, hideCardContent = false}: {
    product: product_type,
    scale?: number,
    hideCardHeader?: boolean,
    hideCardContent?: boolean
}) {
    return (
        <IonCard>
            {!hideCardHeader && <ProductDescription_IonCardHeader product={product}/>}
            {!hideCardContent && <FundamentalNutrients_IonCardContent scale={scale}
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

export function ProductDescription_IonCardHeader({product}: { product: product_type }) {
    return (
        <IonCardHeader className={"product-description-container"}>
            <div>
                <IonCardTitle>
                    {product.product_designation.name}
                </IonCardTitle>
                <IonCardSubtitle>
                    {product.product_designation.food} - {product.serving_size.toFixed(1)} {product.units} per serving
                </IonCardSubtitle>
            </div>
            <ProductAddControls product={product}/>
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
