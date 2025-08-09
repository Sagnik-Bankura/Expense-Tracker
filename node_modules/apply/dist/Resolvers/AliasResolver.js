"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasResolver = void 0;
const tslib_1 = require("tslib");
const exports_1 = require("@/exports");
const ExecutionError_1 = require("@/Errors/ExecutionError");
const inversify_1 = require("inversify");
const cosmiconfig_1 = require("cosmiconfig");
let AliasResolver = class AliasResolver {
    constructor() {
        this.configuration = [{ type: 'namespace', organization: 'laravel-presets', alias: 'laravel' }];
    }
    async resolve(resolvable, options) {
        var _a, _b, _c, _d;
        const configuration = await this.readConfiguration();
        const namespace = (_a = resolvable.split(':')) === null || _a === void 0 ? void 0 : _a.shift();
        const repository = (_b = resolvable.split(':')) === null || _b === void 0 ? void 0 : _b.pop();
        // prettier-ignore
        const aliases = [
            ...await this.parseResolutionMapping(configuration),
            ...this.configuration,
        ];
        this.bus.debug(`Resolving ${exports_1.color.magenta(aliases.length.toString())} alias(es) for ${exports_1.color.magenta(resolvable)}.`);
        for (const entry of aliases) {
            // Matches actual aliases
            if (entry.type === 'preset' && entry.alias === resolvable) {
                this.bus.debug(`Found alias ${exports_1.color.magenta(entry.alias)} targetting ${exports_1.color.magenta(entry.preset)}.`);
                return {
                    resolvable: entry.preset,
                    options: {
                        path: (_c = options.path) !== null && _c !== void 0 ? _c : entry.path,
                        ssh: (_d = options.ssh) !== null && _d !== void 0 ? _d : entry.ssh,
                    },
                };
            }
            // Replaces namespace aliases
            if (entry.type === 'namespace' && entry.alias === namespace) {
                this.bus.debug(`Found namespace alias ${exports_1.color.magenta(entry.alias)} targetting organization ${exports_1.color.magenta(entry.organization)}.`);
                return {
                    resolvable: `${entry.organization}/${repository}`,
                    options,
                };
            }
        }
        return {
            resolvable,
            options,
        };
    }
    /**
     * Parses the configuration file.
     */
    async parseResolutionMapping(configuration) {
        if (!configuration) {
            return [];
        }
        const mapping = [];
        Object.entries(configuration).forEach(([namespace, value]) => {
            // If the value is a single string, this item is a namespace alias
            if (typeof value === 'string') {
                mapping.push({
                    type: 'namespace',
                    alias: namespace,
                    organization: value,
                });
                return;
            }
            // If the value is an object, there is a namespace nesting
            if (typeof value === 'object') {
                Object.entries(value).forEach(([alias, value]) => {
                    // If the value is a single string, this item is a simple preset alias
                    if (typeof value === 'string') {
                        mapping.push({
                            type: 'preset',
                            alias: `${namespace}:${alias}`,
                            preset: value,
                        });
                        return;
                    }
                    // If the value is an object, this item is an advanced preset alias
                    if (typeof value !== 'string') {
                        mapping.push({
                            type: 'preset',
                            alias: `${namespace}:${alias}`,
                            preset: value.preset,
                            path: value.path,
                            ssh: value.ssh,
                        });
                        return;
                    }
                    throw new ExecutionError_1.ExecutionError() //
                        .withMessage(`Global configuration file is invalid.`)
                        .recoverable();
                });
                return;
            }
            throw new ExecutionError_1.ExecutionError() //
                .withMessage(`Global configuration file is invalid.`)
                .recoverable();
        });
        return mapping;
    }
    /**
     * Reads the configuration file.
     */
    async readConfiguration() {
        const resolver = cosmiconfig_1.cosmiconfig('preset');
        const configuration = await resolver.search(this.path).catch(() => null);
        if ((configuration === null || configuration === void 0 ? void 0 : configuration.isEmpty) || !configuration) {
            this.bus.debug('No global configuration file found.');
            return;
        }
        this.bus.debug(`Configuration file found at ${exports_1.color.underline(configuration === null || configuration === void 0 ? void 0 : configuration.filepath)}.`);
        return configuration === null || configuration === void 0 ? void 0 : configuration.config;
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], AliasResolver.prototype, "bus", void 0);
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.AliasResolverPath),
    tslib_1.__metadata("design:type", String)
], AliasResolver.prototype, "path", void 0);
AliasResolver = tslib_1.__decorate([
    inversify_1.injectable()
], AliasResolver);
exports.AliasResolver = AliasResolver;
