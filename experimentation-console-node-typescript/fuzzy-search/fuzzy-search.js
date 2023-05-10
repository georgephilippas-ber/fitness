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
exports.levenshteinDistance = exports.levenshteinDistanceSync = void 0;
const natural_1 = __importDefault(require("natural"));
function levenshteinDistanceSync(queries, universe, keys, max) {
    const distances = universe.map((value, index) => {
        let distanceSum = 0;
        for (let i = 0; i < queries.length; i++) {
            const query = queries[i].trim().toLowerCase();
            const key = keys[i];
            const distance = query ? natural_1.default.LevenshteinDistance(query, value[key].toString()) : 0.;
            distanceSum += distance;
        }
        return [index, distanceSum];
    });
    const sortedDistances = distances.sort((a, b) => {
        return a[1] - b[1];
    });
    return sortedDistances.slice(0, max);
}
exports.levenshteinDistanceSync = levenshteinDistanceSync;
function levenshteinDistance(queries, universe, keys, max) {
    return __awaiter(this, void 0, void 0, function* () {
        const distances = yield Promise.all(universe.map((value, index) => __awaiter(this, void 0, void 0, function* () {
            let distanceSum = 0;
            for (let i = 0; i < queries.length; i++) {
                const query = queries[i].trim().toLowerCase();
                const key = keys[i];
                const distance = query ? natural_1.default.LevenshteinDistance(query, value[key].toString()) : 0;
                distanceSum += distance;
            }
            return [index, distanceSum];
        })));
        const sortedDistances = distances.sort((a, b) => {
            return a[1] - b[1];
        });
        return sortedDistances.slice(0, max);
    });
}
exports.levenshteinDistance = levenshteinDistance;
