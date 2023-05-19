import {fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";
import Highcharts from "highcharts";
import {IonCard, IonCardContent} from "@ionic/react";
import HighchartsReact from "highcharts-react-official";
import React from "react";

export function DietaryProfilePieChartCard({fundamental_nutrients}: {
    fundamental_nutrients: fundamental_nutrients_type,
})
{
    const options: Highcharts.Options = {
        chart: {
            borderWidth: 0,
            plotBorderWidth: 0,
            plotShadow: true,
            backgroundColor: "var(--ion-card-background)",
            style:
                {
                    color: "var(--ion-color-dark)",
                    fontFamily: "var(--ion-font-family)",
                }
        },
        title: {
            floating: false,
            text: '<h2>Dietary Profile - Macronutrients</h2>',
            useHTML: true,
            align: "center",
            style: {
                color: "var(--ion-color-dark)",
                fontFamily: "var(--ion-font-family)",
            },
            margin: 25
        },
        series: [
            {
                type: "pie",
                size: "100%",
                name: 'Quantity (g)',
                data: [
                    {name: 'Protein', y: fundamental_nutrients.protein},
                    {name: 'Carbohydrates', y: fundamental_nutrients.carbohydrates},
                    {name: 'Fat', y: fundamental_nutrients.fat},
                    {name: 'Fiber', y: fundamental_nutrients.fiber},
                ],
            },
        ],
    };

    return <>
        <IonCard>
            <IonCardContent>
                <HighchartsReact highcharts={Highcharts} options={options}/>
            </IonCardContent>
        </IonCard>
    </>
}
