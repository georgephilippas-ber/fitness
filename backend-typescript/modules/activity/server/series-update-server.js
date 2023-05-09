"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesUpdateServer = void 0;
const WebSocket_1 = require("../../../core/server/WebSocket/WebSocket");
const luxon_1 = require("luxon");
class SeriesUpdateServer extends WebSocket_1.WebSocketServer {
    constructor(port, series, authenticationFeature) {
        super(port);
        this.series = series;
        this.authenticationFeature = authenticationFeature;
        this.connected = [];
    }
    setup() {
        this.webSocketServer.on("connection", socket => {
            console.log("connection");
            const user_id = parseInt(socket.handshake.query["user_id"]);
            if (user_id && !this.connected.filter(value => value.user_id === user_id))
                this.connected.push({ user_id, connectionSocket: socket, referenceDate: luxon_1.DateTime.now().toMillis() });
            socket.on("update", (client_aspects, token) => __awaiter(this, void 0, void 0, function* () {
                const user_id = this.authenticationFeature.getAuthenticatedUser_jwt(token || "");
                if (user_id) {
                    let updateOutcome = [false];
                    try {
                        updateOutcome = yield Promise.all(client_aspects.map(value => {
                            var _a;
                            return ((_a = this.series[value]) === null || _a === void 0 ? void 0 : _a.update(user_id)) || false;
                        }));
                    }
                    catch (e) {
                    }
                    finally {
                        socket.emit("activity-complete", updateOutcome.every(value => value));
                    }
                }
            }));
        });
    }
}
exports.SeriesUpdateServer = SeriesUpdateServer;
