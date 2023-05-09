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
exports.UserRouter = void 0;
const router_1 = require("../../../core/base/routers/router");
const http_status_codes_1 = require("http-status-codes");
class UserRouter extends router_1.Router {
    constructor(userManager) {
        super("users");
        this.userManager = userManager;
        this.default();
        this.all();
    }
    default() {
        this.getExpressRouter().get("/", (req, res) => {
            res.sendStatus(http_status_codes_1.StatusCodes.OK);
        });
    }
    all() {
        this.getExpressRouter().get("/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send(yield this.userManager.all());
        }));
    }
}
exports.UserRouter = UserRouter;
