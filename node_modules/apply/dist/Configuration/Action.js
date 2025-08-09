"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Action = void 0;
/**
 * An action to be executed by the preset.
 *
 * @todo interactions
 */
class Action {
    constructor(preset) {
        this.conditions = [];
        this.preset = preset;
        this.if(true);
    }
    /**
     * Defines the condition required for the action to be run.
     */
    if(conditions) {
        if (!Array.isArray(conditions)) {
            conditions = [conditions];
        }
        this.conditions.push(...conditions);
        return this;
    }
    /**
     * Runs the action only if the specified option equals the specified value.
     */
    ifOptionEquals(option, value) {
        return this.if(({ options }) => options[option] === value);
    }
    /**
     * Runs the action only if the specified option is truthy.
     *
     * @deprecated Use `ifOption` instead.
     */
    ifHasOption(option) {
        return this.ifOption(option);
    }
    /**
     * Runs the action only if the specified option is truthy.
     */
    ifOption(option) {
        return this.if(({ options }) => Boolean(options[option]));
    }
    /**
     * Runs the action only if the specified option is falsy.
     */
    ifNotOption(option) {
        return this.if(({ options }) => !Boolean(options[option]));
    }
    /**
     * Runs the action only if the specified prompt is truthy.
     */
    ifPrompt(prompt) {
        return this.if(({ prompts }) => Boolean(prompts[prompt]));
    }
    /**
     * Runs the action only if the specified prompt is falsy.
     */
    ifNotPrompt(prompt) {
        return this.if(({ prompts }) => !Boolean(prompts[prompt]));
    }
    /**
     * Runs the action only if the --no-interaction flag is not given.
     */
    ifInteractive() {
        return this.if((preset) => preset.isInteractive());
    }
    /**
     * Runs the action only if the target directory is a Git repository.
     */
    ifRepository() {
        return this.if((preset) => preset.isRepository());
    }
    /**
     * Runs the action only if the target directory is not a Git repository.
     */
    ifNotRepository() {
        return this.if((preset) => !preset.isRepository());
    }
    /**
     * Runs the action only if the target directory is empty.
     */
    ifDirectoryEmpty() {
        return this.if((preset) => preset.isTargetDirectoryEmpty());
    }
    /**
     * Runs the action only if the target directory is not empty.
     */
    ifDirectoryNotEmpty() {
        return this.if((preset) => !preset.isTargetDirectoryEmpty());
    }
    /**
     * Sets the title of the action.
     */
    withTitle(title) {
        this.title = title !== null && title !== void 0 ? title : this.title;
        return this;
    }
    /**
     * Hides the title of the action.
     */
    withoutTitle() {
        this.title = false;
        return this;
    }
}
exports.Action = Action;
