import {DatabaseProvider} from "../../database-provider/database-provider";

import {Collection, DeleteResult, Document, Filter, InsertManyResult, OptionalUnlessRequiredId, WithId} from "mongodb";
import {readFileSync, writeFile} from "fs";

export class Manager<T extends Document>
{
    constructor(protected databaseProvider: DatabaseProvider, protected collectionName: string)
    {
    }

    async drop(): Promise<boolean>
    {
        if (await this.databaseProvider.hasCollection(this.collectionName))
            return await this.databaseProvider.dropCollection(this.collectionName);
        else
            return false;
    }

    public async delete(queryFilter: Filter<T> = {}): Promise<DeleteResult>
    {
        return this.databaseProvider.db().collection(this.collectionName).deleteMany(queryFilter);
    }

    async upsertOne(filter: Filter<T>, document: T): Promise<boolean>
    {
        try
        {
            if (!await this.databaseProvider.hasCollection(this.collectionName))
                await this.databaseProvider.db().createCollection(this.collectionName);
            /*
            Specify an empty document { } to update the first document returned in the collection.
             */
            const outcome_ = await this.collection().updateOne(filter, {"$set": document}, {upsert: true});

            return outcome_.acknowledged;
        }
        catch (err)
        {
            console.log(this.upsertOne.name);
            console.log(err);

            return false;
        }
    }

    async insertOne(document: OptionalUnlessRequiredId<T>): Promise<boolean>
    {
        try
        {
            await this.collection().insertOne(document);

            return true;
        }
        catch (err)
        {
            console.log(this.insertOne.name);
            console.log(err);

            return false;
        }
    }

    public collection(): Collection<T>
    {
        return this.databaseProvider.db().collection<T>(this.collectionName);
    }

    async export(file: string): Promise<boolean>
    {
        return new Promise<boolean>(async resolve =>
        {
            writeFile(file, JSON.stringify((await this.collection().find()).map(value =>
            {
                const {_id, ...rest} = value;

                return rest;
            })), {encoding: "utf-8"}, err =>
            {
                if (err)
                {
                    console.log(this.export.name);
                    console.log(err);

                    resolve(false);
                }
                else
                {
                    console.log(file);

                    resolve(true);
                }
            })
        });
    }

    async import(file: string): Promise<InsertManyResult<T>>
    {
        const documents: OptionalUnlessRequiredId<T>[] = JSON.parse(readFileSync(file, {encoding: "utf8"}));

        await this.delete();

        return this.collection().insertMany(documents);
    }

    async all(): Promise<WithId<T>[]>
    {
        return this.collection().find().toArray();
    }
}
