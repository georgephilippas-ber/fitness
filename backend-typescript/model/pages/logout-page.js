"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogoutPage = void 0;
const page_1 = require("../../core/base/pages/page");
class LogoutPage extends page_1.Page {
    constructor() {
        super("/logout", true, { title: "", css_filenames: [] }, "logout");
    }
    add(express) {
        super.add(express);
    }
}
exports.LogoutPage = LogoutPage;
