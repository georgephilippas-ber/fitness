"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.distance = void 0;
const natural_1 = __importDefault(require("natural"));
function distance(query, universe, key, max) {
    return universe.map((value, index) => [index, natural_1.default.LevenshteinDistance(query.trim().toLowerCase(), value[key].toString())]).sort((a, b) => {
        return a[1] - b[1];
    }).slice(0, max);
}
exports.distance = distance;
