import { Action, ContextAware } from "../../exports";
/**
 * An action for editing a JSON file.
 */
export declare class EditJson<Context = any> extends Action {
    handler: "edit-json-handler";
    name: string;
    title: string;
    file?: ContextAware<string, Context>;
    json: ContextAware<any, Context>;
    pathsToDelete: ContextAware<string | string[], Context>[];
    /**
     * Sets the path to the file that will be edited.
     */
    setFile(file: ContextAware<string | 'package.json' | 'composer.json', Context>): this;
    /**
     * Deeply merges the given content into the JSON file.
     */
    merge(json?: ContextAware<any, Context>): EditJson<Context>;
    /**
     * Deletes the given paths from the JSON file.
     */
    delete(paths: ContextAware<string | string[], Context>): EditJson<Context>;
}
export declare class EditNodePackages extends EditJson {
    /**
     * Removes the given dependency from the dependency lists.
     */
    remove(dependencies: string | string[]): this;
    /**
     * Sets a property path of the package.json file.
     *
     * @example
     * Preset.editNodePackage()
     *   .set('author', 'Enzo Innocenzi')
     */
    set(key: string, value: any): this;
    /**
     * Adds a dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    add(dependency: string, version: string): this;
    /**
     * Adds a peer dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    addPeer(dependency: string, version: string): this;
    /**
     * Adds a dev dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    addDev(dependency: string, version: string): this;
}
export declare class EditPhpPackages extends EditJson {
    /**
     * Removes the given dependency from the dependency lists.
     */
    remove(dependencies: string | string[]): this;
    /**
     * Sets a property path of the package.json file.
     *
     * @example
     * Preset.editNodePackage()
     *   .set('author', 'Enzo Innocenzi')
     */
    set(key: string, value: any): this;
    /**
     * Adds a dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    add(dependency: string, version: string): this;
    /**
     * Adds a dev dependency.
     *
     * @param dependency The package name.
     * @param version The package version.
     */
    addDev(dependency: string, version: string): this;
}
