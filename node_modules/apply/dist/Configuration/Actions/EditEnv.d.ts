import { Action, ContextAware } from "../../exports";
export declare type EnvironmentAware<T> = ((env: Record<string, string>) => T) | T;
/**
 * An action for updating a dotenv file.
 */
export declare class EditEnv<Context = any> extends Action {
    handler: "edit-env-handler";
    name: string;
    title: string;
    file: ContextAware<string, Context>;
    setters: Map<string, EnvironmentAware<string>>;
    shouldCreate: ContextAware<boolean, Context>;
    /**
     * Defines the environment file to update.
     */
    update(file: ContextAware<string, Context>): EditEnv<Context>;
    /**
     * Creates the specified environent file if it's missing.
     */
    createIfMissing(shouldCreate?: ContextAware<boolean, Context>): EditEnv<Context>;
    /**
     * Do not create the file if it's missing.
     */
    skipIfMissing(): EditEnv<Context>;
    /**
     * Sets the given key in the environment file to the given value.
     *
     * @example
     * Preset.setEnv('APP_URL', (env) => env.APP_URL.replace('http:', 'https:')));
     */
    set(key: string, value: EnvironmentAware<string>): EditEnv<Context>;
}
