"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResolver = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const simple_git_1 = tslib_1.__importDefault(require("simple-git"));
const path_1 = tslib_1.__importDefault(require("path"));
const tmp_1 = tslib_1.__importDefault(require("tmp"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const exports_1 = require("@/exports");
let DefaultResolver = class DefaultResolver {
    async resolve(initialResolvable, initalOptions) {
        this.bus.debug(`Resolving ${exports_1.color.magenta(initialResolvable)}.`);
        const { resolvable, options } = await this.aliasResolver.resolve(initialResolvable, initalOptions);
        const locators = [
            exports_1.container.getNamed(exports_1.Binding.Locator, exports_1.Name.DiskLocator),
            exports_1.container.getNamed(exports_1.Binding.Locator, exports_1.Name.GitLocator),
        ];
        for (const locator of locators) {
            this.bus.debug(`Trying the ${locator.name} locator...`);
            try {
                return await locator.locate(resolvable).then((preset) => this.persist(preset, options));
            }
            catch (error) {
                if (error.fatal) {
                    throw error;
                }
                this.bus.debug(`The ${locator.name} locator could not locate ${resolvable}.`);
            }
        }
        throw exports_1.ResolutionError.resolutionFailed(resolvable);
    }
    /**
     * Persists the resolved preset to the disk if needed.
     */
    async persist(preset, options) {
        var _a, _b;
        // Local presets are not temporary
        if (preset.type === 'local') {
            this.ensureSubdirectoryExists(preset.path, options.path, false);
            return {
                path: path_1.default.join(preset.path, (_a = options.path) !== null && _a !== void 0 ? _a : ''),
                temporary: false,
            };
        }
        // Remote git-hosted presets
        if (preset.type === 'repository') {
            const absoluteLocalPath = await this.clone(preset, options);
            this.ensureSubdirectoryExists(absoluteLocalPath, options.path, true);
            return {
                path: path_1.default.join(absoluteLocalPath, (_b = options.path) !== null && _b !== void 0 ? _b : ''),
                temporary: true,
            };
        }
        throw new exports_1.ResolutionError() //
            .stopsExecution()
            .withMessage(`An unknown error occured while resolving the preset.`);
    }
    /**
     * Clones a repository from Git.
     */
    async clone(preset, options) {
        try {
            const cloneWithSsh = options.ssh === undefined ? preset.ssh : options.ssh;
            const temporary = tmp_1.default.dirSync();
            const repositoryUrl = cloneWithSsh
                ? `git@github.com:${preset.organization}/${preset.repository}.git`
                : `https://github.com/${preset.organization}/${preset.repository}`;
            this.bus.debug(`Cloning ${exports_1.color.magenta(repositoryUrl)}.`);
            // Clones the repository
            await simple_git_1.default()
                .clone(repositoryUrl, temporary.name, Object.assign({}, (preset.tag && { '--branch': preset.tag })))
                .then(() => this.bus.debug(`Cloned ${exports_1.color.magenta(repositoryUrl)} into ${exports_1.color.underline(temporary.name)}.`));
            return temporary.name;
        }
        catch (error) {
            // Forward the resolution error if purposely thrown.
            if (error instanceof exports_1.ResolutionError) {
                throw error;
            }
            // Throw a fatal resolution error if the clone failed.
            throw exports_1.ResolutionError.cloneFailed(preset, error);
        }
    }
    /**
     * Ensures that the subdirectory given by the user exists in the resolved preset directory.
     */
    ensureSubdirectoryExists(originalPath, subdirectory, temporary) {
        if (!subdirectory) {
            return;
        }
        const fullPath = path_1.default.join(originalPath, subdirectory !== null && subdirectory !== void 0 ? subdirectory : '');
        if (!fs_extra_1.default.pathExistsSync(fullPath) || !fs_extra_1.default.statSync(fullPath).isDirectory()) {
            if (temporary) {
                try {
                    this.bus.debug(`Deleting temporary directory at ${exports_1.color.underline(originalPath)}...`);
                    fs_extra_1.default.emptyDirSync(originalPath);
                    fs_extra_1.default.rmdirSync(originalPath);
                }
                catch (error) {
                    this.bus.warning('Could not remove temporary directory.');
                    this.bus.fatal(error);
                }
            }
            throw exports_1.ResolutionError.subdirectoryNotFound(subdirectory, originalPath);
        }
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], DefaultResolver.prototype, "bus", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.AliasResolver),
    tslib_1.__metadata("design:type", exports_1.AliasResolver)
], DefaultResolver.prototype, "aliasResolver", void 0);
DefaultResolver = tslib_1.__decorate([
    inversify_1.injectable()
], DefaultResolver);
exports.DefaultResolver = DefaultResolver;
