"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Preset = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const path_1 = tslib_1.__importDefault(require("path"));
const exports_1 = require("@/exports");
/**
 * Create a preset.
 */
class Preset {
    constructor() {
        /**
         * The template directory.
         */
        this.templateDirectory = 'templates';
        /**
         * The list of actions.
         * You should not update it manually unless you know what you are doing.
         */
        this.actions = [];
        /**
         * The prompt results.
         */
        this.prompts = {};
        /**
         * The supplied command line options.
         */
        this.options = {};
        /**
         * The supplied command line arguments.
         */
        this.args = [];
    }
    /**
     * Checks if the preset instance is interactive.
     */
    isInteractive() {
        return process.stdout.isTTY && this.options.interaction !== false;
    }
    /**
     * Checks if the target directory is a Git repository.
     */
    isRepository() {
        return fs_extra_1.default.existsSync(path_1.default.join(this.targetDirectory, '.git'));
    }
    /**
     * Checks if the target directory is empty.
     */
    isTargetDirectoryEmpty() {
        return fs_extra_1.default.readdirSync(path_1.default.resolve(this.targetDirectory)).length === 0;
    }
    /**
     * Registers a default value for an option.
     */
    option(key, value) {
        this.options[key] = value;
        return this;
    }
    /**
     * Groups a set of instructions together.
     *
     * @example
     * Preset.group((preset) => {
     * 	preset.edit('AppServiceProvider.php')
     * 		.find(/use Illuminate\\Support\\ServiceProvider;/)
     * 		.addAfter('use Illuminate\\Pagination\\Paginator;');
     *
     * 	preset.edit('AppServiceProvider.php') //
     * 		.find('public function boot')
     * 		.addAfter('Paginator::useTailwind();')
     * 		.withIndent('double')
     * 		.skipLines(1);
     * }).withTitle('Updating AppServiceProvider...');
     */
    group(callback) {
        return this.addAction(new exports_1.Group(this).chain(callback));
    }
    /**
     * Adds instructions to be displayed at the end of the installation of the preset.
     */
    instruct(messages = []) {
        this.instructions = new exports_1.Instruct().to(messages);
        return this.instructions;
    }
    /**
     * Sets the name of the preset.
     */
    setName(name) {
        this.name = name;
        return this;
    }
    /**
     * Sets the template directory.
     */
    setTemplateDirectory(templateDirectory) {
        this.templateDirectory = templateDirectory;
        return this;
    }
    /**
     * Adds the given action.
     */
    addAction(action) {
        this.actions.push(action);
        return action;
    }
    /**
     * Applies the given preset.
     *
     * @example
     * // Applies the Laravel "tailwindcss" community preset
     * Preset.apply('laravel:tailwindcss')
     */
    apply(resolvable) {
        return this.addAction(new exports_1.ApplyPreset(this).apply(resolvable));
    }
    /**
     * Extracts files or directories from the preset's template directory to the target directory.
     *
     * @example
     * // extracts preset's auth templates to target's root
     * Preset.extract('auth')
     * @example
     * // extracts preset's php files to target's root
     * Preset.extract('*.php')
     * @example
     * // extracts index.php to target's public directory
     * Preset.extract('index.php')
     * @example
     * // extracts gitignore.dotfile to target's root as .gitignore
     * Preset.extract('gitignore.dotfile')
     */
    extract(input = '') {
        return this.addAction(new exports_1.Extract(this).from(input));
    }
    /**
     * Deletes the given paths. They must be relative from the target directory.
     */
    delete(paths) {
        return this.addAction(new exports_1.Delete(this).setPaths(paths));
    }
    /**
     * Executes a shell command.
     *
     * @param command The program or command to execute.
     * @param args A list of arguments to pass to the program.
     *
     * @example
     * Preset.execute('echo', 'hello world')
     */
    execute(command, ...args) {
        return this.addAction(new exports_1.Execute(this).run(command).withArguments(args));
    }
    /**
     * Executes a custom command. Useful for storing custom context.
     */
    hook(callback) {
        return this.addAction(new exports_1.Hook(this).run(callback));
    }
    /**
     * Installs the dependencies for the given ecosystem (defaults to Node).
     *
     * @example
     * Preset.installDependencies('php')
     */
    installDependencies(ecosystem = 'node') {
        return this.addAction(new exports_1.InstallDependencies(this).for(ecosystem));
    }
    /**
     * An alias for `installDependencies`, since they are basically the same.
     *
     * @example
     * Preset.updateDependencies('node')
     */
    updateDependencies(ecosystem = 'node') {
        return this.installDependencies(ecosystem);
    }
    /**
     * Edits the given JSON file.
     *
     * @example
     * Preset.editJson('package.json')
     * 	.merge({
     * 		devDependencies: {
     * 			tailwindcss: '^2.0'
     * 		}
     * 	})
     * 	.delete(['devDependencies.bootstrap'])
     */
    editJson(file) {
        return this.addAction(new exports_1.EditJson(this)).setFile(file);
    }
    /**
     * Edits the package.json file.
     */
    editNodePackages() {
        return this.addAction(new exports_1.EditNodePackages(this)).setFile('package.json');
    }
    /**
     * Edits the composer.json file.
     */
    editPhpPackages() {
        return this.addAction(new exports_1.EditPhpPackages(this)).setFile('composer.json');
    }
    /**
     * Updates the environment file.
     */
    env(file = '.env') {
        return this.addAction(new exports_1.EditEnv(this).update(file));
    }
    /**
     * Updates the environment file with the given values.
     */
    setEnv(key, value, file = '.env') {
        return this.env(file).set(key, value);
    }
    /**
     * Asks the user for something.
     *
     * @param name The value name that will be set in the prompts property.
     * @param message The question to ask.
     * @param initial The default value.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    input(name, message, initial, options = {}) {
        return this.addAction(new exports_1.Prompt(this).input(name, message, initial, options));
    }
    /**
     * Asks the user for information.
     */
    prompt() {
        return this.addAction(new exports_1.Prompt(this));
    }
    /**
     * Asks the user for confirmation.
     *
     * @param name The value name that will be set in the prompts property.
     * @param message The question to ask.
     * @param initial The default value.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    confirm(name, message, initial = false, options = {}) {
        return this.addAction(new exports_1.Prompt(this).confirm(name, message, initial, options));
    }
    /**
     * Asks the user for confirmation.
     *
     * @param name The value name that will be set in the prompts property.
     * @param message The question to ask.
     * @param choices A tuple which first value is the truthy one and the second the falsy.
     * @param initial The default value.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    toggle(name, message, choices, initial = false, options = {}) {
        return this.addAction(new exports_1.Prompt(this).toggle(name, message, choices, initial, options));
    }
    /**
     * Edits the given files.
     */
    edit(files) {
        return this.addAction(new exports_1.Edit(this).setFiles(files));
    }
}
exports.Preset = Preset;
