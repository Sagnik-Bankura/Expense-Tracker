"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let GroupHandler = class GroupHandler {
    constructor() {
        this.name = exports_1.Name.Handler.Group;
    }
    async handle(action, applierOptions) {
        var _a;
        if (!((_a = action.actions) === null || _a === void 0 ? void 0 : _a.callback)) {
            this.bus.debug(`No callback given. Skipping.`);
            return;
        }
        const preset = new exports_1.Preset();
        preset.args = action.preset.args;
        preset.options = action.preset.options;
        preset.context = action.preset.context;
        preset.git = action.preset.git;
        preset.presetDirectory = action.preset.presetDirectory;
        preset.prompts = action.preset.prompts;
        preset.templateDirectory = action.preset.templateDirectory;
        preset.targetDirectory = action.preset.targetDirectory;
        preset.actions = [];
        action.actions.callback(preset);
        preset.actions.map((action) => action.withTitle(false));
        this.bus.debug(`Perfoming a group of ${exports_1.color.magenta(String(preset.actions.length))} actions.`);
        await exports_1.container.get(exports_1.Binding.Applier).performActions(preset, applierOptions);
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], GroupHandler.prototype, "bus", void 0);
GroupHandler = tslib_1.__decorate([
    inversify_1.injectable()
], GroupHandler);
exports.GroupHandler = GroupHandler;
