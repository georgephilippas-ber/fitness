"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.levenshteinDistance = void 0;
const natural_1 = __importDefault(require("natural"));
function levenshteinDistance(queries, universe, keys, max) {
    const distances = universe.map((value, index) => {
        let distanceSum = 0;
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i].trim().toLowerCase();
            const key = keys[i];
            const distance = natural_1.default.LevenshteinDistance(query, value[key].toString());
            distanceSum += distance;
        }
        return [index, distanceSum];
    });
    const sortedDistances = distances.sort((a, b) => {
        return a[1] - b[1];
    });
    return sortedDistances.slice(0, max);
}
exports.levenshteinDistance = levenshteinDistance;
