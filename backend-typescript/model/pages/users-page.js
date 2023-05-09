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
exports.UsersPage = void 0;
const protected_page_1 = require("../../core/base/pages/protected-page");
const faker_1 = require("@faker-js/faker");
function users(cardinality) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => {
            resolve(Array(cardinality).fill(0).map(value => {
                const firstName = faker_1.faker.name.firstName("female");
                const lastName = faker_1.faker.name.lastName("male");
                const username = faker_1.faker.internet.userName(firstName, lastName).toLowerCase();
                const email = faker_1.faker.internet.email(firstName, lastName).toLowerCase();
                const id = faker_1.faker.datatype.number({ min: 1000, max: 10000000000 });
                const createdAt = Date.now();
                return {
                    id, username, email, first_name: firstName, last_name: lastName, createdAt, page: ""
                };
            }));
        });
    });
}
class UsersPage extends protected_page_1.ProtectedPage {
    constructor(authenticationFeature, userManager) {
        super(authenticationFeature, "/root", true, "-1", { title: "users", css_filenames: [] }, "users", "users");
        this.authenticationFeature = authenticationFeature;
        this.userManager = userManager;
    }
    add(express) {
        const _super = Object.create(null, {
            add: { get: () => super.add }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.add.call(this, express, () => __awaiter(this, void 0, void 0, function* () {
                return {
                    users: yield this.userManager.all()
                };
            }));
        });
    }
    ;
}
exports.UsersPage = UsersPage;
