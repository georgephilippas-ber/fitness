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
exports.WithingsClient = void 0;
const axios_1 = __importDefault(require("axios"));
const luxon_1 = require("luxon");
function toWeight(user_id, measures) {
    const getValue = (type, measures_ = measures.measures) => {
        var _a;
        const measure_ = (_a = measures_.filter(value => value.type === type)) === null || _a === void 0 ? void 0 : _a[0];
        if (measure_) {
            return measure_.value * 10. ** (measure_.unit);
        }
        else
            return undefined;
    };
    const weight_ = getValue(1);
    // const fat_free_mass_ = getValue(5);
    // const fat_ratio_ = getValue(6);
    const fat_mass_weight_ = getValue(8);
    const muscle_mass_ = getValue(76);
    return weight_ !== undefined ? {
        user_id,
        id: measures.grpid.toFixed(),
        referenceDate: measures.created * 1000,
        measurement: {
            weight: weight_,
            fat_ratio: fat_mass_weight_ && weight_ ? fat_mass_weight_ / weight_ : undefined,
            muscle_ratio: muscle_mass_ && weight_ ? muscle_mass_ / weight_ : undefined,
        }
    } : undefined;
}
class WithingsClient {
    constructor(authorizationService, authorizationManager, userManager) {
        this.authorizationService = authorizationService;
        this.authorizationManager = authorizationManager;
        this.userManager = userManager;
        this.base_url = "https://wbsapi.withings.net/measure";
    }
    request(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    resolve(yield this.raw_request(user_id, period));
                }
                catch (err) {
                    try {
                        console.log("refresh", yield this.authorizationService.refresh(user_id, "withings"));
                        resolve(yield this.raw_request(user_id, period));
                    }
                    catch (err) {
                        console.log("withings requires authorization");
                        reject(err);
                    }
                }
            }));
        });
    }
    raw_request(user_id, period) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const accessToken = yield this.authorizationManager.getAccessToken(user_id, "withings");
                axios_1.default.post(this.base_url, {}, {
                    timeout: 3000,
                    params: {
                        action: "getmeas",
                        meastypes: "1,6,76,5,8",
                        category: 1,
                        startdate: Math.trunc(period.hasFiniteBeginning() ? period.getBeginning() / 1000 : 0),
                        enddate: Math.trunc(period.hasFiniteEnd() ? period.getEnd() / 1000 : luxon_1.DateTime.now().toMillis() / 1000),
                    },
                    headers: {
                        "Authorization": ["Bearer", accessToken].join(" ")
                    }
                }).then(value => {
                    if (value.data.body.measuregrps) {
                        console.log("withings request", user_id, value.data.body.measuregrps.length, "measurements", period.readable());
                        resolve(value.data.body.measuregrps.map(value => toWeight(user_id, value)).filter(value => !!value));
                    }
                    else
                        reject(value.data.status + " " + JSON.stringify(value.data.body));
                }).catch(reason => {
                    console.log(reason);
                    reject(reason);
                });
            }));
        });
    }
}
exports.WithingsClient = WithingsClient;
