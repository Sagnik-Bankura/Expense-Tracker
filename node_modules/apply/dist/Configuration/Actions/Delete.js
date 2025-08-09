"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = void 0;
const exports_1 = require("@/exports");
/**
 * An action for deleting a file or directory in the target directory.
 */
class Delete extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Delete;
        this.name = 'deletion';
        this.title = 'Deleting files...';
        this.paths = [];
    }
    /**
     * Adds one or more paths to the list of paths to delete.
     */
    setPaths(paths) {
        this.paths = paths !== null && paths !== void 0 ? paths : [];
        return this;
    }
}
exports.Delete = Delete;
