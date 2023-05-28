"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_feature_1 = require("../../core/features/authentication/authentication-feature");
const authenticationFeature = new authentication_feature_1.AuthenticationFeature("SECRET");
console.log(authenticationFeature.produce_jwt(-2, "user", 72));
