"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractHandler = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const fast_glob_1 = tslib_1.__importDefault(require("fast-glob"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let ExtractHandler = class ExtractHandler {
    constructor() {
        this.name = exports_1.Name.Handler.Extract;
    }
    async handle(action, applierOptions) {
        if (!Array.isArray(action.input)) {
            action.input = [action.input];
        }
        this.action = action;
        this.applierOptions = applierOptions;
        for (const relativeTemplateOrGlob of action.input) {
            await this.extract(relativeTemplateOrGlob, action.target);
        }
    }
    /**
     * Extracts the given input to the given relative target.
     */
    async extract(relativeTemplateOrGlob, relativeTarget) {
        const templateBase = path_1.default.join(this.action.preset.presetDirectory, exports_1.contextualizeValue(this.action.preset, this.action.preset.templateDirectory));
        const templatePath = path_1.default.join(templateBase, relativeTemplateOrGlob);
        const targetBase = this.applierOptions.target;
        const targetPath = path_1.default.join(targetBase, relativeTarget);
        // If the input is a directory but the target is a file,
        // we cannot perform a copy.
        if (this.isDirectory(templatePath) && this.isFile(targetPath)) {
            throw new exports_1.ExecutionError() //
                .withMessage('A directory can not be extracted to a file.')
                .stopsExecution();
        }
        // If both the input and target are files, we can call the
        // copyFile method on them.
        if (this.isFile(templatePath) && this.isFile(targetPath)) {
            await this.copyFile(templatePath, targetPath);
            return;
        }
        // If the input is a file, we assume the target is a directory.
        if (this.isFile(templatePath)) {
            await this.copyFile(templatePath, path_1.default.join(targetPath, this.renameDotFile(relativeTemplateOrGlob)));
            return;
        }
        // If the input is a directory, we assume that the target is as well.
        if (this.isDirectory(templatePath)) {
            await this.extractDirectory(relativeTemplateOrGlob, relativeTarget);
            return;
        }
        // Lastly, assume the relative template is a glob.
        await this.extractDirectory('', relativeTarget, relativeTemplateOrGlob);
    }
    /**
     * Extracts the files in the given directory to the given target-relative directory.
     */
    async extractDirectory(relativeInputDirectory, relativeTargetDirectory, glob) {
        this.bus.debug(`Extracting templates in ${exports_1.color.magenta(`/${relativeInputDirectory}`)} to ${exports_1.color.magenta(`/${relativeTargetDirectory}`)}.`);
        const entries = await fast_glob_1.default(glob !== null && glob !== void 0 ? glob : '**/**', {
            dot: this.action.shouldExtractDotfiles,
            cwd: path_1.default.join(this.action.preset.presetDirectory, exports_1.contextualizeValue(this.action.preset, this.action.preset.templateDirectory), relativeInputDirectory),
        });
        this.bus.debug(`Found ${exports_1.color.magenta(entries.length.toString())} entries.`);
        for (const relativeFilePath of entries) {
            const targetDirectory = path_1.default.join(this.applierOptions.target, relativeTargetDirectory);
            fs_extra_1.default.ensureDirSync(targetDirectory);
            await this.extractTemplateFile(relativeFilePath, relativeInputDirectory, targetDirectory);
        }
    }
    /**
     * Copies the given relative file to the given target directory.
     */
    async extractTemplateFile(relativeFilePath, relativeInputDirectory, targetDirectory) {
        const targetFile = path_1.default.join(targetDirectory, this.renameDotFile(relativeFilePath));
        const inputFile = path_1.default.join(this.action.preset.presetDirectory, exports_1.contextualizeValue(this.action.preset, this.action.preset.templateDirectory), relativeInputDirectory, relativeFilePath);
        await this.copyFile(inputFile, targetFile);
    }
    /**
     * Copies the input file to the target file. Both are absolute paths.
     */
    async copyFile(inputFile, targetFile) {
        if (fs_extra_1.default.pathExistsSync(targetFile)) {
            // If the preset is not interactive, log
            if (this.action.strategy === 'ask' && !this.action.preset.isInteractive()) {
                this.bus.debug(`Silently overriding ${exports_1.color.magenta(targetFile)} since interactions are disabled.`);
            }
            // Ask, but only if interactions are not specifically disabled
            if (this.action.strategy === 'ask' && this.action.preset.isInteractive()) {
                const shouldReplace = await this.prompt.confirm(`${exports_1.color.magenta(targetFile)} already exists. Replace it?`, {
                    default: true,
                });
                if (!shouldReplace) {
                    this.bus.debug(`User chose not to replace ${exports_1.color.magenta(targetFile)}.`);
                    return;
                }
            }
            // Skip
            if (this.action.strategy === 'skip') {
                this.bus.debug(`Skipping copy to ${exports_1.color.magenta(targetFile)}.`);
                return;
            }
            // Override
            this.bus.debug(`Overriding ${exports_1.color.magenta(targetFile)}.`);
        }
        this.bus.debug(`Copying ${exports_1.color.magenta(inputFile)} to ${exports_1.color.magenta(targetFile)}.`);
        fs_extra_1.default.copySync(inputFile, targetFile);
    }
    /**
     * Renames a file.dotfile file into .file.
     */
    renameDotFile(input) {
        if (input.endsWith('.dotfile')) {
            // Input is a relative path, so the dot has to be added before the last slash.
            return input.includes('/')
                ? input.replace(/(.+\/)(.+).dotfile$/, (_, slash, file) => `${slash !== null && slash !== void 0 ? slash : ''}.${file}`)
                : input.replace(/^(.+)\.dotfile$/, (_, file) => `.${file}`);
        }
        return input;
    }
    /**
     * Checks if the input is a file.
     */
    isFile(input) {
        return fs_extra_1.default.existsSync(input) && fs_extra_1.default.statSync(input).isFile();
    }
    /**
     * Checks if the input is a directory.
     */
    isDirectory(input) {
        return fs_extra_1.default.existsSync(input) && fs_extra_1.default.statSync(input).isDirectory();
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], ExtractHandler.prototype, "bus", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Prompt),
    tslib_1.__metadata("design:type", Object)
], ExtractHandler.prototype, "prompt", void 0);
ExtractHandler = tslib_1.__decorate([
    inversify_1.injectable()
], ExtractHandler);
exports.ExtractHandler = ExtractHandler;
