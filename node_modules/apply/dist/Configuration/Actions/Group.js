"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const exports_1 = require("@/exports");
class Group extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Group;
        this.name = 'grouped action';
        this.title = 'Performing a group action...';
    }
    /**
     * Chains the actions in the callback.
     * Note that it won't work if you use the global `Preset` object. You need to use the callback's parameter.
     *
     * @example
     * Preset.group((preset) => {
     * 	preset.setEnv('APP_NAME', ({ APP_NAME }) => APP_NAME ?? 'Laravel')
     * 	preset.setEnv('APP_URL', ({ APP_NAME }) => `https://${APP_NAME.toLowerCase()}.test`)
     * }).withTitle('Setting up environment')
     */
    chain(callback) {
        if (callback) {
            this.actions = { callback };
        }
        return this;
    }
}
exports.Group = Group;
