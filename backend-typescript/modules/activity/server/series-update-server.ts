import {WebSocketServer} from "../../../core/server/WebSocket/WebSocket";
import {SeriesUpdateGeneric} from "../services/update/series-update-generic";
import {Socket} from "socket.io";
import {DateTime} from "luxon";
import {AuthenticationFeature} from "../../../core/features/authentication/authentication-feature";
import {client_aspect_type} from "../schema/schema";


type connectedClient_type =
    {
        user_id: number;
        referenceDate: number;
        connectionSocket: Socket;
    }


export class SeriesUpdateServer extends WebSocketServer
{
    connected: connectedClient_type[];

    constructor(port: number, private series: { [key in client_aspect_type]?: SeriesUpdateGeneric<any> }, private authenticationFeature: AuthenticationFeature)
    {
        super(port);

        this.connected = [];
    }

    setup()
    {
        this.webSocketServer.on("connection", socket =>
            {
                console.log("connection");

                const user_id: number = parseInt(socket.handshake.query["user_id"] as string);

                if (user_id && !this.connected.filter(value => value.user_id === user_id))
                    this.connected.push({user_id, connectionSocket: socket, referenceDate: DateTime.now().toMillis()});

                socket.on("update", async (client_aspects: client_aspect_type[], token?: string) =>
                {
                    const user_id = this.authenticationFeature.getAuthenticatedUser_jwt(token || "");

                    if (user_id)
                    {
                        let updateOutcome: boolean[] = [false];

                        try
                        {

                            updateOutcome = await Promise.all(client_aspects.map(value =>
                            {
                                return this.series[value]?.update(user_id) || false
                            }));
                        }
                        catch (e)
                        {

                        }
                        finally
                        {
                            socket.emit("activity-complete", updateOutcome.every(value => value));
                        }
                    }
                });
            }
        );
    }
}
