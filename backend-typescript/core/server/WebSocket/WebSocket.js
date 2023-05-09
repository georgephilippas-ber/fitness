"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketServer = void 0;
const socket_io_1 = require("socket.io");
const faker_1 = require("@faker-js/faker");
const http_1 = require("http");
process.env.DEBUG = 'socket.io:*';
class WebSocketServer {
    constructor(port, name = faker_1.faker.datatype.uuid()) {
        this.port = port;
        this.name = name;
        this.httpServer = (0, http_1.createServer)();
        this.webSocketServer = new socket_io_1.Server(this.httpServer, {
            cors: {
                origin: "*",
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true
            }
        });
        this.webSocketServer.on("connection", (socket) => {
            console.log(this.constructor.name, "connection");
            this.webSocketServer.on("test", args => {
                console.log(args);
            });
        });
    }
    start() {
        this.httpServer.listen(this.port, () => {
            console.log("WebSocket", this.name, this.constructor.name, "PORT", this.port);
        });
    }
    stop() {
        this.httpServer.close();
        console.log("!" + this.name);
    }
}
exports.WebSocketServer = WebSocketServer;
