"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandLineInterface = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const cac_1 = tslib_1.__importDefault(require("cac"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
/**
 * Command line interface for applying a preset.
 */
let CommandLineInterface = class CommandLineInterface {
    constructor() {
        this.parameters = [
            { name: 'resolvable', description: 'A GitHub repository URL or a local path.', optional: false },
            { name: 'target', description: 'The directory in which to apply the preset.', optional: true },
        ];
        this.options = [
            { definition: '-p, --path [path]', description: 'The path to a sub-directory in which to look for a preset.' },
            { definition: '-h, --help', description: 'Display this help message.' },
            { definition: '--no-interaction', description: 'Disable interactions.' },
            { definition: '--init', description: 'Initialize a preset.' },
            { definition: '-v', description: 'Define the verbosity level (eg. -vv).', type: [Boolean] },
            { definition: '--version', description: 'Display the version number.' },
        ];
    }
    /**
     * Runs the CLI.
     */
    async run(argv) {
        var _a, _b, _c;
        const { args, options } = this.parse(argv);
        const [resolvable, target] = args;
        // Registers the output, which is event-based
        this.output.register((_c = (_b = (_a = options.v) === null || _a === void 0 ? void 0 : _a.filter(Boolean)) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0);
        if (options.help) {
            exports_1.bus.emit(exports_1.outputHelp({ parameters: this.parameters, options: this.options }));
            return 0;
        }
        if (options.version) {
            exports_1.bus.emit(exports_1.outputVersion());
            return 0;
        }
        // Uses a preset shipped with the CLI, in the "init" directory at the root
        if (options.init) {
            this.bus.debug(`Initializing a preset.`);
            return await this.apply(path_1.default.join(__dirname, '..', '..', 'init'), args[0], options, args);
        }
        if (!resolvable) {
            this.bus.fatal('The resolvable is missing. Please consult the usage below.');
            exports_1.bus.emit(exports_1.outputHelp({ parameters: this.parameters, options: this.options }));
            return 1;
        }
        return await this.apply(resolvable, target, options, args);
    }
    async apply(resolvable, target, options, args) {
        return await this.applier
            .run({
            resolvable,
            options,
            target: exports_1.getAbsolutePath(target),
            args: [...args],
        })
            .then(() => 0)
            .catch((error) => {
            if (error instanceof exports_1.ExecutionError) {
                this.bus.fatal(error);
            }
            else {
                this.bus.fatal(new exports_1.ExecutionError(`An error occured while applying the preset.`).withCompleteStack(error).stopsExecution());
            }
            return 1;
        });
    }
    /**
     * Parses the command line arguments.
     */
    parse(argv) {
        const cli = cac_1.default(exports_1.getPackage().name);
        this.options.forEach(({ definition, description, type }) => cli.option(definition, description, { type }));
        return cli.parse(process.argv.splice(0, 2).concat(argv));
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Output),
    tslib_1.__metadata("design:type", Object)
], CommandLineInterface.prototype, "output", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Applier),
    tslib_1.__metadata("design:type", Object)
], CommandLineInterface.prototype, "applier", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], CommandLineInterface.prototype, "bus", void 0);
CommandLineInterface = tslib_1.__decorate([
    inversify_1.injectable()
], CommandLineInterface);
exports.CommandLineInterface = CommandLineInterface;
