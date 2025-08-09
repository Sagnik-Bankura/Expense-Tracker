"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.color = exports.execute = exports.wrap = exports.contextualizeObject = exports.contextualizeValue = exports.getPreset = exports.cachePreset = exports.getVersion = exports.getPackage = exports.getAbsolutePath = void 0;
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const cliui_1 = require("@poppinss/cliui");
const execa_1 = tslib_1.__importDefault(require("execa"));
const exports_1 = require("@/exports");
const cache = {
    packageContent: null,
    preset: {},
};
/**
 * Gets the absolute path for the given directory.
 * If empty or relative, the current working directory is prepended.
 *
 * @param directory A path. Can be null.
 */
function getAbsolutePath(directory = process.cwd()) {
    return path_1.default.isAbsolute(directory) ? directory : path_1.default.join(process.cwd(), directory);
}
exports.getAbsolutePath = getAbsolutePath;
/**
 * Gets the content of the package.json file.
 */
function getPackage() {
    if (!cache.packageContent) {
        cache.packageContent = fs_extra_1.default.readJsonSync(path_1.default.join(__dirname, '../../package.json'));
    }
    return cache.packageContent;
}
exports.getPackage = getPackage;
/**
 * Gets a string with the CLI name, its version and the current platform.
 */
function getVersion() {
    const { name, version } = getPackage();
    return `${name}/${version} ${process.platform}-${process.arch} node-${process.version}`;
}
exports.getVersion = getVersion;
function cachePreset(id, preset) {
    cache.preset[id] = preset;
    return preset;
}
exports.cachePreset = cachePreset;
function getPreset(id) {
    return cache.preset[id];
}
exports.getPreset = getPreset;
/**
 * Checks if the value can be contextualized.
 */
function canBeContextualized(value) {
    var _a, _b, _c;
    return Boolean(((_a = value) === null || _a === void 0 ? void 0 : _a.constructor) && ((_b = value) === null || _b === void 0 ? void 0 : _b.call) && ((_c = value) === null || _c === void 0 ? void 0 : _c.apply));
}
/**
 * Contextualizes the given context aware value.
 */
function contextualizeValue(preset, value) {
    if (canBeContextualized(value)) {
        return value(getPreset(preset.presetDirectory));
    }
    return value;
}
exports.contextualizeValue = contextualizeValue;
/**
 * Contextualizes every contextualizable property on the given action.
 */
function contextualizeObject(preset, action) {
    const result = Object.entries(action)
        .map(([name, value]) => ({ [name]: contextualizeValue(preset, value) }))
        .reduce((acc, val) => (Object.assign(Object.assign({}, acc), val)), {});
    return result;
}
exports.contextualizeObject = contextualizeObject;
/**
 * Wraps the thing in an array if it's not already.
 */
function wrap(thing) {
    if (!thing) {
        return [];
    }
    if (!Array.isArray(thing)) {
        thing = [thing];
    }
    return thing;
}
exports.wrap = wrap;
/**
 * Executes the given command.
 */
async function execute(cwd, command, args = [], options = {}) {
    var _a;
    const log = [];
    const result = execa_1.default(command, args, Object.assign({ cwd, all: true }, options));
    (_a = result.all) === null || _a === void 0 ? void 0 : _a.on('data', (data) => {
        const bus = exports_1.container.get(exports_1.Binding.Bus);
        const lines = Buffer.from(data)
            .toString('utf-8')
            .split('\n')
            .filter((line) => line.trim().length > 0);
        lines.forEach((line) => {
            line = line.replace('\r', '');
            log.push(line);
            bus.debug(exports.color.gray(line));
        });
    });
    await result;
    return log;
}
exports.execute = execute;
exports.color = cliui_1.logger.colors;
