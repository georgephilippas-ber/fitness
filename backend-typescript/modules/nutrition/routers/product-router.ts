import {Router} from "../../../core/base/routers/router";
import {ProductManager} from "../managers/product-manager";
import {StatusCodes} from "http-status-codes";
import {product_type} from "@sprinter-common/schema/nutrition/nutrition";

export class ProductRouter extends Router
{
    constructor(private productManager: ProductManager)
    {
        super("icons/product");

        this.insertOrReplace();
        this.getByIds();
    }

    insertOrReplace()
    {
        this.router_.post("/insert", async (req, res) =>
        {
            const user_id = req.body["user_id"] as number | undefined;

            if (user_id)
            {
                const products_array = req.body["products"] as product_type[];

                if (Array.isArray(products_array))
                {
                    await this.productManager.insertOrReplace(user_id, products_array);
                }

                res.sendStatus(StatusCodes.OK);
            } else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }

    getByIds()
    {
        this.router_.post("/get_by_ids", async (req, res) =>
        {
            const user_id = req.body["user_id"] as number | undefined;

            if (user_id)
            {
                const ids = req.body["ids"] as string[];

                if (Array.isArray(ids))
                    res.send({products: await this.productManager.getByIds(user_id, ids)});
            } else
                res.sendStatus(StatusCodes.BAD_REQUEST);
        });
    }
}
