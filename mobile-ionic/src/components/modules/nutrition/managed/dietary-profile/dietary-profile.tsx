import {useEffect, useState} from "react";
import {fundamental_nutrients_type} from "@shared/common/schema/nutrition/nutrition";
import {getDietaryProfile} from "../../../../../model/nutrition/services/dietary-profile";
import {DateTime} from "luxon";
import {productConsumptionManager, productManager} from "../../../../../core/instances";
import {DietaryProfilePieChartCard} from "../../atomic/charts/charts";

export function DietaryProfile()
{
    const [dietaryProfile, set_dietaryProfile] = useState<fundamental_nutrients_type | undefined>(undefined);

    useEffect(() =>
    {
        getDietaryProfile(DateTime.now().toMillis(), productManager, productConsumptionManager).then(value =>
        {
            set_dietaryProfile(value);
        });
    }, [])

    return (
        dietaryProfile ?
            <DietaryProfilePieChartCard fundamental_nutrients={dietaryProfile}/> : null
    )
}