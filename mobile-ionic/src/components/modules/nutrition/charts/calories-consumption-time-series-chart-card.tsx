import Highcharts from "highcharts";
import {IonCard, IonCardContent} from "@ionic/react";

import React, {useEffect, useRef} from "react";
import {day_fromMillis} from "@shared/common/features/time/period/period";
import {DateTime} from "luxon";

export function CaloriesConsumptionTimeSeriesChartCard({consumption_series}: {
    consumption_series: { referenceDate: number, value: number }[]
})
{
    const container = useRef<HTMLDivElement>(null);

    const options: any =
        {
            chart: {
                backgroundColor: null,
                type: 'area'
            },
            accessibility: {
                description: ''
            },
            title: {
                text: 'Calorie Consumption',
                color: "var(--ion-color-dark-tint)"
            },
            subtitle: {
                text: `${consumption_series.length} course(s) - ${(consumption_series.reduce((previousValue, currentValue) => previousValue + currentValue.value, 0.)).toFixed(2)} kCal`
            },
            xAxis: {
                type: 'datetime',
                min: day_fromMillis(DateTime.now().toMillis(), "beginning").toMillis(),
                max: day_fromMillis(DateTime.now().toMillis(), "end").toMillis(),
                tickInterval: 14_400 * 1000,
                labels: {
                    formatter: function (this: { value: number })
                    {
                        return Highcharts.dateFormat('%H:%M', this.value);
                    },
                },
            },
            yAxis: {
                title: {
                    text: 'Calories (kCal)'
                },
                labels: {}
            },
            tooltip: {
                pointFormat: '<b>{point.y:,.1f} kCal</b>'
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Calories',
                color: "#6A00A8",
                data: consumption_series.map(value => ({x: value.referenceDate, y: value.value})) //consumption_series.slice(5).concat(consumption_series.slice(0, 5))
            }]
        };

    useEffect(() =>
    {
        if (container.current)
        {
            Highcharts.chart(container.current, options);
        }
    }, [container]);

    return <>
        <IonCard>
            <IonCardContent>
                <div ref={container} id="container">
                </div>
            </IonCardContent>
        </IonCard>
    </>
}
