import { Action, ContextAware } from "../../exports";
/**
 * An action for deleting a file or directory in the target directory.
 */
export declare class Delete<Context = any> extends Action {
    handler: "delete-handler";
    name: string;
    title: string;
    paths: ContextAware<string | string[], Context>;
    /**
     * Adds one or more paths to the list of paths to delete.
     */
    setPaths(paths?: ContextAware<string | string[], Context>): Delete<Context>;
}
