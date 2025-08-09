"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresetApplier = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const simple_git_1 = tslib_1.__importDefault(require("simple-git"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let PresetApplier = class PresetApplier {
    async run(applierOptions) {
        var _a, _b;
        this.bus.info(`Applying preset ${exports_1.color.magenta(applierOptions.resolvable)}.`);
        this.bus.debug(`Target directory: ${exports_1.color.gray(JSON.stringify(applierOptions.target))}`);
        this.bus.debug(`Command line options: ${exports_1.color.gray(JSON.stringify(applierOptions.options))}`);
        this.bus.debug(`Command line arguments: ${exports_1.color.gray(JSON.stringify(applierOptions.args))}`);
        // Resolves the given preset resolvable.
        const resolved = await this.resolver.resolve(applierOptions.resolvable, {
            path: applierOptions.options.path,
            ssh: applierOptions.options.ssh,
        });
        // Imports the preset configuration.
        const preset = exports_1.cachePreset(resolved.path, await this.importer.import(resolved.path));
        // Defines the preset's context
        (_a = preset.context) !== null && _a !== void 0 ? _a : (preset.context = {});
        preset.presetDirectory = resolved.path;
        preset.targetDirectory = applierOptions.target;
        preset.options = Object.assign(Object.assign({}, preset.options), applierOptions.options);
        preset.args = applierOptions.args;
        preset.git = {
            instance: simple_git_1.default(process.cwd()),
            config: (await simple_git_1.default().listConfig()).all,
        };
        this.bus.debug('Steps: ' + exports_1.color.gray(preset.actions.map(({ name }) => name).join(', ')) || exports_1.color.red('none'));
        await this.performActions(preset, applierOptions);
        this.bus.success(`${exports_1.color.magenta((_b = exports_1.contextualizeValue(preset, preset.name)) !== null && _b !== void 0 ? _b : applierOptions.resolvable)} has been applied.`);
        // Displays instructions
        if (preset.instructions && preset.isInteractive()) {
            this.bus.instruct(exports_1.wrap(exports_1.contextualizeValue(preset, preset.instructions.messages)), exports_1.contextualizeValue(preset, preset.instructions.heading));
        }
        // Cleans up temporary files
        this.cleanUp(resolved);
    }
    /**
     * Performs the actions.
     */
    async performActions(preset, applierOptions) {
        var _a, _b;
        // Creates a map of the actions with their handlers.
        const actions = new Map();
        // Validates the actions before executing them.
        // If an action has no handler, the preset won't be applied.
        for (const uncontextualizedAction of preset.actions) {
            const action = uncontextualizedAction;
            const handler = exports_1.container.getAll(exports_1.Binding.Handler).find(({ name }) => name === action.handler);
            if (!handler) {
                const name = (_a = exports_1.contextualizeValue(preset, action.name)) !== null && _a !== void 0 ? _a : action.constructor.name;
                throw new exports_1.ExecutionError(`Action at index ${exports_1.color.magenta(actions.size.toString())} (${exports_1.color.magenta(name)}) is not valid.`) //
                    .stopsExecution()
                    .withoutStack();
            }
            actions.set(action, handler);
        }
        // Loops through the action to find their handler and
        // run them, in the order they have been defined.
        for (const [uncontextualizedAction, handler] of actions) {
            const action = exports_1.contextualizeObject(preset, uncontextualizedAction);
            const shouldRun = !action.conditions.some((condition) => {
                return !Boolean(exports_1.contextualizeValue(preset, condition));
            });
            if (!shouldRun) {
                this.bus.debug(`Skipped a ${exports_1.color.magenta(action.name)} because one of the conditions did not pass.`);
                continue;
            }
            this.bus.debug(`Handling a ${exports_1.color.magenta(action.name)}.`);
            if (action.title !== false) {
                this.bus.info((_b = action.title) !== null && _b !== void 0 ? _b : `Performing a ${exports_1.color.magenta(action.name)}...`);
            }
            await handler.handle(action, applierOptions);
        }
    }
    /**
     * Cleans up the temporary directory if needed.
     */
    cleanUp({ path, temporary }) {
        if (!temporary) {
            return;
        }
        this.bus.debug(`Deleting ${exports_1.color.underline(path)}.`);
        try {
            fs_extra_1.default.emptyDirSync(path);
            fs_extra_1.default.rmdirSync(path);
        }
        catch (error) {
            throw new exports_1.ExecutionError() //
                .withMessage('Could not clean up temporary files.')
                .withCompleteStack(error)
                .recoverable();
        }
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Resolver),
    tslib_1.__metadata("design:type", Object)
], PresetApplier.prototype, "resolver", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Importer),
    tslib_1.__metadata("design:type", Object)
], PresetApplier.prototype, "importer", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], PresetApplier.prototype, "bus", void 0);
PresetApplier = tslib_1.__decorate([
    inversify_1.injectable()
], PresetApplier);
exports.PresetApplier = PresetApplier;
