"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Prompt = void 0;
const exports_1 = require("@/exports");
/**
 * Prompts the user for information.
 */
class Prompt extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Prompt;
        this.name = 'prompt';
        this.title = false;
        this.prompts = new Map();
    }
    /**
     * Adds a prompt for the user.
     *
     * @param name The variable in which the prompt result will be stored.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    add(name, options = {}) {
        this.prompts.set(name, options);
        return this;
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
        return this.add(name, Object.assign({ type: 'input', initial,
            message }, options));
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
        return this.add(name, Object.assign({ type: 'confirm', initial,
            message }, options));
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
        return this.add(name, Object.assign({ 
            // @ts-ignore // I have no clue
            type: 'toggle', initial,
            message, enabled: choices[0], disabled: choices[1] }, options));
    }
}
exports.Prompt = Prompt;
