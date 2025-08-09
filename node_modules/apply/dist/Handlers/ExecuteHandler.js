"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecuteHandler = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let ExecuteHandler = class ExecuteHandler {
    constructor() {
        this.name = exports_1.Name.Handler.Execute;
    }
    async handle(action, applierOptions) {
        if (!action.command) {
            throw new exports_1.ExecutionError() //
                .withMessage(`No command provided for the ${exports_1.color.magenta('execute')} action.`)
                .withoutStack()
                .stopsExecution();
        }
        await this.execute(applierOptions.target, action.command, exports_1.wrap(action.args), action.options);
    }
    async execute(cwd, command, args = [], options = {}) {
        try {
            this.bus.debug(`Executing command: ${exports_1.color.bold().gray(command)} ${exports_1.color.gray(args.join(' '))}.`);
            await exports_1.execute(cwd, command, args, options);
        }
        catch (error) {
            throw new exports_1.ExecutionError() //
                .withMessage(`An error occured while executing ${exports_1.color.magenta(command)}.`)
                .withCompleteStack(error)
                .stopsExecution();
        }
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], ExecuteHandler.prototype, "bus", void 0);
ExecuteHandler = tslib_1.__decorate([
    inversify_1.injectable()
], ExecuteHandler);
exports.ExecuteHandler = ExecuteHandler;
