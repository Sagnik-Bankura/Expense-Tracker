"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplyPresetHandler = void 0;
const tslib_1 = require("tslib");
const cac_1 = tslib_1.__importDefault(require("cac"));
const rfdc_1 = tslib_1.__importDefault(require("rfdc"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let ApplyPresetHandler = class ApplyPresetHandler {
    constructor() {
        this.name = exports_1.Name.Handler.ApplyPreset;
    }
    async handle(action, applierOptions) {
        if (!action.resolvable) {
            throw new exports_1.ExecutionError().stopsExecution().withMessage(`No resolvable specified.`);
        }
        const forwardOptions = rfdc_1.default({ circles: true, proto: true })(applierOptions);
        // Cleans up the arguments and options if necessary.
        if (!action.shouldInheritArguments) {
            forwardOptions.args = [];
            forwardOptions.options = {};
        }
        // Parses the given arguments and forward them to the preset being applied.
        const { args, options } = cac_1.default().parse(['', '', ...exports_1.wrap(action.args)]);
        forwardOptions.args.push(...args);
        forwardOptions.options = Object.assign({ interaction: false }, options);
        await exports_1.container.get(exports_1.Binding.Applier).run(Object.assign(Object.assign({}, forwardOptions), { resolvable: action.resolvable }));
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], ApplyPresetHandler.prototype, "bus", void 0);
ApplyPresetHandler = tslib_1.__decorate([
    inversify_1.injectable()
], ApplyPresetHandler);
exports.ApplyPresetHandler = ApplyPresetHandler;
