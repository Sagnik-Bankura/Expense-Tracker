import { CommonOptions } from 'execa';
import { Action, ContextAware } from "../../exports";
export declare class Execute<Context = any> extends Action<Context> {
    handler: "execute-command-handler";
    name: string;
    title: string;
    command?: ContextAware<string>;
    args: ContextAware<string | string[], Context>;
    options: ContextAware<CommonOptions<'utf8'>, Context>;
    /**
     * Executes the given command.
     */
    run(command: ContextAware<string, Context>): Execute<Context>;
    /**
     * Defines the command line arguments to pass to the command.
     */
    withArguments(args: ContextAware<string | string[], Context>): Execute<Context>;
    /**
     * Defines the options to use.
     *
     * @see https://github.com/sindresorhus/execa#options
     */
    withOptions(options: ContextAware<CommonOptions<'utf8'>, Context>): Execute<Context>;
}
