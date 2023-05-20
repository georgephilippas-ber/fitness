import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonInput, IonToast
} from "@ionic/react";

import {BarcodeEntry} from "../../../atomic/barcode-entry/barcode-entry";
import {useEffect, useState} from "react";
import {useOpenFoodFacts} from "../../../../../../model/nutrition/hooks/openfoodfacts";
import {NutriScore} from "../../../../../../assets/Nutri-Score/NutriScore";
import {parseProduct} from "../../../../../../model/nutrition/controllers/nutrition";
import {product_type} from "@shared/common/schema/nutrition/nutrition";
import {ProductCard} from "../../../atomic/product-card/product-card";
import {product_input_type} from "../../../../../../model/nutrition/schema/schema";


export function ProductInputEdit({product_input, onProductInputChange}: {
    product_input: product_input_type,
    onProductInputChange: (product_input: product_input_type) => void
}) {
    const [editVisible, set_editVisible] = useState<boolean>(false);

    const [productInputState, set_productInputState] = useState<product_input_type>(product_input);

    useEffect(() => {
        onProductInputChange(productInputState);
    }, [productInputState]);

    useEffect(() => {
        set_productInputState(product_input)
    }, [product_input]);

    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    Edit product
                </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {editVisible ?
                    <div>
                        <IonInput label={"serving (quantity, units, description)"} labelPlacement={"floating"}
                                  value={productInputState.serving} onIonInput={(event) => {
                            set_productInputState(prevState => {
                                return {...prevState, serving: event.detail.value || ""}
                            })
                        }}></IonInput>
                        <IonInput label={"designation (food, name, company, ...characteristics)"}
                                  labelPlacement={"floating"} value={productInputState.product_designation}
                                  onIonInput={(event) => {
                                      set_productInputState(prevState => {
                                          return {...prevState, product_designation: event.detail.value || ""}
                                      })
                                  }}></IonInput>
                        <IonInput label={"energy, carbohydrates, protein, fat, fiber, sugar, sodium"}
                                  labelPlacement={"floating"}
                                  value={productInputState.fundamental_nutrients} onIonInput={(event) => {
                            set_productInputState(prevState => {
                                return {...prevState, fundamental_nutrients: event.detail.value || ""}
                            })
                        }}></IonInput>
                        <IonInput label={"evaluation (score, scoring system)"} labelPlacement={"floating"}
                                  value={productInputState.product_evaluation} onIonInput={(event) => {
                            set_productInputState(prevState => {
                                return {...prevState, product_evaluation: event.detail.value || ""}
                            })
                        }}></IonInput>
                    </div>
                    : null}
                <IonButton style={{marginTop: "1.15em"}} expand={"block"}
                           color={parseProduct(productInputState) ? "success" : "warning"}
                           onClick={() => set_editVisible(prevState => !prevState)}>{editVisible ? "Close" : "Open"}</IonButton>
            </IonCardContent>
        </IonCard>
    )
}

export function RegisterSegment({initialBarcode, onRegisterProduct}: {
    initialBarcode?: string,
    onRegisterProduct?: (product: product_type) => void
}) {

    const [registerProduct_toast, set_registerProduct_toast] = useState<boolean>(false)


    const [barcodeState, set_barcodeState] = useState<string | undefined>(initialBarcode);

    const [product_input_OpenFoodFacts, score] = useOpenFoodFacts(barcodeState);

    const [product, set_product] = useState<product_type | undefined>(undefined);

    const [product_input, set_product_input] = useState<product_input_type>({
        product_evaluation: "",
        serving: "",
        product_designation: "",
        fundamental_nutrients: ""
    });

    useEffect(() => {
        set_barcodeState(initialBarcode);
    }, [initialBarcode])

    useEffect(() => {
        if (product_input_OpenFoodFacts)
        {
            set_product_input(product_input_OpenFoodFacts);

            if (parseProduct(product_input_OpenFoodFacts))
                set_product(parseProduct(product_input_OpenFoodFacts));
        }
        else
        {
            set_product_input({product_evaluation: "", fundamental_nutrients: "", serving: "", product_designation: ""});
            set_product(undefined);
        }
    }, [product_input_OpenFoodFacts]);

    useEffect(() => {
        set_product(parseProduct(product_input));
    }, [product_input])

    return (
        <IonContent>
            <BarcodeEntry initialValue={initialBarcode} onValidBarcode={barcode => set_barcodeState(barcode)}/>
            {product_input_OpenFoodFacts ?
                <IonCard>
                    <IonCardHeader>
                        <IonCardSubtitle>
                            Product Found
                        </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <div style={{margin: "auto", width: "fit-content"}}>
                            {score?.[1] ? <NutriScore height={"3em"} category={score[1]}/> : null}
                        </div>
                    </IonCardContent>
                </IonCard> : null}
            {product ?
                <ProductCard hideControls={true} product={product}/> : null}
            <ProductInputEdit onProductInputChange={product_input1 => set_product_input(product_input1)}
                              product_input={product_input}/>
            <IonCard>
                <IonCardContent>
                    <IonButton disabled={!product} onClick={() => {
                        if (product) {
                            onRegisterProduct?.(product);
                            set_registerProduct_toast(true);
                        }
                    }
                    }

                               color={product ? "primary" : "danger"}
                               expand={"block"}>Register</IonButton>
                </IonCardContent>
            </IonCard>
            <IonToast
                message={"registered " + product?.product_designation.name}
                isOpen={registerProduct_toast}
                onDidDismiss={() => set_registerProduct_toast(false)} duration={1_750}/>
        </IonContent>
    )
}
