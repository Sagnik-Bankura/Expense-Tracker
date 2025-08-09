"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditHandler = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const fast_glob_1 = tslib_1.__importDefault(require("fast-glob"));
const detect_indent_1 = tslib_1.__importDefault(require("detect-indent"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let EditHandler = class EditHandler {
    constructor() {
        this.name = exports_1.Name.Handler.Edit;
    }
    async handle(action, applierOptions) {
        this.preset = action.preset;
        const relativeFileNames = exports_1.wrap(action.files)
            .map((globOrFileName) => fast_glob_1.default.sync(globOrFileName, {
            ignore: ['node_modules', 'vendors', 'yarn.lock', 'package-lock.json', '.git'],
            cwd: applierOptions.target,
            dot: true,
        }))
            .flat();
        // Loops through the given files.
        for (const fileName of relativeFileNames) {
            const filePath = path_1.default.join(applierOptions.target, fileName);
            // Ensures the file exists.
            if (!fs_extra_1.default.existsSync(filePath) || !fs_extra_1.default.statSync(filePath).isFile()) {
                this.bus.debug(`Skipping ${exports_1.color.magenta(filePath)} because it does not exist or is not a file.`);
                continue;
            }
            this.bus.debug(`Editing ${exports_1.color.magenta(filePath)}.`);
            let content = fs_extra_1.default.readFileSync(filePath, { encoding: 'utf-8' });
            // Performs the editions.
            action.edition.forEach((edition) => {
                var _a;
                content = (_a = edition === null || edition === void 0 ? void 0 : edition(content, action.preset)) !== null && _a !== void 0 ? _a : content;
            });
            // Performs line additions.
            for (const addition of action.additions) {
                content = await this.performLineAddition(content, addition);
            }
            this.bus.debug(`Writing back to ${exports_1.color.magenta(filePath)}.`);
            fs_extra_1.default.writeFileSync(filePath, content, { encoding: 'utf-8' });
        }
    }
    /**
     * Adds lines to the content.
     */
    async performLineAddition(content, addition) {
        const search = exports_1.contextualizeValue(this.preset, addition.search);
        const direction = exports_1.contextualizeValue(this.preset, addition.direction);
        const contentToAdd = exports_1.wrap(exports_1.contextualizeValue(this.preset, addition.content));
        const orderedContentToAdd = direction === 'above' ? contentToAdd.reverse() : contentToAdd;
        const additionIndent = exports_1.contextualizeValue(this.preset, addition.indent);
        const initialLines = direction === 'above' ? content.split('\n').reverse() : content.split('\n');
        const finalLines = [];
        let amountOfLinesBeforeAdding = exports_1.contextualizeValue(this.preset, addition.amountOfLinesToSkip);
        let previousLine = '';
        let hasMatch = false;
        if (!search || contentToAdd.length === 0) {
            return content;
        }
        this.bus.debug(`Adding ${exports_1.color.magenta(contentToAdd.length.toString())} line(s).`);
        // Loops through the line to determines what to do.
        for (const line of initialLines) {
            // Adds the line anyway.
            finalLines.push(line);
            previousLine = line;
            if (!line.match(search) && !hasMatch) {
                continue;
            }
            hasMatch = true;
            // Ensures this is the line at which we should do the addition.
            if (amountOfLinesBeforeAdding > 0) {
                amountOfLinesBeforeAdding--;
                continue;
            }
            // Adds the lines.
            hasMatch = false;
            orderedContentToAdd.forEach((lineToAdd) => {
                const { indent } = detect_indent_1.default(previousLine);
                // Automatic idents uses the indent from the previous line.
                if (!additionIndent) {
                    finalLines.push(indent + lineToAdd);
                    return;
                }
                // Double indent doubles the indent from the previous line.
                if (additionIndent === 'double') {
                    finalLines.push(indent.repeat(2) + lineToAdd);
                    return;
                }
                // A number uses the given amount of spaces.
                if (typeof additionIndent === 'number') {
                    finalLines.push(' '.repeat(additionIndent) + lineToAdd);
                    return;
                }
                // Otherwise, a custom indentation is used.
                finalLines.push(additionIndent + lineToAdd);
            });
        }
        return direction === 'above' ? finalLines.reverse().join('\n') : finalLines.join('\n');
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], EditHandler.prototype, "bus", void 0);
EditHandler = tslib_1.__decorate([
    inversify_1.injectable()
], EditHandler);
exports.EditHandler = EditHandler;
