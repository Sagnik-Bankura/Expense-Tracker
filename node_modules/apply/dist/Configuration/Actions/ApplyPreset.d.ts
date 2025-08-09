import { Action, ContextAware } from "../../exports";
/**
 * An action for applying another preset.
 */
export declare class ApplyPreset<Context = any> extends Action {
    handler: "apply-preset-handler";
    name: string;
    title: string;
    resolvable?: ContextAware<string, Context>;
    shouldInheritArguments: ContextAware<boolean, Context>;
    args: ContextAware<string | string[], Context>;
    /**
     * Applies the given preset.
     */
    apply(resolvable: ContextAware<string, Context>): ApplyPreset<Context>;
    /**
     * Applies the given arguments to the preset.
     */
    with(args: ContextAware<string | string[], Context>): ApplyPreset<Context>;
    /**
     * Whether the preset will inherit the current command line arguments.
     */
    inheritsArguments(shouldInheritArguments?: ContextAware<boolean, Context>): ApplyPreset<Context>;
}
