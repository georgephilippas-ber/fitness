"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.run_RESTful = exports.RESTful = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path = __importStar(require("path"));
const faker_1 = require("@faker-js/faker");
const morgan_1 = __importDefault(require("morgan"));
const express_handlebars_1 = require("express-handlebars");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const root_ = [__dirname, "..", "..", "..",];
const static_ = ["public", "static"];
const directories = {
    layouts: [...root_, "public", "views", "layouts"],
    views: [...root_, "public", "views"],
    static: [...root_, ...static_],
};
class RESTful {
    constructor(port, routers, registry, authenticationFeature, authenticationService, server_identifier = faker_1.faker.datatype.uuid()) {
        this.port = port;
        this.routers = routers;
        this.registry = registry;
        this.authenticationFeature = authenticationFeature;
        this.authenticationService = authenticationService;
        this.server_identifier = server_identifier;
        this.express = (0, express_1.default)();
        this.express.use((0, cors_1.default)());
        this.express.use((0, cookie_parser_1.default)());
        this.express.use((0, morgan_1.default)("common"));
        this.express.use(express_1.default.json());
        this.express.use("/public/static", express_1.default.static(path.join(...directories.static)));
        this.express.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const token_ = req.cookies["token"];
            if (token_) {
                const payload_ = this.authenticationFeature.verify_jwt(token_);
                if (payload_ && payload_.user_id) {
                    const page_ = yield authenticationService.getPage_url(payload_.user_id);
                    res.redirect(page_ ? page_ : "/index");
                }
                else
                    res.redirect("/login");
            }
            else
                res.redirect("/login");
        }));
        this.express.set("view engine", "handlebars");
        this.express.set("views", path.join(...directories.views));
        this.express.engine("handlebars", (0, express_handlebars_1.engine)({
            defaultLayout: "index",
            extname: "handlebars",
            partialsDir: path.join(...directories.views),
            layoutsDir: path.join(...directories.layouts)
        }));
        this.register_routers();
        this.registry.registerAuthentication(this.express);
        this.httpServer = null;
    }
    register_routers() {
        this.routers.forEach(value => this.express.use("/" + value.getEndpoint(), value.getExpressRouter()));
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.registry.add_custom_pages(this.express);
            yield this.registry.add_json_registry_pages(this.express);
            return new Promise(resolve => {
                this.httpServer = this.express.listen(this.port, () => {
                    console.log("RESTful", this.server_identifier, ["http://localhost:", this.port].join(""));
                    resolve();
                });
            });
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                if (this.httpServer) {
                    console.log();
                    console.log("!RESTful", this.server_identifier, this.port);
                    this.httpServer.close(err => resolve(!err));
                }
                else
                    resolve(false);
            });
        });
    }
}
exports.RESTful = RESTful;
function run_RESTful(servers, databaseProvider = null, cleanup = () => {
    return new Promise(resolve => resolve());
}) {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(servers.map(value => value.start()));
        process.on("SIGINT", (args) => __awaiter(this, void 0, void 0, function* () {
            console.log((yield Promise.all(servers.map(value => value.stop()))).every(value => value));
            yield cleanup();
            if (databaseProvider)
                yield databaseProvider.close();
            process.exit();
        }));
    });
}
exports.run_RESTful = run_RESTful;
