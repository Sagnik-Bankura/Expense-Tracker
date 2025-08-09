import { Action, ContextAware } from "../../exports";
export declare type Ecosystem = 'node' | 'php';
export declare class InstallDependencies<Context = any> extends Action {
    handler: "install-dependencies-handler";
    name: string;
    title: string;
    ecosystem: ContextAware<Ecosystem, Context>;
    shouldAsk: ContextAware<boolean, Context>;
    /**
     * Defines the ecosystem for which to install the dependencies.
     */
    for(ecosystem: ContextAware<Ecosystem, Context>): InstallDependencies<Context>;
    /**
     * Asks the user before installing.
     */
    ifUserApproves(shouldAsk?: ContextAware<boolean, Context>): InstallDependencies<Context>;
}
