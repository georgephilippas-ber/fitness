import {Db, MongoClient} from "mongodb";

type MongoDB_configuration_type =
    {
        uri: string;
        db: string;
    }

export class DatabaseProvider
{
    MongoDB_client: MongoClient

    constructor(private MongoDB_configuration: MongoDB_configuration_type)
    {
        this.MongoDB_client = new MongoClient(MongoDB_configuration.uri, {keepAlive: true});
    }

    db(): Db
    {
        return this.MongoDB_client.db(this.MongoDB_configuration.db);
    }

    async hasCollection(collection: string): Promise<boolean>
    {
        return (await this.db().collections()).map(value => value.collectionName).includes(collection);
    }

    async dropCollection(collection: string): Promise<boolean>
    {
        return this.db().dropCollection(collection);
    }

    async close()
    {
        return this.MongoDB_client.close();
    }
}
