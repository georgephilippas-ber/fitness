import {Manager} from "../../../core/base/managers/manager";
import {product_type} from "@sprinter-common/schema/nutrition/nutrition";
import {DatabaseProvider} from "../../../core/database-provider/database-provider";
import {with_user_id} from "@sprinter-common/schema/schema";

export class ProductManager extends Manager<with_user_id<product_type>>
{
    constructor(databaseProvider: DatabaseProvider)
    {
        super(databaseProvider, ProductManager.name);
    }

    public async insertOrReplace(user_id: number, product: product_type[]): Promise<boolean>
    {
        return (await Promise.all(product.map(value => this.upsertOne({
            user_id,
            id: value.id
        }, {user_id, ...value})))).every(value => value);
    }

    public async deleteByIds(user_id: number, ids: string[])
    {
        return await Promise.all(ids.map(value => this.delete({user_id, value})));
    }

    public async getByIds(user_id: number, ids: string[]): Promise<product_type[]>
    {
        return this.collection().find({
            user_id, id: {
                "$in": ids
            }
        }).toArray();
    }
}
