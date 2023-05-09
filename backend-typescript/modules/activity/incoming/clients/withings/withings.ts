import axios from "axios";
import {DateTime} from "luxon";

import {AuthorizationManager, AuthorizationService} from "../../../../../core/features/authorization/authorization";
import {Period} from "@sprinter-common/features/time/period/period";
import {UserManager} from "../../../../../model/managers/user/user-manager";
import {weight_interface} from "../../../schema/schema";

type measure_type = { value: number, type: number, unit: number, algo: number, fm: number };

type measuregrp_type =
    {
        grpid: number,
        attrib: number,
        date: number,
        created: number,
        modified: number,
        category: number,
        deviceid: string,
        hash_deviceid: string,
        measures: measure_type[],
        comment: string | null
    }

function toWeight(user_id: number, measures: measuregrp_type): weight_interface | undefined
{
    const getValue = (type: 1 | 5 | 6 | 8 | 76, measures_: measure_type[] = measures.measures): number | undefined =>
    {
        const measure_ = measures_.filter(value => value.type === type)?.[0];

        if (measure_)
        {
            return measure_.value * 10. ** (measure_.unit);
        }
        else
            return undefined;
    }

    const weight_ = getValue(1);
    // const fat_free_mass_ = getValue(5);
    // const fat_ratio_ = getValue(6);
    const fat_mass_weight_ = getValue(8);
    const muscle_mass_ = getValue(76);

    return weight_ !== undefined ? {
        user_id,
        id: measures.grpid.toFixed(),
        referenceDate: measures.created * 1_000,
        measurement:
            {
                weight: weight_,
                fat_ratio: fat_mass_weight_ && weight_ ? fat_mass_weight_ / weight_ : undefined,
                muscle_ratio: muscle_mass_ && weight_ ? muscle_mass_ / weight_ : undefined,
            }
    } : undefined;
}

interface withings_measureResponse_interface
{
    status: number;
    body:
        {
            updatetime: number;
            timezone: string;
            measuregrps: measuregrp_type[]
        }
}

export class WithingsClient
{
    base_url: string;

    constructor(private authorizationService: AuthorizationService, private authorizationManager: AuthorizationManager, private userManager: UserManager)
    {
        this.base_url = "https://wbsapi.withings.net/measure";
    }

    public async request(user_id: number, period: Period): Promise<weight_interface[]>
    {
        return new Promise<weight_interface[]>(async (resolve, reject) =>
        {
            try
            {
                resolve(await this.raw_request(user_id, period));
            }
            catch (err)
            {
                try
                {
                    console.log("refresh", await this.authorizationService.refresh(user_id, "withings"));

                    resolve(await this.raw_request(user_id, period));
                }
                catch (err)
                {
                    console.log("withings requires authorization");

                    reject(err);
                }
            }
        });
    }

    private async raw_request(user_id: number, period: Period): Promise<weight_interface[]>
    {
        return new Promise<any[]>(async (resolve, reject) =>
        {
            const accessToken = await this.authorizationManager.getAccessToken(user_id, "withings");

            axios.post<withings_measureResponse_interface>(this.base_url,
                {}, {
                    timeout: 3_000,
                    params:
                        {
                            action: "getmeas",
                            meastypes: "1,6,76,5,8",
                            category: 1,
                            startdate: Math.trunc(period.hasFiniteBeginning() ? period.getBeginning() / 1_000 : 0),
                            enddate: Math.trunc(period.hasFiniteEnd() ? period.getEnd() / 1_000 : DateTime.now().toMillis() / 1_000),
                        },
                    headers:
                        {
                            "Authorization": ["Bearer", accessToken].join(" ")
                        }
                }).then(value =>
            {
                if (value.data.body.measuregrps)
                {
                    console.log("withings request", user_id, value.data.body.measuregrps.length, "measurements", period.readable());

                    resolve(value.data.body.measuregrps.map(value => toWeight(user_id, value)).filter(value => !!value));
                }
                else
                    reject(value.data.status + " " + JSON.stringify(value.data.body));
            }).catch(reason =>
            {
                console.log(reason);

                reject(reason);
            })
        });
    }
}
