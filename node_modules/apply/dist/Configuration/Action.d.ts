import { Preset, ContextAware } from "../exports";
/**
 * An action to be executed by the preset.
 *
 * @todo interactions
 */
export declare abstract class Action<Context = any> {
    abstract handler: string;
    abstract name: string;
    conditions: ContextAware<boolean, Context>[];
    title?: ContextAware<string | false, Context>;
    preset: Preset;
    constructor(preset: Preset);
    /**
     * Defines the condition required for the action to be run.
     */
    if(conditions: ContextAware<boolean, Context> | ContextAware<boolean, Context>[]): this;
    /**
     * Runs the action only if the specified option equals the specified value.
     */
    ifOptionEquals(option: string, value?: any): this;
    /**
     * Runs the action only if the specified option is truthy.
     *
     * @deprecated Use `ifOption` instead.
     */
    ifHasOption(option: string): this;
    /**
     * Runs the action only if the specified option is truthy.
     */
    ifOption(option: string): this;
    /**
     * Runs the action only if the specified option is falsy.
     */
    ifNotOption(option: string): this;
    /**
     * Runs the action only if the specified prompt is truthy.
     */
    ifPrompt(prompt: string): this;
    /**
     * Runs the action only if the specified prompt is falsy.
     */
    ifNotPrompt(prompt: string): this;
    /**
     * Runs the action only if the --no-interaction flag is not given.
     */
    ifInteractive(): this;
    /**
     * Runs the action only if the target directory is a Git repository.
     */
    ifRepository(): this;
    /**
     * Runs the action only if the target directory is not a Git repository.
     */
    ifNotRepository(): this;
    /**
     * Runs the action only if the target directory is empty.
     */
    ifDirectoryEmpty(): this;
    /**
     * Runs the action only if the target directory is not empty.
     */
    ifDirectoryNotEmpty(): this;
    /**
     * Sets the title of the action.
     */
    withTitle(title?: ContextAware<string | false, Context>): this;
    /**
     * Hides the title of the action.
     */
    withoutTitle(): this;
}
