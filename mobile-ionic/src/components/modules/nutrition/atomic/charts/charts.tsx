import {fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";
import Highcharts from "highcharts";
import {IonCard, IonCardContent} from "@ionic/react";
import HighchartsReact from "highcharts-react-official";
import React from "react";

// --ion-card-background: #1c1c1d;
export function DietaryProfilePieChartCard({fundamental_nutrients}: {
    fundamental_nutrients: fundamental_nutrients_type,
})
{
    const options: Highcharts.Options = {
        chart: {
            borderWidth: 0,
            backgroundColor: "var(--ion-card-background)",
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
        title: {
            floating: false,
            text: '<h1 style="color: var(--ion-color-dark)">Dietary Profile</h1>',
            useHTML: true
        },
        series: [
            {
                type: "pie",
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

    return <IonCard>
        <IonCardContent>
            <HighchartsReact highcharts={Highcharts} options={options}/>
        </IonCardContent>
    </IonCard>
}

