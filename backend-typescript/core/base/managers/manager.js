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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const fs_1 = require("fs");
class Manager {
    constructor(databaseProvider, collectionName) {
        this.databaseProvider = databaseProvider;
        this.collectionName = collectionName;
    }
    drop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.databaseProvider.hasCollection(this.collectionName))
                return yield this.databaseProvider.dropCollection(this.collectionName);
            else
                return false;
        });
    }
    delete(queryFilter = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.databaseProvider.db().collection(this.collectionName).deleteMany(queryFilter);
        });
    }
    upsertOne(filter, document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(yield this.databaseProvider.hasCollection(this.collectionName)))
                    yield this.databaseProvider.db().createCollection(this.collectionName);
                /*
                Specify an empty document { } to update the first document returned in the collection.
                 */
                const outcome_ = yield this.collection().updateOne(filter, { "$set": document }, { upsert: true });
                return outcome_.acknowledged;
            }
            catch (err) {
                console.log(this.upsertOne.name);
                console.log(err);
                return false;
            }
        });
    }
    insertOne(document) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.collection().insertOne(document);
                return true;
            }
            catch (err) {
                console.log(this.insertOne.name);
                console.log(err);
                return false;
            }
        });
    }
    collection() {
        return this.databaseProvider.db().collection(this.collectionName);
    }
    export(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                (0, fs_1.writeFile)(file, JSON.stringify((yield this.collection().find()).map(value => {
                    const { _id } = value, rest = __rest(value, ["_id"]);
                    return rest;
                })), { encoding: "utf-8" }, err => {
                    if (err) {
                        console.log(this.export.name);
                        console.log(err);
                        resolve(false);
                    }
                    else {
                        console.log(file);
                        resolve(true);
                    }
                });
            }));
        });
    }
    import(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const documents = JSON.parse((0, fs_1.readFileSync)(file, { encoding: "utf8" }));
            yield this.delete();
            return this.collection().insertMany(documents);
        });
    }
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.collection().find().toArray();
        });
    }
}
exports.Manager = Manager;
