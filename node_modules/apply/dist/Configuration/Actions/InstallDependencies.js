"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallDependencies = void 0;
const exports_1 = require("@/exports");
class InstallDependencies extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.InstallDependencies;
        this.name = 'dependency installation';
        this.title = 'Updating dependencies...';
        this.ecosystem = 'node';
        this.shouldAsk = false;
    }
    /**
     * Defines the ecosystem for which to install the dependencies.
     */
    for(ecosystem) {
        this.ecosystem = ecosystem;
        return this;
    }
    /**
     * Asks the user before installing.
     */
    ifUserApproves(shouldAsk = true) {
        this.shouldAsk = shouldAsk;
        return this;
    }
}
exports.InstallDependencies = InstallDependencies;
