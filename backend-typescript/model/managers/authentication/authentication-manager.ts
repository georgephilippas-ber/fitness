import {Manager} from "../../../core/base/managers/manager";
import {agent_type} from "../../schema/authentication/authentication-schema";
import {DatabaseProvider} from "../../../core/database-provider/database-provider";

import {genSalt, hash} from "bcrypt"

export class AuthenticationManager extends Manager<agent_type>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, AuthenticationManager.name);
    }

    async create(id: number, password: string, activated: boolean = false, verified: boolean = false): Promise<boolean>
    {
        const salt: string = await genSalt(0x0f);
        const hash_: string = await hash(password, salt);

        return this.insertOne({
            id,
            createdAt: Date.now(),
            hash: hash_,
            salt,
            activated,
            verified
        });
    }

    async verify_user(id: number): Promise<boolean>
    {
        return (await this.collection().updateOne({id}, {"$set": {verified: true}}, {upsert: false})).upsertedCount === 1;
    }

    async activate_user(id: number): Promise<boolean>
    {
        return (await this.collection().updateOne({id}, {"$set": {activated: true}}, {upsert: false})).upsertedCount === 1;
    }

    async verify_password(id: number, password: string): Promise<boolean>
    {
        const agent: agent_type | null = await this.byId(id);

        if (agent)
        {
            const salt: string = agent.salt;

            return await hash(password, salt) === agent.hash;
        }
        else
            return false;
    }

    async byId(id: number): Promise<agent_type | null>
    {
        return this.collection().findOne({id});
    }
}
