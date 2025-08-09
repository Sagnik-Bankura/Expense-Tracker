"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bus = exports.Bus = exports.outputInstructions = exports.outputMessage = exports.outputHelp = exports.outputVersion = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const ts_bus_1 = require("ts-bus");
/*
|--------------------------------------------------------------------------
| Definitions
|--------------------------------------------------------------------------
*/
/**
 * An event definition for displaying the current version.
 */
exports.outputVersion = ts_bus_1.createEventDefinition()('output:version');
/**
 * An event definition for displaying help usage.
 */
exports.outputHelp = ts_bus_1.createEventDefinition()('output:help');
/**
 * An event definition for logging a generic informational message.
 */
exports.outputMessage = ts_bus_1.createEventDefinition()('output:message');
/**
 * An event definition for logging a instruction messages.
 */
exports.outputInstructions = ts_bus_1.createEventDefinition()('output:instructions');
/*
|--------------------------------------------------------------------------
| Bus
|--------------------------------------------------------------------------
*/
/**
 * The application's event bus.
 */
let Bus = class Bus {
    constructor() {
        this.bus = new ts_bus_1.EventBus();
    }
    /**
     * Emits the given event.
     */
    emit(event, meta) {
        this.bus.publish(event, meta);
        return this;
    }
    /**
     * Adds an handler for the given event.
     */
    on(ev, handler) {
        this.bus.subscribe(ev, handler);
        return this;
    }
    /**
     * Emits a generic message event.
     */
    log(level, content) {
        return this.emit(exports.outputMessage({ level, content }));
    }
    /**
     * Emits a message event of type fatal.
     */
    fatal(content) {
        return this.log('fatal', content);
    }
    /**
     * Emits a message event of type warning.
     */
    warning(content) {
        return this.log('fatal', content);
    }
    /**
     * Emits a message event of type success.
     */
    success(content) {
        return this.log('success', content);
    }
    /**
     * Emits a message event of type info.
     */
    info(content) {
        return this.log('info', content);
    }
    /**
     * Emits a message event of type debug.
     */
    debug(content) {
        return this.log('debug', content);
    }
    /**
     * Outputs instructions.
     */
    instruct(instructions, heading) {
        return this.emit(exports.outputInstructions({ heading, instructions }));
    }
};
Bus = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], Bus);
exports.Bus = Bus;
/**
 * The singleton bus instance.
 */
exports.bus = new Bus();
