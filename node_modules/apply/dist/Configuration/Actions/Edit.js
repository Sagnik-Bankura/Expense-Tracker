"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edit = exports.LineAddition = void 0;
const exports_1 = require("@/exports");
class LineAddition {
    constructor() {
        this.direction = 'above';
        this.amountOfLinesToSkip = 0;
        this.content = [];
    }
    /**
     * Sets the term of the search.
     *
     * @param search The search term. Can be a string or a regular expression.
     */
    find(search) {
        this.search = search;
        return this;
    }
    /**
     * Sets the direction in which to add the content.
     */
    setDirection(position) {
        this.direction = position;
        return this;
    }
    /**
     * Skips the given amount of lines before adding the content.
     */
    skipLines(amountOfLinesToSkip) {
        this.amountOfLinesToSkip = amountOfLinesToSkip;
        return this;
    }
    /**
     * Defines the content to add.
     */
    setContent(content) {
        this.content = content;
        return this;
    }
    /**
     * Defines the indentation of the content that will be added.
     * - null: detect the indentation of the previous
     * - double: detect the indentation of the previous and doubles it
     * - number: use the given amount of spaces
     * - string: use the given string to indent
     */
    withIndent(indent) {
        this.indent = indent;
        return this;
    }
}
exports.LineAddition = LineAddition;
/**
 * An action for updating a dotenv file.
 */
class Edit extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.Edit;
        this.name = 'modification of a file';
        this.title = 'Updating files...';
        this.edition = [];
        this.additions = [];
    }
    /**
     * Defines the files to update. Supports globs, but the globs ignore node_modules, vendors, and lock files.
     */
    setFiles(files) {
        this.files = files;
        return this;
    }
    /**
     * Updates the file content with the given callback.
     */
    update(callback) {
        this.edition.push(callback);
        return this;
    }
    /**
     * Replaces the given variable with the given content.
     *
     * @example
     * Preset.edit('File.stub')
     * 	.replaceVariables(({ options }) => ({
     * 		namespace: options.namespace
     * 	}))
     */
    replaceVariables(replacer) {
        this.edition.push((content, preset) => {
            if (typeof replacer === 'function') {
                replacer = replacer === null || replacer === void 0 ? void 0 : replacer(preset);
            }
            Object.entries(replacer).forEach(([variable, value]) => {
                content = content.split(`{{ ${variable} }}`).join(value);
            });
            return content;
        });
        return this;
    }
    /**
     * Adds the given content after the match.
     */
    addAfter(search, content) {
        const addition = new LineAddition() //
            .find(search)
            .setContent(content)
            .setDirection('below')
            .skipLines(0);
        this.additions.push(addition);
        return addition;
    }
    /**
     * Adds the given content before the match.
     */
    addBefore(search, content) {
        const addition = new LineAddition() //
            .find(search)
            .setContent(content)
            .setDirection('above')
            .skipLines(0);
        this.additions.push(addition);
        return addition;
    }
}
exports.Edit = Edit;
