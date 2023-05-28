import {AuthenticationFeature} from "../../core/features/authentication/authentication-feature";

const authenticationFeature = new AuthenticationFeature("SECRET");

console.log(authenticationFeature.produce_jwt(-2, "user", 72));
