"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instruct = void 0;
class Instruct {
    constructor() {
        this.messages = [];
    }
    /**
     * Defines the instruction table's heading.
     */
    withHeading(heading) {
        this.heading = heading;
        return this;
    }
    /**
     * Adds the given messages to the instruction set.
     */
    to(messages) {
        this.messages = messages;
        return this;
    }
}
exports.Instruct = Instruct;
