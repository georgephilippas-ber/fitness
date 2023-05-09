import {DatabaseProvider} from "../../core/database-provider/database-provider";
import {servers} from "../../configuration/servers/location";
import {readFileSync} from "fs";
import path from "path";


const collection_name: string = "Nutrition";

async function main()
{
    const databaseProvider: DatabaseProvider = new DatabaseProvider({
        uri: servers.mongodb.url, db: "corporate"
    });

    if (await databaseProvider.hasCollection("Nutrition"))
        await databaseProvider.dropCollection("Nutrition");

    const nutrition: any = JSON.parse(readFileSync(path.join(__dirname, "..", "..", "..", "python", "flask-backend", "icons", "icons.json"), "utf-8"));

    await databaseProvider.db().collection(collection_name).insertMany(nutrition);

    await databaseProvider.close()
}

main();
