import {useEffect, useState} from "react";
import {fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";
import {getDietaryProfile} from "../../../../../model/nutrition/services/dietary-profile";
import {DateTime} from "luxon";
import {productConsumptionManager, productManager} from "../../../../../core/instances";
import {DietaryProfilePieChartCard} from "../../atomic/charts/charts";

export function DietaryProfileManagedCard()
{
    const [dietaryProfile, set_dietaryProfile] = useState<fundamental_nutrients_type | undefined>(undefined);

    useEffect(() =>
    {
        const productManager_subscription = productManager.subject().subscribe(async value =>
        {
            getDietaryProfile(DateTime.now().toMillis(), await productManager.all(), await productConsumptionManager.all()).then(value1 =>
                set_dietaryProfile(value1));
        });

        const productConsumptionManager_subscription = productConsumptionManager.subject().subscribe(async value =>
        {
            getDietaryProfile(DateTime.now().toMillis(), await productManager.all(), await productConsumptionManager.all()).then(value1 =>
                set_dietaryProfile(value1));
        });
    }, [])

    return (
        dietaryProfile ?
            <DietaryProfilePieChartCard fundamental_nutrients={dietaryProfile}/> : null
    )
}
