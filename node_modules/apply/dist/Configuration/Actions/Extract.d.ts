import { Action, ContextAware } from "../../exports";
export declare type ConflictHandlingStrategy = 'ask' | 'override' | 'skip';
/**
 * Copies files or directory from the preset to the target directory.
 */
export declare class Extract<Context = any> extends Action {
    handler: "extract-handler";
    name: string;
    title: string;
    strategy: ContextAware<ConflictHandlingStrategy, Context>;
    input: ContextAware<string | string[], Context>;
    target: ContextAware<string, Context>;
    shouldExtractDotfiles: ContextAware<boolean>;
    /**
     * Defines the files or directory to copy.
     */
    from(input?: ContextAware<string | string[], Context>): Extract<Context>;
    /**
     * Defines the target directory.
     */
    to(target: ContextAware<string, Context>): Extract<Context>;
    /**
     * Determines the behavior when a conflict (target already exists) is found.
     * - ask: Will ask in a prompt what to do.
     * - skip: Will skip these files.
     * - override: Will override these files.
     */
    whenConflict(strategy: ContextAware<ConflictHandlingStrategy, Context>): Extract<Context>;
    /**
     * Allows extractions of files and directories starting with a dot.`
     * Files ending with .dotfile are always renamed as dotfiles.
     */
    withDots(withDots?: ContextAware<boolean>): Extract<Context>;
}
