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
exports.ActivityUserInformationManager = void 0;
const manager_1 = require("../../../../core/base/managers/manager");
class ActivityUserInformationManager extends manager_1.Manager {
    constructor(databaseProvider) {
        super(databaseProvider, ActivityUserInformationManager.name);
    }
    createUser(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.upsertOne({ user_id }, {
                user_id, clients: {
                    weight: "random",
                    activities: "random",
                    activity: "random",
                }
            });
        });
    }
    byId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection().findOne({ user_id });
        });
    }
    clients_providers_iterate(user_information) {
        return Object.keys(user_information.clients).map(value => [value, user_information.clients[value]]);
    }
    set_client(user_id, client_aspect, provider) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_information = yield this.byId(user_id);
            if (user_information) {
                user_information.clients[client_aspect] = provider;
                try {
                    return (yield this.collection().updateOne({ user_id }, { "$set": user_information })).modifiedCount > 0;
                }
                catch (e) {
                    console.log("error", this.set_client.name, this.constructor.name);
                    return false;
                }
            }
            else
                return false;
        });
    }
    iterateById(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_information = yield this.byId(user_id);
            if (user_information) {
                return this.clients_providers_iterate(user_information);
            }
            else
                return [];
        });
    }
}
exports.ActivityUserInformationManager = ActivityUserInformationManager;
