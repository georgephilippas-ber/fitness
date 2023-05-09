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
exports.Page = void 0;
class Page {
    //priority: handler > view
    constructor(endpoint, enabled, page_characteristics, view, layout) {
        this.endpoint = endpoint;
        this.enabled = enabled;
        this.page_characteristics = page_characteristics;
        this.view = view;
        this.layout = layout;
        this.override_handler = undefined;
    }
    enable() {
        this.enabled = true;
    }
    disable() {
        this.enabled = false;
    }
    getEndpoint() {
        return this.endpoint;
    }
    set_override_handler(handler) {
        this.override_handler = handler;
    }
    setView(view, layout) {
        this.view = view;
        this.layout = layout;
    }
    add(express, injection) {
        express.get(this.endpoint, (req, res) => __awaiter(this, void 0, void 0, function* () {
            if (this.enabled) {
                if (this.override_handler)
                    this.override_handler(req, res, () => undefined);
                else if (this.view) {
                    let options = {};
                    if (this.layout)
                        options = { layout: this.layout };
                    if (injection)
                        options = Object.assign(Object.assign(Object.assign(Object.assign({}, this.page_characteristics), options), (yield injection())), req.query);
                    res.render(this.view, options);
                }
                else
                    res.send("NotImplementedError");
            }
            else
                res.send("!enabled");
        }));
    }
}
exports.Page = Page;
