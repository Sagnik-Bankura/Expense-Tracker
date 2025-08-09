import { Action, ContextAware, Preset } from "../../exports";
export declare type EditionCallback = (content: string, preset: Preset) => string;
export declare class LineAddition<Context = any> {
    direction: 'above' | 'below';
    amountOfLinesToSkip: ContextAware<number>;
    search?: ContextAware<string | RegExp, Context>;
    content: ContextAware<string | string[], Context>;
    indent?: ContextAware<number | string | 'double', Context>;
    /**
     * Sets the term of the search.
     *
     * @param search The search term. Can be a string or a regular expression.
     */
    find(search?: ContextAware<string | RegExp, Context>): LineAddition<Context>;
    /**
     * Sets the direction in which to add the content.
     */
    setDirection(position: 'above' | 'below'): LineAddition<Context>;
    /**
     * Skips the given amount of lines before adding the content.
     */
    skipLines(amountOfLinesToSkip: ContextAware<number, Context>): LineAddition<Context>;
    /**
     * Defines the content to add.
     */
    setContent(content: ContextAware<string | string[], Context>): LineAddition<Context>;
    /**
     * Defines the indentation of the content that will be added.
     * - null: detect the indentation of the previous
     * - double: detect the indentation of the previous and doubles it
     * - number: use the given amount of spaces
     * - string: use the given string to indent
     */
    withIndent(indent: ContextAware<number | string | 'double', Context>): LineAddition<Context>;
}
/**
 * An action for updating a dotenv file.
 */
export declare class Edit<Context = any> extends Action {
    handler: "edit-handler";
    name: string;
    title: string;
    files?: ContextAware<string | string[], Context>;
    edition: EditionCallback[];
    additions: LineAddition[];
    /**
     * Defines the files to update. Supports globs, but the globs ignore node_modules, vendors, and lock files.
     */
    setFiles(files?: ContextAware<string | string[], Context>): Edit<Context>;
    /**
     * Updates the file content with the given callback.
     */
    update(callback: EditionCallback): Edit<Context>;
    /**
     * Replaces the given variable with the given content.
     *
     * @example
     * Preset.edit('File.stub')
     * 	.replaceVariables(({ options }) => ({
     * 		namespace: options.namespace
     * 	}))
     */
    replaceVariables(replacer: ContextAware<Record<string, string>, Context>): Edit<Context>;
    /**
     * Adds the given content after the match.
     */
    addAfter(search: ContextAware<string | RegExp, Context>, content: ContextAware<string | string[], Context>): LineAddition;
    /**
     * Adds the given content before the match.
     */
    addBefore(search: ContextAware<string | RegExp, Context>, content: ContextAware<string | string[], Context>): LineAddition;
}
