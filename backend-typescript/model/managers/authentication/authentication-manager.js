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
exports.AuthenticationManager = void 0;
const manager_1 = require("../../../core/base/managers/manager");
const bcrypt_1 = require("bcrypt");
class AuthenticationManager extends manager_1.Manager {
    constructor(databaseProvider) {
        super(databaseProvider, AuthenticationManager.name);
    }
    create(id, password, activated = false, verified = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield (0, bcrypt_1.genSalt)(0x0f);
            const hash_ = yield (0, bcrypt_1.hash)(password, salt);
            return this.insertOne({
                id,
                createdAt: Date.now(),
                hash: hash_,
                salt,
                activated,
                verified
            });
        });
    }
    verify_user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection().updateOne({ id }, { "$set": { verified: true } }, { upsert: false })).upsertedCount === 1;
        });
    }
    activate_user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.collection().updateOne({ id }, { "$set": { activated: true } }, { upsert: false })).upsertedCount === 1;
        });
    }
    verify_password(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const agent = yield this.byId(id);
            if (agent) {
                const salt = agent.salt;
                return (yield (0, bcrypt_1.hash)(password, salt)) === agent.hash;
            }
            else
                return false;
        });
    }
    byId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection().findOne({ id });
        });
    }
}
exports.AuthenticationManager = AuthenticationManager;
