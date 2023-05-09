"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const express_1 = __importDefault(require("express"));
class Router {
    constructor(endpoint) {
        this.endpoint = endpoint;
        this.router_ = express_1.default.Router();
    }
    getExpressRouter() {
        return this.router_;
    }
    getEndpoint() {
        return this.endpoint;
    }
}
exports.Router = Router;
