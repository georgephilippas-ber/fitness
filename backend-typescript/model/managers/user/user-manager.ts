import {Manager} from "../../../core/base/managers/manager";
import {user_type} from "../../schema/user/user-schema";
import {DatabaseProvider} from "../../../core/database-provider/database-provider";

export class UserManager extends Manager<user_type>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, UserManager.name);
    }

    async byId(id: number): Promise<user_type | null>
    {
        return this.collection().findOne({id});
    }

    async byUsername(username: string): Promise<user_type | null>
    {
        return this.collection().findOne({username});
    }

    async byEmail(email: string): Promise<user_type | null>
    {
        return this.collection().findOne({email});
    }
}
