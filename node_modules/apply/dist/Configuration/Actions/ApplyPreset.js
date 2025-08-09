"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyPreset = void 0;
const exports_1 = require("@/exports");
/**
 * An action for applying another preset.
 */
class ApplyPreset extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.ApplyPreset;
        this.name = 'preset application';
        this.title = 'Applying a preset...';
        this.shouldInheritArguments = true;
        this.args = [];
    }
    /**
     * Applies the given preset.
     */
    apply(resolvable) {
        this.resolvable = resolvable;
        return this;
    }
    /**
     * Applies the given arguments to the preset.
     */
    with(args) {
        this.args = args;
        return this;
    }
    /**
     * Whether the preset will inherit the current command line arguments.
     */
    inheritsArguments(shouldInheritArguments = true) {
        this.shouldInheritArguments = shouldInheritArguments;
        return this;
    }
}
exports.ApplyPreset = ApplyPreset;
