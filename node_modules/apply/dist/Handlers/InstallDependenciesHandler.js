"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallDependenciesHandler = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let InstallDependenciesHandler = class InstallDependenciesHandler {
    constructor() {
        this.name = exports_1.Name.Handler.InstallDependencies;
        this.ecosystems = {
            node: this.installNodeDependencies,
            php: this.installPhpDependencies,
        };
        this.nodePackageManagers = [
            {
                bin: 'yarn',
                lockFile: 'yarn.lock',
                args: ['install'],
                check: ['yarn', ['-v']],
            },
            {
                bin: 'npm',
                lockFile: 'package-lock.json',
                args: ['install'],
                check: ['npm', ['-v']],
            },
        ];
    }
    async handle(action, applierOptions) {
        if (!Object.keys(this.ecosystems).includes(action.ecosystem)) {
            throw new exports_1.ExecutionError() //
                .withMessage(`Unsupported ecosystem ${exports_1.color.magenta(action.ecosystem)}.`)
                .withoutStack()
                .stopsExecution();
        }
        // Asks the user before installing dependencies, except if
        // the preset is running in non-interactive mode.
        if (action.shouldAsk && action.preset.isInteractive()) {
            const shouldInstall = await this.prompt.toggle(`Do you want to update your ${exports_1.color.magenta(action.ecosystem)} dependencies?`, ['yes', 'no'], { default: true });
            if (!shouldInstall) {
                this.bus.debug(`User chose not to install their ${exports_1.color.magenta(action.ecosystem)} dependencies.`);
                return;
            }
        }
        this.applierOptions = applierOptions;
        try {
            await this.ecosystems[action.ecosystem].call(this);
        }
        catch (error) {
            if (error instanceof exports_1.ExecutionError) {
                throw error;
            }
            throw new exports_1.ExecutionError() //
                .withMessage(`Could not install dependencies for the ${exports_1.color.magenta(action.ecosystem)} ecosystem.`)
                .withCompleteStack(error)
                .stopsExecution();
        }
    }
    /**
     * Installs the dependencies with the correct package manager.
     */
    async installNodeDependencies() {
        const managers = [];
        // Filters the available managers.
        for (const manager of this.nodePackageManagers) {
            try {
                if (await exports_1.execute(this.applierOptions.target, ...manager.check)) {
                    managers.push(manager);
                }
            }
            catch (_a) {
                this.bus.debug(`${exports_1.color.magenta(manager.bin)} is not available.`);
            }
        }
        // Checks if at least one package manager is installed.
        if (managers.length === 0) {
            throw new exports_1.ExecutionError() //
                .withMessage(`Please install one of the following package managers: ${this.nodePackageManagers.map(({ bin }) => bin).join(', ')}.`)
                .withoutStack()
                .stopsExecution();
        }
        // Loops through the installed managers's lockfile and
        // use the corresponding manager if found
        for (const { bin, args, lockFile } of managers) {
            if (fs_extra_1.default.pathExistsSync(path_1.default.join(this.applierOptions.target, lockFile))) {
                await exports_1.execute(this.applierOptions.target, bin, args);
                return;
            }
        }
        // If no lockfile was found, install the dependencies with the first
        // manager of the list, which is ordered by likeliness or preference.
        const { bin, args } = managers.shift();
        await exports_1.execute(this.applierOptions.target, bin, args);
    }
    /**
     * Installs the dependencies for the PHP ecosystem, which is simpler because
     * there is only one package manager.
     */
    async installPhpDependencies() {
        const hasComposer = await exports_1.execute(this.applierOptions.target, 'composer', ['--version']).catch(() => false);
        if (!hasComposer) {
            throw new exports_1.ExecutionError() //
                .withMessage(`Can not install dependencies because ${exports_1.color.magenta('composer')} is not available.`)
                .withoutStack();
        }
        await exports_1.execute(this.applierOptions.target, 'composer', ['update', '-vv']);
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], InstallDependenciesHandler.prototype, "bus", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Prompt),
    tslib_1.__metadata("design:type", Object)
], InstallDependenciesHandler.prototype, "prompt", void 0);
InstallDependenciesHandler = tslib_1.__decorate([
    inversify_1.injectable()
], InstallDependenciesHandler);
exports.InstallDependenciesHandler = InstallDependenciesHandler;
