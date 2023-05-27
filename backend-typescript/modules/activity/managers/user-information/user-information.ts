import {Manager} from "../../../../core/base/managers/manager";
import {DatabaseProvider} from "../../../../core/database-provider/database-provider";
import {client_aspect_type, provider_type} from "@sprinter-common/schema/activities/activities";

export type activity_user_information_type =
    {
        user_id: number;
        clients: { [key in client_aspect_type]: provider_type }
    }

export type clients_providers_iterable_type = [client_aspect_type, provider_type][];

export class ActivityUserInformationManager extends Manager<activity_user_information_type>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, ActivityUserInformationManager.name);
    }

    async createUser(user_id: number): Promise<boolean>
    {
        return this.upsertOne({user_id}, {
            user_id, clients:
                {
                    weight: "random",
                    activities: "random",
                    activity: "random",
                }
        });
    }

    async byId(user_id: number): Promise<activity_user_information_type | null>
    {
        return this.collection().findOne({user_id});
    }

    private clients_providers_iterate(user_information: activity_user_information_type): clients_providers_iterable_type
    {
        return Object.keys(user_information.clients).map(value => [value as client_aspect_type, user_information.clients[value as client_aspect_type]]);
    }

    public async set_client(user_id: number, client_aspect: client_aspect_type, provider: provider_type): Promise<boolean>
    {
        const user_information = await this.byId(user_id);

        if (user_information)
        {
            user_information.clients[client_aspect] = provider;
            try
            {
                return (await this.collection().updateOne({user_id}, {"$set": user_information})).modifiedCount > 0;
            }
            catch (e)
            {
                console.log("error", this.set_client.name, this.constructor.name);

                return false;
            }
        }
        else
            return false;
    }

    public async iterateById(user_id: number): Promise<clients_providers_iterable_type>
    {
        const user_information = await this.byId(user_id);

        if (user_information)
        {
            return this.clients_providers_iterate(user_information);
        }
        else
            return [];
    }
}
