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
exports.DatabaseProvider = void 0;
const mongodb_1 = require("mongodb");
class DatabaseProvider {
    constructor(MongoDB_configuration) {
        this.MongoDB_configuration = MongoDB_configuration;
        this.MongoDB_client = new mongodb_1.MongoClient(MongoDB_configuration.uri, { keepAlive: true });
    }
    db() {
        return this.MongoDB_client.db(this.MongoDB_configuration.db);
    }
    hasCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.db().collections()).map(value => value.collectionName).includes(collection);
        });
    }
    dropCollection(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db().dropCollection(collection);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.MongoDB_client.close();
        });
    }
}
exports.DatabaseProvider = DatabaseProvider;
