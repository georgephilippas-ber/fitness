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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_provider_1 = require("../../core/database-provider/database-provider");
const location_1 = require("../../configuration/servers/location");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const collection_name = "Nutrition";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const databaseProvider = new database_provider_1.DatabaseProvider({
            uri: location_1.servers.mongodb.url, db: "corporate"
        });
        if (yield databaseProvider.hasCollection("Nutrition"))
            yield databaseProvider.dropCollection("Nutrition");
        const nutrition = JSON.parse((0, fs_1.readFileSync)(path_1.default.join(__dirname, "..", "..", "..", "python", "flask-backend", "nutrition", "nutrition.json"), "utf-8"));
        yield databaseProvider.db().collection(collection_name).insertMany(nutrition);
        yield databaseProvider.close();
    });
}
main();
