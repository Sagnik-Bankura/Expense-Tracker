import { Action, ContextAware, PromptOptions } from "../../exports";
/**
 * Prompts the user for information.
 */
export declare class Prompt<Context = any> extends Action {
    handler: "prompt-handler";
    name: string;
    title: false;
    prompts: Map<string, Partial<PromptOptions>>;
    /**
     * Adds a prompt for the user.
     *
     * @param name The variable in which the prompt result will be stored.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    add(name: string, options?: Partial<PromptOptions>): Prompt<Context>;
    /**
     * Asks the user for something.
     *
     * @param name The value name that will be set in the prompts property.
     * @param message The question to ask.
     * @param initial The default value.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    input(name: string, message: ContextAware<string, Context>, initial?: ContextAware<string, Context>, options?: Partial<PromptOptions>): Prompt<Context>;
    /**
     * Asks the user for confirmation.
     *
     * @param name The value name that will be set in the prompts property.
     * @param message The question to ask.
     * @param initial The default value.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    confirm(name: string, message: ContextAware<string, Context>, initial?: ContextAware<boolean, Context>, options?: Partial<PromptOptions>): Prompt<Context>;
    /**
     * Asks the user for confirmation.
     *
     * @param name The value name that will be set in the prompts property.
     * @param message The question to ask.
     * @param choices A tuple which first value is the truthy one and the second the falsy.
     * @param initial The default value.
     * @param options The prompt options. https://github.com/enquirer/enquirer#prompt-options
     *
     * @see https://github.com/enquirer/enquirer#prompt-options
     */
    toggle(name: string, message: ContextAware<string, Context>, choices: [string, string], initial?: ContextAware<boolean, Context>, options?: Partial<PromptOptions>): Prompt<Context>;
}
