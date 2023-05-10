import {fundamental_nutrients_type, product_type} from "@shared/common/schema/nutrition/nutrition";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";

import "./product-card.css";

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
                                                                      fundamental_nutrients={product.fundamental_nutrients}/>}
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
        <IonCardHeader>
            <IonCardTitle>
                {product.product_designation.name}
            </IonCardTitle>
            <IonCardSubtitle>
                {product.product_designation.food} - {product.serving_size.toFixed(1)} {product.units} per serving
            </IonCardSubtitle>
        </IonCardHeader>
    )
}

export function FundamentalNutrients_IonCardContent({fundamental_nutrients, scale}: {
    fundamental_nutrients: fundamental_nutrients_type,
    scale: number
}) {
    return (
        <IonCardContent>
            <div>
                <em style={{fontSize: "0.85em"}}>value per 100g</em>
            </div>
            <div className={"fundamental-nutrients-container"}>
                <Value nutrient={"energy"} quantity={fundamental_nutrients.energy * scale} units={"kCal"}/>
                <Value nutrient={"carbohydrates"} quantity={fundamental_nutrients.carbohydrates * scale} units={"g"}/>
                <Value nutrient={"fat"} quantity={fundamental_nutrients.fat * scale} units={"g"}/>
                <Value nutrient={"protein"} quantity={fundamental_nutrients.protein * scale} units={"g"}/>
                <Value nutrient={"fiber"} quantity={fundamental_nutrients.fiber * scale} units={"g"}/>
                <Value nutrient={"sugar"} quantity={fundamental_nutrients.sugar * scale} units={"g"}/>
                <Value nutrient={"sodium"} quantity={fundamental_nutrients.sodium * 1.0e3 * scale} units={"mg"}/>
            </div>
        </IonCardContent>
    )
}
