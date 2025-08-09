"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleOutput = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const cliui_1 = require("@poppinss/cliui");
const exports_1 = require("@/exports");
/**
 * This stuff may be greatly improved. It's not the priority though.
 */
let ConsoleOutput = class ConsoleOutput {
    async register(verbosity) {
        this.verbosity = verbosity;
        this.subscribe();
    }
    subscribe() {
        exports_1.bus.on(exports_1.outputVersion, this.displayVersion);
        exports_1.bus.on(exports_1.outputHelp, ({ payload: { options, parameters } }) => this.displayHelp(options, parameters));
        exports_1.bus.on(exports_1.outputMessage, ({ payload: { level, content } }) => this.log(level, content));
        exports_1.bus.on(exports_1.outputInstructions, ({ payload: { heading, instructions: instructionMessages } }) => {
            console.log();
            const instructionLogger = cliui_1.instructions();
            if (heading) {
                instructionLogger.heading(heading);
            }
            instructionMessages //
                .filter(Boolean)
                .forEach((instruction) => instructionLogger.add(instruction));
            instructionLogger.render();
        });
    }
    log(level, content) {
        if (level === 'debug' && this.verbosity < 1) {
            return;
        }
        if (content instanceof Error) {
            cliui_1.logger['fatal'](content);
        }
        else {
            cliui_1.logger[level](content);
        }
    }
    displayVersion() {
        console.log(exports_1.getVersion());
    }
    displayHelp(options, parameters) {
        // Gets the maximum length of a parameter or option
        // prettier-ignore
        const candidates = [
            ...options.map(({ definition }) => definition),
            ...parameters.map(({ name }) => name),
        ];
        const maxLength = Math.max(...candidates.map((item) => item.length));
        // Start with the usage
        const usageBlock = {
            title: 'Usage',
            body: `  $ ${exports_1.getPackage().name} ` +
                parameters
                    .map((parameter) => {
                    if (parameter.optional) {
                        return `[${parameter.name}]`;
                    }
                    return `<${parameter.name}>`;
                })
                    .join(' ') +
                ' [options]',
        };
        // Defines the parameters
        const parametersBlock = {
            title: 'Parameters',
            body: parameters
                .map((parameter) => {
                return `  ${parameter.name} ${' '.repeat(maxLength - parameter.name.length)} ${parameter.description}`;
            })
                .join('\n'),
        };
        // Defines the options
        const optionsBlock = {
            title: 'Options',
            body: options
                .map((option) => {
                return `  ${option.definition} ${' '.repeat(maxLength - option.definition.length)} ${option.description}`;
            })
                .join('\n'),
        };
        const usage = [usageBlock, parametersBlock, optionsBlock]
            .map((section) => {
            let output = '';
            if (section.title) {
                output += `${section.title}:\n`;
            }
            output += section.body + '\n';
            return output;
        })
            .join('\n');
        console.log(usage);
    }
};
ConsoleOutput = tslib_1.__decorate([
    inversify_1.injectable()
], ConsoleOutput);
exports.ConsoleOutput = ConsoleOutput;
