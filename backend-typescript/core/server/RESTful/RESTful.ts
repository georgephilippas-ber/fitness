import express, {Express} from "express";
import cors from "cors";

import {Server as httpServer} from "http";
import {Router} from "../../base/routers/router";

import * as path from "path";
import {faker} from "@faker-js/faker";
import {DatabaseProvider} from "../../database-provider/database-provider";

import morgan from "morgan"

import {engine} from "express-handlebars";
import cookieParser from "cookie-parser";
import {AuthenticationFeature, payload_type} from "../../features/authentication/authentication-feature";
import {AuthenticationService} from "../../../model/services/authentication/authentication-service";
import {Registry} from "../../registry/registry";

const root_: string[] = [__dirname, "..", "..", "..",];
const static_: string[] = ["public", "static"];

const directories: Record<"static" | "layouts" | "views", string[]> =
    {
        layouts: [...root_, "public", "views", "layouts"],
        views: [...root_, "public", "views"],
        static: [...root_, ...static_],
    }

export class RESTful
{
    express: Express;

    httpServer: httpServer | null;

    constructor(private port: number, private routers: Router[], private registry: Registry, private authenticationFeature: AuthenticationFeature, private authenticationService: AuthenticationService, private server_identifier: string = faker.datatype.uuid())
    {
        this.express = express();

        this.express.use(cors());
        this.express.use(cookieParser());
        this.express.use(morgan("common"));
        this.express.use(express.json());

        this.express.use("/public/static", express.static(path.join(...directories.static)));

        this.express.get("/", async (req, res) =>
        {
            const token_: string | undefined = req.cookies["token"];

            if (token_)
            {
                const payload_: payload_type | null = this.authenticationFeature.verify_jwt(token_);

                if (payload_ && payload_.user_id)
                {
                    const page_ = await authenticationService.getPage_url(payload_.user_id)

                    res.redirect(page_ ? page_ : "/index");
                }
                else
                    res.redirect("/login");
            }
            else
                res.redirect("/login");
        });

        this.express.set("view engine", "handlebars");
        this.express.set("views", path.join(...directories.views));

        this.express.engine("handlebars", engine({
            defaultLayout: "index",
            extname: "handlebars",
            partialsDir: path.join(...directories.views),
            layoutsDir: path.join(...directories.layouts)
        }));

        this.register_routers();

        this.registry.registerAuthentication(this.express);
        this.httpServer = null;
    }

    register_routers()
    {
        this.routers.forEach(value => this.express.use("/" + value.getEndpoint(), value.getExpressRouter()));
    }

    async start(): Promise<void>
    {
        this.registry.add_custom_pages(this.express);
        await this.registry.add_json_registry_pages(this.express);

        return new Promise<void>(resolve =>
        {
            this.httpServer = this.express.listen(this.port, () =>
            {
                console.log("RESTful", this.server_identifier, ["http://localhost:", this.port].join(""));

                resolve();
            });
        })
    }

    async stop(): Promise<boolean>
    {
        return new Promise<boolean>(resolve =>
        {
            if (this.httpServer)
            {
                console.log();
                console.log("!RESTful", this.server_identifier, this.port);

                this.httpServer.close(err => resolve(!err));
            }
            else
                resolve(false);
        });
    }
}

export async function run_RESTful(servers: RESTful[], databaseProvider: DatabaseProvider | null = null, cleanup: () => Promise<void> = () =>
{
    return new Promise(resolve => resolve());
})
{
    await Promise.all(servers.map(value => value.start()));

    process.on("SIGINT", async args =>
    {
        console.log((await Promise.all(servers.map(value => value.stop()))).every(value => value));

        await cleanup();

        if (databaseProvider)
            await databaseProvider.close();

        process.exit();
    });
}
