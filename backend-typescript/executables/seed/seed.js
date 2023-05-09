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
exports.seed = void 0;
const faker_1 = require("@faker-js/faker");
const root_password = "leiK7lohgu1Ohnge";
const user_password = "shuxoh0Thee4uZee";
function seed(userManager, authenticationManager, activityUserInformationManager) {
    return __awaiter(this, void 0, void 0, function* () {
        yield userManager.insertOne({
            id: -1,
            email: "root@root.com",
            username: "root",
            createdAt: Date.now(),
            first_name: "root",
            last_name: "root",
            page: "/root",
        });
        yield authenticationManager.create(-1, root_password, true, true);
        yield userManager.insertOne({
            id: -2,
            email: "user@user.com",
            username: "user",
            createdAt: Date.now(),
            first_name: "user",
            last_name: "user",
            page: "/activities_authorization"
        });
        yield authenticationManager.create(-2, user_password, true, true);
        yield Promise.all(Array(0x04).fill(0).map(value => {
            const firstName = faker_1.faker.name.firstName();
            const lastName = faker_1.faker.name.lastName();
            const id = faker_1.faker.datatype.number({ min: 1000, max: 10000000000 });
            return Promise.all([userManager.insertOne({
                    id,
                    createdAt: Date.now(),
                    username: faker_1.faker.internet.userName(firstName, lastName).toLowerCase(),
                    email: faker_1.faker.internet.email(firstName, lastName).toLowerCase(),
                    first_name: firstName,
                    last_name: lastName,
                    page: "https://www.google.de/"
                }), authenticationManager.create(id, "password")]);
        }));
        yield activityUserInformationManager.createUser(-2);
        yield activityUserInformationManager.set_client(-2, "activity", "fitbit");
        yield activityUserInformationManager.set_client(-2, "activities", "fitbit");
        yield activityUserInformationManager.set_client(-2, "weight", "withings");
    });
}
exports.seed = seed;
