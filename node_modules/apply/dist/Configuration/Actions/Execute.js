"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Execute = void 0;
const exports_1 = require("@/exports");
class Execute extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Execute;
        this.name = 'command execution';
        this.title = 'Executing a command...';
        this.args = [];
        this.options = {};
    }
    /**
     * Executes the given command.
     */
    run(command) {
        this.command = command;
        return this;
    }
    /**
     * Defines the command line arguments to pass to the command.
     */
    withArguments(args) {
        this.args = args;
        return this;
    }
    /**
     * Defines the options to use.
     *
     * @see https://github.com/sindresorhus/execa#options
     */
    withOptions(options) {
        this.options = options;
        return this;
    }
}
exports.Execute = Execute;
