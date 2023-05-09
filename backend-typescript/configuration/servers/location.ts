import {env} from "process";

const default_port: number = 0x1000;

console.log("environment PORT", env["PORT"]);

type server_type =
    {
        type: "local" | "remote";
        url: string;
        port?: number;
    }

type servers_type =
    {
        backend: server_type;
        mongodb: server_type;
    }

const mongodb_atlas_username: string = "georgephilippas-ber";
const mongodb_atlas_password: string = "85D3qpDm5Ycfq4f6"
const mongodb_atlas_cluster_name: string = "cluster0";

const mongodb_uri: string = `mongodb+srv://${mongodb_atlas_username}:${mongodb_atlas_password}@${mongodb_atlas_cluster_name}.y9c01hn.mongodb.net/?retryWrites=true&w=majority`;
const mongodb_local_uri: string = "mongodb://127.0.0.1:27017/";

const servers_development: servers_type =
    {
        backend: {url: "http://localhost", port: env["PORT"] as (number | undefined) || default_port, type: "local"},
        mongodb: {url: mongodb_local_uri, type: "local"}
    }

const servers_production: servers_type =
    {
        backend: {url: "http://localhost", port: env["PORT"] as (number | undefined) || default_port, type: "local"},
        mongodb: {url: mongodb_uri, type: "remote"}
    }

export const servers: servers_type = servers_production;
