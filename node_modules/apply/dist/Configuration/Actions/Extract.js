"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Extract = void 0;
const exports_1 = require("@/exports");
/**
 * Copies files or directory from the preset to the target directory.
 */
class Extract extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Extract;
        this.name = 'template extraction';
        this.title = 'Extracting templates...';
        this.strategy = 'override';
        this.input = [];
        this.target = '';
        this.shouldExtractDotfiles = false;
    }
    /**
     * Defines the files or directory to copy.
     */
    from(input) {
        this.input = input !== null && input !== void 0 ? input : [];
        return this;
    }
    /**
     * Defines the target directory.
     */
    to(target) {
        this.target = target;
        return this;
    }
    /**
     * Determines the behavior when a conflict (target already exists) is found.
     * - ask: Will ask in a prompt what to do.
     * - skip: Will skip these files.
     * - override: Will override these files.
     */
    whenConflict(strategy) {
        this.strategy = strategy;
        return this;
    }
    /**
     * Allows extractions of files and directories starting with a dot.`
     * Files ending with .dotfile are always renamed as dotfiles.
     */
    withDots(withDots = true) {
        this.shouldExtractDotfiles = withDots;
        return this;
    }
}
exports.Extract = Extract;
