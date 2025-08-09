"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomPrompt = void 0;
const tslib_1 = require("tslib");
const enquirer_1 = tslib_1.__importDefault(require("enquirer"));
const Base_1 = require("@poppinss/prompts/build/src/Base");
const exports_1 = require("@/exports");
/**
 * Since the typings for `enquirer` package is badly broken, we
 * need to cast it to any to make it usable
 */
const enquirer = enquirer_1.default;
/**
 * Uses the `enquirer` package to prompt user for input. The `$prompt`
 * method is invoked by the extended `Prompt` class.
 */
class CustomPrompt extends Base_1.Prompt {
    async prompt(options) {
        options = Object.assign({ name: 'prompt' }, options);
        options.prefix = `[ ${exports_1.color.yellow('question')} ] `;
        const output = await enquirer.prompt(options);
        return output[options.name];
    }
}
exports.CustomPrompt = CustomPrompt;
