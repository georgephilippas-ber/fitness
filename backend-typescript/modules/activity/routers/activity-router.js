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
exports.ActivityRouter = void 0;
const period_1 = require("@sprinter-common/features/time/period/period");
const http_status_codes_1 = require("http-status-codes");
const router_1 = require("../../../core/base/routers/router");
class ActivityRouter extends router_1.Router {
    constructor(activityManager, authenticationFeature) {
        super("activity");
        this.activityManager = activityManager;
        this.authenticationFeature = authenticationFeature;
        this.all();
        this.latest();
    }
    all() {
        this.router_.post("/" + this.all.name, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body_ = req.body;
            const user_id = this.authenticationFeature.getAuthenticatedUser_req(req);
            if (user_id) {
                try {
                    const response_ = yield this.activityManager.forPeriod(user_id, new period_1.Period(body_.beginning_timestamp, body_.end_timestamp));
                    console.log(response_);
                    res.send(response_);
                }
                catch (e) {
                    console.log(this.all.name);
                    console.log(e);
                    res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
                }
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }));
    }
    latest() {
        this.router_.post("/" + this.latest.name, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user_id = this.authenticationFeature.getAuthenticatedUser_req(req);
            if (user_id)
                res.send(yield this.activityManager.latest(user_id));
            else
                res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }));
    }
}
exports.ActivityRouter = ActivityRouter;
