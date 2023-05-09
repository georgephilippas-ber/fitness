import {UserManager} from "../../model/managers/user/user-manager";
import {AuthenticationManager} from "../../model/managers/authentication/authentication-manager";
import {ActivityUserInformationManager} from "../../modules/activity/managers/user-information/user-information";
import {faker} from "@faker-js/faker";

const root_password: string = "leiK7lohgu1Ohnge";
const user_password: string = "shuxoh0Thee4uZee";

export async function seed(userManager: UserManager, authenticationManager: AuthenticationManager, activityUserInformationManager: ActivityUserInformationManager)
{
    await userManager.insertOne({
        id: -1,
        email: "root@root.com",
        username: "root",
        createdAt: Date.now(),
        first_name: "root",
        last_name: "root",
        page: "/root",
    });
    await authenticationManager.create(-1, root_password, true, true);


    await userManager.insertOne({
        id: -2,
        email: "user@user.com",
        username: "user",
        createdAt: Date.now(),
        first_name: "user",
        last_name: "user",
        page: "/activities_authorization"
    });
    await authenticationManager.create(-2, user_password, true, true);

    await Promise.all(Array(0x04).fill(0).map(value =>
    {
        const firstName: string = faker.name.firstName();
        const lastName: string = faker.name.lastName();

        const id: number = faker.datatype.number({min: 1_000, max: 10_000_000_000});

        return Promise.all([userManager.insertOne({
            id,
            createdAt: Date.now(),
            username: faker.internet.userName(firstName, lastName).toLowerCase(),
            email: faker.internet.email(firstName, lastName).toLowerCase(),
            first_name: firstName,
            last_name: lastName,
            page: "https://www.google.de/"
        }), authenticationManager.create(id, "password")]);
    }));

    await activityUserInformationManager.createUser(-2);

    await activityUserInformationManager.set_client(-2, "activity", "fitbit");
    await activityUserInformationManager.set_client(-2, "activities", "fitbit");
    await activityUserInformationManager.set_client(-2, "weight", "withings");
}
