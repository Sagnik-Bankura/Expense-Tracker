"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditPhpPackages = exports.EditNodePackages = exports.EditJson = void 0;
const exports_1 = require("@/exports");
const utils_1 = require("@/Support/utils");
/**
 * An action for editing a JSON file.
 */
class EditJson extends exports_1.Action {
    constructor() {
        super(...arguments);
        this.handler = exports_1.Name.Handler.EditJson;
        this.name = 'JSON file edition';
        this.title = 'Updating JSON file...';
        this.json = {};
        this.pathsToDelete = [];
    }
    /**
     * Sets the path to the file that will be edited.
     */
    setFile(file) {
        this.file = file;
        return this;
    }
    /**
     * Deeply merges the given content into the JSON file.
     */
    merge(json = {}) {
        this.json = json;
        return this;
    }
    /**
     * Deletes the given paths from the JSON file.
     */
    delete(paths) {
        this.pathsToDelete.push(paths);
        return this;
    }
}
exports.EditJson = EditJson;
class EditNodePackages extends EditJson {
    /**
     * Removes the given dependency from the dependency lists.
     */
    remove(dependencies) {
        utils_1.wrap(dependencies).forEach((dependency) => {
            this.pathsToDelete.push([`devDependencies.${dependency}`, `peerDependencies.${dependency}`, `dependencies.${dependency}`]);
        });
        return this;
    }
    /**
     * Sets a property path of the package.json file.
     *
     * @example
     * Preset.editNodePackage()
     *   .set('author', 'Enzo Innocenzi')
     */
    set(key, value) {
        this.json[key] = value;
        return this;
    }
    /**
     * Adds a dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    add(dependency, version) {
        this.json.dependencies = Object.assign(Object.assign({}, this.json.dependencies), { [dependency]: version });
        return this;
    }
    /**
     * Adds a peer dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    addPeer(dependency, version) {
        this.json.peerDependencies = Object.assign(Object.assign({}, this.json.peerDependencies), { [dependency]: version });
        return this;
    }
    /**
     * Adds a dev dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    addDev(dependency, version) {
        this.json.devDependencies = Object.assign(Object.assign({}, this.json.devDependencies), { [dependency]: version });
        return this;
    }
}
exports.EditNodePackages = EditNodePackages;
class EditPhpPackages extends EditJson {
    /**
     * Removes the given dependency from the dependency lists.
     */
    remove(dependencies) {
        utils_1.wrap(dependencies).forEach((dependency) => {
            this.pathsToDelete.push([`require.${dependency}`, `require-dev.${dependency}`]);
        });
        return this;
    }
    /**
     * Sets a property path of the package.json file.
     *
     * @example
     * Preset.editNodePackage()
     *   .set('author', 'Enzo Innocenzi')
     */
    set(key, value) {
        this.json[key] = value;
        return this;
    }
    /**
     * Adds a dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    add(dependency, version) {
        this.json.require = Object.assign(Object.assign({}, this.json.require), { [dependency]: version });
        return this;
    }
    /**
     * Adds a dev dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    addDev(dependency, version) {
        this.json['require-dev'] = Object.assign(Object.assign({}, this.json['require-dev']), { [dependency]: version });
        return this;
    }
}
exports.EditPhpPackages = EditPhpPackages;
