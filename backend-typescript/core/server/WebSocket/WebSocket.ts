import {Server} from 'socket.io';
import {faker} from "@faker-js/faker";
import {createServer} from "http";

process.env.DEBUG = 'socket.io:*';

export class WebSocketServer
{
    protected webSocketServer: Server
    private readonly httpServer;

    constructor(private port: number, private name: string = faker.datatype.uuid())
    {
        this.httpServer = createServer();

        this.webSocketServer = new Server(this.httpServer, {

            cors: {
                origin: "*",
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: ['Content-Type', 'Authorization'],
                credentials: true
            }
        });

        this.webSocketServer.on("connection", (socket) =>
        {
            console.log(this.constructor.name, "connection");

            this.webSocketServer.on("test", args =>
            {
                console.log(args);
            });
        });
    }

    public start()
    {
        this.httpServer.listen(this.port, () =>
        {
            console.log("WebSocket", this.name, this.constructor.name, "PORT", this.port);
        });
    }

    public stop()
    {
        this.httpServer.close();
        console.log("!" + this.name);
    }
}
