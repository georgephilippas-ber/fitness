"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servers = void 0;
const process_1 = require("process");
const default_port = 0x1000;
console.log("environment PORT", process_1.env["PORT"]);
const mongodb_atlas_username = "georgephilippas-ber";
const mongodb_atlas_password = "85D3qpDm5Ycfq4f6";
const mongodb_atlas_cluster_name = "cluster0";
const mongodb_uri = `mongodb+srv://${mongodb_atlas_username}:${mongodb_atlas_password}@${mongodb_atlas_cluster_name}.y9c01hn.mongodb.net/?retryWrites=true&w=majority`;
const mongodb_local_uri = "mongodb://127.0.0.1:27017/";
const servers_development = {
    backend: { url: "http://localhost", port: process_1.env["PORT"] || default_port, type: "local" },
    mongodb: { url: mongodb_local_uri, type: "local" }
};
const servers_production = {
    backend: { url: "http://localhost", port: process_1.env["PORT"] || default_port, type: "local" },
    mongodb: { url: mongodb_uri, type: "remote" }
};
exports.servers = servers_production;
