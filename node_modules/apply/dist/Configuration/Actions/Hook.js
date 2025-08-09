"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hook = void 0;
const exports_1 = require("@/exports");
class Hook extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Hook;
        this.name = 'custom code block';
        this.title = 'Executing additionnal logic...';
        this.hooks = [];
    }
    /**
     * Executes the given callback.
     */
    run(callback) {
        this.hooks.push({ callback });
        return this;
    }
}
exports.Hook = Hook;
