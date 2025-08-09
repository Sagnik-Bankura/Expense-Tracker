"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolutionError = void 0;
const exports_1 = require("@/exports");
class ResolutionError extends exports_1.ExecutionError {
    static localSubdirectoryNotFound(subdirectory) {
        return new ResolutionError() //
            .withMessage(`Subdirectory ${exports_1.color.underline(subdirectory)} does not exist in specified directory.`)
            .recoverable();
    }
    static localDirectoryNotFound(directory) {
        return new ResolutionError() //
            .withMessage(`${exports_1.color.underline(directory)} is not a local directory.`)
            .recoverable();
    }
    static subdirectoryNotFound(subdirectory, path) {
        return new ResolutionError() //
            .withMessage(`Subdirectory ${exports_1.color.underline(subdirectory)} does not exist in ${exports_1.color.underline(path)}.`)
            .recoverable();
    }
    static notRepository(resolvable) {
        return new ResolutionError() //
            .withMessage(`${exports_1.color.underline(resolvable)} is not a GitHub repository.`)
            .recoverable();
    }
    static notCommunityOrganization(resolvable) {
        return new ResolutionError() //
            .withMessage(`${exports_1.color.underline(resolvable)} is not a GitHub community organization.`)
            .recoverable();
    }
    static communityOrganizationNotFound(shorthand) {
        return new ResolutionError() //
            .withMessage(`The community organization ${exports_1.color.magenta(shorthand)} is not registered.`)
            .stopsExecution();
    }
    static resolutionFailed(resolvable) {
        return new ResolutionError() //
            .stopsExecution()
            .withMessage(`${exports_1.color.magenta(resolvable)} could not be resolved.`)
            .withoutStack();
    }
    static cloneFailed(preset, error) {
        var _a, _b, _c;
        const repository = exports_1.color.magenta(`${preset.organization}/${preset.repository}`);
        if ((_a = error.stack) === null || _a === void 0 ? void 0 : _a.includes('Remote branch')) {
            return new ResolutionError()
                .stopsExecution()
                .withMessage(`The ${exports_1.color.magenta((_b = preset.tag) !== null && _b !== void 0 ? _b : '<undefined>')} branch does not exist in the remote repository.`)
                .withoutStack();
        }
        if ((_c = error.stack) === null || _c === void 0 ? void 0 : _c.includes('Permission denied (publickey)')) {
            return new ResolutionError()
                .stopsExecution()
                .withMessage(`Access to ${exports_1.color.magenta(repository)} denied.`, `If you think it's an error, make sure you have an SSH key set up and linked to your Git account.`, `If the repository is public and you don't want to configure SSH, use the ${exports_1.color.magenta('--no-ssh')} flag.`)
                .withoutStack();
        }
        if (['fatal: could not read Username', 'ERROR: Repository not found'].some((message) => { var _a; return (_a = error.stack) === null || _a === void 0 ? void 0 : _a.includes(message); })) {
            return new ResolutionError()
                .stopsExecution()
                .withMessage(`Repository ${repository} could not be found. Make sure it exists and you have read access to it.`)
                .withoutStack();
        }
        return new ResolutionError() //
            .stopsExecution()
            .withMessage(`Could not clone ${repository}.`)
            .withStack(error.stack);
    }
}
exports.ResolutionError = ResolutionError;
