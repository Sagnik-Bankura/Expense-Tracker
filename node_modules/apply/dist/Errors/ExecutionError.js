"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionError = void 0;
class ExecutionError extends Error {
    constructor(message, fatal = false) {
        super(message);
        this.fatal = false;
        this.name = this.constructor.name;
        this.fatal = fatal;
    }
    stopsExecution(fatal = true) {
        this.fatal = fatal;
        return this;
    }
    recoverable(recoverable = true) {
        this.fatal = !recoverable;
        return this;
    }
    withCompleteStack(error) {
        this.stack = error.stack;
        if (error.message) {
            this.stack = `    ${error.message}\n${error.stack}`;
        }
        return this;
    }
    withStack(stack) {
        this.stack = stack;
        return this;
    }
    withoutStack() {
        this.stack = undefined;
        return this;
    }
    withMessage(...message) {
        this.message = message.join(' ');
        return this;
    }
}
exports.ExecutionError = ExecutionError;
