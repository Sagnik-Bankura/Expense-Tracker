"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditEnvHandler = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const envfile_1 = require("envfile");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let EditEnvHandler = class EditEnvHandler {
    constructor() {
        this.name = exports_1.Name.Handler.EditEnv;
    }
    async handle(action, applierOptions) {
        const environmentFilePath = path_1.default.join(applierOptions.target, action.file);
        // Either skips or creates it if missing depending on the action configuration.
        if (!fs_extra_1.default.existsSync(environmentFilePath) && !action.shouldCreate) {
            this.bus.debug(`${exports_1.color.magenta(action.file)} does not exist. Skipping.`);
            return;
        }
        fs_extra_1.default.ensureFileSync(environmentFilePath);
        // Parses the content of the environment file.
        let contents = fs_extra_1.default.readFileSync(environmentFilePath, { encoding: 'utf-8' });
        const environment = envfile_1.parse(contents);
        // Adds the user-defined keys to the environement object.
        for (let [key, value] of action.setters) {
            if (typeof value !== 'string') {
                value = value(environment);
            }
            environment[key] = value;
        }
        const missing = [];
        for (const [key, value] of Object.entries(environment)) {
            // Checks if the base file has the current key.
            // If not, add it to the missing array so we can append it later.
            if (!contents.match(new RegExp(`${key} ?=`))) {
                missing.push(key);
                continue;
            }
            // Replaces the key in the file contents with the new value.
            contents = contents.replace(new RegExp(`${key} ?=.*`, 'gi'), `${key}=${String(value)}`);
        }
        // Adds the missing values.
        missing.forEach((key) => {
            contents += `\n${key}=${String(environment[key])}`;
        });
        // Writes back to the file.
        this.bus.debug(`Writing environment to ${exports_1.color.magenta(action.file)}.`);
        this.bus.debug(`Content: ${exports_1.color.gray(JSON.stringify(environment))}`);
        fs_extra_1.default.writeFileSync(environmentFilePath, contents, {
            encoding: 'utf-8',
        });
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], EditEnvHandler.prototype, "bus", void 0);
EditEnvHandler = tslib_1.__decorate([
    inversify_1.injectable()
], EditEnvHandler);
exports.EditEnvHandler = EditEnvHandler;
