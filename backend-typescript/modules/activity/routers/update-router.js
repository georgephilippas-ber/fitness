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
exports.UpdateRouter = void 0;
const router_1 = require("../../../core/base/routers/router");
const http_status_codes_1 = require("http-status-codes");
class UpdateRouter extends router_1.Router {
    constructor(clients, timeSeriesManagers, activityUserInformationManager, authenticationFeature) {
        super("update");
        this.clients = clients;
        this.timeSeriesManagers = timeSeriesManagers;
        this.activityUserInformationManager = activityUserInformationManager;
        this.authenticationFeature = authenticationFeature;
        this.update();
    }
    update() {
        this.router_.post("/update", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = this.authenticationFeature.getAuthenticatedUser_req(req);
            if (user_id) {
                const activity_user_information = yield this.activityUserInformationManager.byId(user_id);
                if (activity_user_information) {
                    const iterable_ = yield this.activityUserInformationManager.iterateById(user_id);
                    const update_outcome = yield Promise.all(iterable_.map(value => {
                        return this.clients.update(user_id, value[0], value[1]);
                    }));
                    const response_ = {};
                    for (let i = 0; i < iterable_.length; i++) {
                        response_[iterable_[i][0]] = update_outcome[i];
                    }
                    res.send(response_);
                }
                else
                    res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }));
    }
}
exports.UpdateRouter = UpdateRouter;
