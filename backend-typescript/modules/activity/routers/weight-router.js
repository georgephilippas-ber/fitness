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
exports.WeightRouter = void 0;
const router_1 = require("../../../core/base/routers/router");
const period_1 = require("@sprinter-common/features/time/period/period");
const http_status_codes_1 = require("http-status-codes");
class WeightRouter extends router_1.Router {
    constructor(weightManager, statisticsService, authenticationFeature) {
        super("weight");
        this.weightManager = weightManager;
        this.statisticsService = statisticsService;
        this.authenticationFeature = authenticationFeature;
        this.all();
        this.latest();
        this.statistics();
    }
    all() {
        this.router_.post("/" + this.all.name, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body_ = req.body;
            const user_id = this.authenticationFeature.getAuthenticatedUser_req(req);
            if (user_id) {
                res.send(yield this.weightManager.forPeriod(user_id, new period_1.Period(body_.beginning_timestamp, body_.end_timestamp)));
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }));
    }
    latest() {
        this.router_.post("/" + this.latest.name, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body_ = req.body;
            const user_id = this.authenticationFeature.getAuthenticatedUser_req(req);
            console.log(user_id);
            if (user_id) {
                res.send(yield this.weightManager.latest(user_id, new period_1.Period(body_.beginning_timestamp, body_.end_timestamp)));
            }
            else
                res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }));
    }
    statistics() {
        this.router_.post("/" + this.statistics.name, (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body_ = req.body;
            const user_id = this.authenticationFeature.getAuthenticatedUser_req(req);
            try {
                if (user_id)
                    res.send(yield this.statisticsService.weight_statistics(user_id, new period_1.Period(body_.beginning_timestamp, body_.end_timestamp)));
                else
                    res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
            }
            catch (e) {
                console.log(this.statistics.name, this.constructor.name);
                res.sendStatus(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
            }
        }));
    }
}
exports.WeightRouter = WeightRouter;
