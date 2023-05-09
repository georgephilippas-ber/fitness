import {ProtectedPage} from "../../core/base/pages/protected-page";
import {Express} from "express";
import {user_type} from "../schema/user/user-schema";
import {faker} from "@faker-js/faker";
import {UserManager} from "../managers/user/user-manager";
import {AuthenticationFeature} from "../../core/features/authentication/authentication-feature";

async function users(cardinality: number): Promise<user_type[]>
{
    return new Promise<user_type[]>(
        resolve =>
        {
            resolve(
                Array(cardinality).fill(0).map(value =>
                {
                    const firstName: string = faker.name.firstName("female");
                    const lastName: string = faker.name.lastName("male");

                    const username: string = faker.internet.userName(firstName, lastName).toLowerCase();
                    const email: string = faker.internet.email(firstName, lastName).toLowerCase();
                    const id: number = faker.datatype.number({min: 1_000, max: 10_000_000_000});
                    const createdAt: number = Date.now();

                    return {
                        id, username, email, first_name: firstName, last_name: lastName, createdAt, page: ""
                    };
                })
            );
        }
    );
}

export class UsersPage extends ProtectedPage
{
    constructor(protected authenticationFeature: AuthenticationFeature, private userManager: UserManager)
    {
        super(authenticationFeature, "/root", true, "-1", {title: "users", css_filenames: []}, "users", "users");
    }

    async add(express: Express)
    {
        super.add(express, async () =>
        {
            return {
                users: await this.userManager.all()
            }
        });
    };
}
