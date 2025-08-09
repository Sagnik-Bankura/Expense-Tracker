"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitLocator = void 0;
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
let GitLocator = class GitLocator {
    constructor() {
        this.name = 'Git';
    }
    async locate(resolvable) {
        const result = this.resolveGitHubUrl(resolvable);
        if (!result) {
            throw exports_1.ResolutionError.notRepository(resolvable);
        }
        return result;
    }
    /**
     * Resolves the short syntax for GitHub.
     *
     * @example organization/repository
     * @example organization/repository(at)tag
     * @example git(at)github.com:organization/repository
     */
    resolveGitHubUrl(resolvable) {
        var _a, _b;
        const regexes = [
            /^([a-zA-Z][\w-]+)\/([a-zA-Z][\w-]+)(?:@([\w-\.]+))?$/,
            /^git@github\.com:([a-zA-Z][\w-]+)\/([a-zA-Z][\w-]+)(?:\.git)?(?:@([\w-\.]+))?$/,
            /^https?:\/\/(?:www\.)?github\.com\/([a-zA-Z][\w-]+)\/([a-zA-Z][\w-]+)(?:\.git)?(?:@([\w-\.]+))?/,
        ];
        // prettier-ignore
        return (_b = (_a = regexes
            .map((regex) => {
            var _a;
            const [matches, organization, repository, tag] = (_a = resolvable.match(regex)) !== null && _a !== void 0 ? _a : [];
            if (!matches) {
                return false;
            }
            const result = {
                type: 'repository',
                organization,
                repository,
                tag,
                ssh: !resolvable.includes('http')
            };
            this.bus.debug(`Resolved Git repository: ${exports_1.color.gray(JSON.stringify(result))}.`);
            return result;
        })
            .filter(Boolean)) === null || _a === void 0 ? void 0 : _a.shift()) !== null && _b !== void 0 ? _b : false;
    }
};
tslib_1.__decorate([
    inversify_1.inject(exports_1.Binding.Bus),
    tslib_1.__metadata("design:type", exports_1.Bus)
], GitLocator.prototype, "bus", void 0);
GitLocator = tslib_1.__decorate([
    inversify_1.injectable()
], GitLocator);
exports.GitLocator = GitLocator;
