import {useEffect, useState} from "react";
import {productConsumptionManager, productManager} from "../../../../../core/instances";
import {getPairs} from "../../atomic/product-consumption-journal-list/product-consumption-journal-list-controller";
import {day_fromMillis} from "@shared/common/features/time/period/period";
import {DateTime} from "luxon";
import {CaloriesConsumptionTimeSeriesChartCard} from "../../charts/calories-consumption-time-series-chart-card";

export function CalorieConsumptionTimeSeriesManagedCard()
{
    const [consumption_series, set_consumption_series] = useState<{ referenceDate: number, value: number }[]>([]);

    useEffect(() =>
    {
        const productManager_subscription = productManager.subject().subscribe(async value =>
        {
            set_consumption_series(getPairs(await productConsumptionManager.all(), await productManager.all()).filter(value1 => value1[0].referenceDate >= day_fromMillis(DateTime.now().toMillis(), "beginning").toMillis()).map(value1 => ({
                referenceDate: value1[0].referenceDate,
                value: value1[0].quantity / 100. * value1[1].fundamental_nutrients.energy
            })));
        });

        const productConsumptionManager_subscription = productConsumptionManager.subject().subscribe(async value =>
        {
            set_consumption_series(getPairs(await productConsumptionManager.all(), await productManager.all()).filter(value1 => value1[0].referenceDate >= day_fromMillis(DateTime.now().toMillis(), "beginning").toMillis()).map(value1 => ({
                referenceDate: value1[0].referenceDate,
                value: value1[0].quantity / 100. * value1[1].fundamental_nutrients.energy
            })));
        });

        return () =>
        {
            productManager_subscription.unsubscribe();
            productConsumptionManager_subscription.unsubscribe();
        }
    }, [])

    return (
        <CaloriesConsumptionTimeSeriesChartCard consumption_series={consumption_series}/>
    )
}