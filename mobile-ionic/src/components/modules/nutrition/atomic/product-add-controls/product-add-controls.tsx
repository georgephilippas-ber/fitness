import {IonIcon, IonInput} from "@ionic/react";
import {addCircle, addCircleOutline, checkmarkCircleOutline, removeCircleOutline} from "ionicons/icons";
import {useEffect, useState} from "react";
import {product_type} from "@shared/common/schema/nutrition/nutrition";

function validateQuantity(quantity: string | undefined | null): number | undefined {
    const parsed: number = parseFloat(quantity || "");

    if (isFinite(parsed))
        return parsed > 0 && parsed < 1.e3 ? parsed : undefined;
    else
        return undefined;
}

export function ProductAddControls({product, add, change}: {
    product: product_type,
    add?: (id: string, quantity: number, servings: number) => void
    change?: (id: string, quantity: number, servings: number) => void
}) {
    const [addIcon, set_addIcon] = useState<string>(addCircleOutline);
    const [removeIcon, set_removeIcon] = useState<string>(removeCircleOutline);

    const [_, set_key] = useState<number>(0);

    const [quantity, set_quantity] = useState<number>(product.serving_size);

    const [servings, set_servings] = useState<number>(1.);

    function modifyServings(direction: "increase" | "decrease") {
        switch (direction) {
            case "increase":
                set_servings(prevState => prevState + 0.5);
                break;
            case "decrease": {
                if (servings > 0.5)
                    set_servings(prevState => prevState - 0.5);
                break;
            }
        }
    }

    useEffect(() => {
        set_quantity(servings * product.serving_size);
    }, [servings])

    useEffect(() => {
        set_servings(quantity / product.serving_size);
    }, [quantity])

    useEffect(() => {
        change?.(product.id, quantity, servings);
    }, [servings, quantity])

    function handleAdd() {
        setTimeout(() => set_addSuccess(false), 1.0e3);
        set_addSuccess(true);
        add?.(product.id, quantity, servings);
    }

    const [addSuccess, set_addSuccess] = useState<boolean>(false);

    return (
        <div style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "0.2em",
            margin: "0.2em"
        }}>
            <div>

                <IonInput value={quantity.toFixed(1)} onIonChange={(e) => {
                    const quantity_ = validateQuantity(e.detail.value);

                    set_quantity(prevState => quantity_ ?? prevState);

                    set_key(prevState => (prevState + 1) % 2)
                }} style={{width: "4em", textAlign: "right", marginBottom: "0.45em"}}/>
            </div>
            <div style={{margin: "0 0.55em 0.40em 0"}}>
                {product.units}
            </div>
            <div style={{fontSize: "2em"}}>
                <IonIcon onClick={event => {
                    modifyServings("increase");
                    event.stopPropagation();
                }}
                         color={"gray"} size={"medium"} icon={addIcon}/>
            </div>
            <div style={{textAlign: "center", margin: "0 0.5em 0.40em"}}>
                {servings.toFixed(1)} serving{servings !== 1.0 ? "s" : null}
            </div>
            <div style={{fontSize: "2em"}}>
                <IonIcon onClick={event => {
                    modifyServings("decrease");
                    event.stopPropagation();
                }}
                         color={"gray"} size={"medium"} icon={removeIcon}/>
            </div>
            <div style={{marginLeft: "1em", marginBottom: "0.1em"}}>
                <IonIcon onClick={event => {
                    handleAdd();
                    event.stopPropagation();
                }} style={{fontSize: "2.65em"}} color={"gray"} size={"medium"}
                         icon={addCircle}></IonIcon>
            </div>
            <div style={{marginLeft: "1em", fontSize: "1.55em", visibility: addSuccess ? "visible" : "hidden"}}>
                <IonIcon color={"gray"} icon={checkmarkCircleOutline}/>
            </div>
        </div>
    )
}
