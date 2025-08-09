"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskLocator = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let DiskLocator = class DiskLocator {
    constructor() {
        this.name = 'local';
    }
    async locate(resolvable) {
        var _a;
        try {
            if ((_a = fs_extra_1.default.statSync(resolvable)) === null || _a === void 0 ? void 0 : _a.isDirectory()) {
                return {
                    type: 'local',
                    path: resolvable,
                };
            }
        }
        catch (_b) { }
        throw exports_1.ResolutionError.localDirectoryNotFound(resolvable);
    }
};
DiskLocator = tslib_1.__decorate([
    inversify_1.injectable()
], DiskLocator);
exports.DiskLocator = DiskLocator;
