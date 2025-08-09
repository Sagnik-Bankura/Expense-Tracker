import { Action, PresetAware, ContextAware } from "../../exports";
export declare type HookCallback<T = any> = PresetAware<Promise<void> | void, T>;
interface HookCallbackWrapper {
    callback: HookCallback;
}
export declare class Hook<Context = any> extends Action {
    handler: "hook-handler";
    name: string;
    title: string;
    hooks: ContextAware<HookCallbackWrapper, Context>[];
    /**
     * Executes the given callback.
     */
    run(callback: HookCallback<Context>): Hook<Context>;
}
export {};
