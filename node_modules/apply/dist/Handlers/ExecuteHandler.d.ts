import { ApplierOptionsContract, Bus, Contextualized, Execute, HandlerContract } from "../exports";
export declare class ExecuteHandler implements HandlerContract {
    name: "execute-command-handler";
    protected bus: Bus;
    handle(action: Contextualized<Execute>, applierOptions: ApplierOptionsContract): Promise<void>;
    protected execute(cwd: string, command: string, args?: string[], options?: any): Promise<void>;
}
