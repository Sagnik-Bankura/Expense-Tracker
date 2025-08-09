"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let PromptHandler = class PromptHandler {
    constructor() {
        this.name = exports_1.Name.Handler.Prompt;
    }
    async handle(action) {
        // Loops through the defined prompts, and prompt them to the user.
        // If the preset is not interactive, defines the default values directly.
        for (let [name, options] of action.prompts) {
            this.bus.debug(`Prompting for value ${exports_1.color.magenta(name)}.`);
            if (action.preset.isInteractive()) {
                action.preset.prompts[name] = await this.prompt.prompt(exports_1.contextualizeObject(action.preset, options));
            }
            else {
                action.preset.prompts[name] = exports_1.contextualizeObject(action.preset, options).initial;
            }
        }
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], PromptHandler.prototype, "bus", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Prompt),
    tslib_1.__metadata("design:type", Object)
], PromptHandler.prototype, "prompt", void 0);
PromptHandler = tslib_1.__decorate([
    inversify_1.injectable()
], PromptHandler);
exports.PromptHandler = PromptHandler;
