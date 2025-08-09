"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditEnv = void 0;
const exports_1 = require("@/exports");
/**
 * An action for updating a dotenv file.
 */
class EditEnv extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.EditEnv;
        this.name = 'modification of environment files';
        this.title = 'Updating environment files...';
        this.file = '.env';
        this.setters = new Map();
        this.shouldCreate = true;
    }
    /**
     * Defines the environment file to update.
     */
    update(file) {
        this.file = file;
        return this;
    }
    /**
     * Creates the specified environent file if it's missing.
     */
    createIfMissing(shouldCreate = true) {
        this.shouldCreate = shouldCreate;
        return this;
    }
    /**
     * Do not create the file if it's missing.
     */
    skipIfMissing() {
        this.shouldCreate = false;
        return this;
    }
    /**
     * Sets the given key in the environment file to the given value.
     *
     * @example
     * Preset.setEnv('APP_URL', (env) => env.APP_URL.replace('http:', 'https:')));
     */
    set(key, value) {
        this.setters.set(key, value);
        return this;
    }
}
exports.EditEnv = EditEnv;
