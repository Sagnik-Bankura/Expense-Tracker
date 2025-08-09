"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HookHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
const utils_1 = require("@/Support/utils");
const ExecutionError_1 = require("@/Errors/ExecutionError");
let HookHandler = class HookHandler {
    constructor() {
        this.name = exports_1.Name.Handler.Hook;
    }
    async handle(action) {
        var _a, _b;
        const hooks = utils_1.wrap(action.hooks);
        this.bus.debug(`Running ${utils_1.color.magenta(hooks.length.toString())} hook(s).`);
        for (const hook of hooks) {
            this.bus.debug(`Running callabck #${utils_1.color.magenta(hooks.indexOf(hook).toString())}.`);
            try {
                await ((_b = (_a = utils_1.contextualizeValue(action.preset, hook)).callback) === null || _b === void 0 ? void 0 : _b.call(_a, action.preset));
            }
            catch (error) {
                throw new ExecutionError_1.ExecutionError() //
                    .withMessage(error.message)
                    .withoutStack()
                    .stopsExecution();
            }
        }
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], HookHandler.prototype, "bus", void 0);
HookHandler = tslib_1.__decorate([
    inversify_1.injectable()
], HookHandler);
exports.HookHandler = HookHandler;
