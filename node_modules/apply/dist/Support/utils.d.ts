import { CommonOptions } from 'execa';
import { ContextAware, Contextualized, Preset } from "../exports";
/**
 * Gets the absolute path for the given directory.
 * If empty or relative, the current working directory is prepended.
 *
 * @param directory A path. Can be null.
 */
export declare function getAbsolutePath(directory?: string): string;
/**
 * Gets the content of the package.json file.
 */
export declare function getPackage(): any;
/**
 * Gets a string with the CLI name, its version and the current platform.
 */
export declare function getVersion(): string;
export declare function cachePreset(id: string, preset: Preset): Preset;
export declare function getPreset(id: string): Preset;
/**
 * Contextualizes the given context aware value.
 */
export declare function contextualizeValue<T>(preset: Preset, value: ContextAware<T>): T;
/**
 * Contextualizes every contextualizable property on the given action.
 */
export declare function contextualizeObject<T extends {
    [key: string]: any;
}>(preset: Preset, action: T): Contextualized<T>;
/**
 * Wraps the thing in an array if it's not already.
 */
export declare function wrap<T>(thing: T | T[]): T[];
/**
 * Executes the given command.
 */
export declare function execute(cwd: string, command: string, args?: string[], options?: CommonOptions<'utf8'>): Promise<string[]>;
export declare const color: import("@poppinss/colors/build/src/Base").Colors;
