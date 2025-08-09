import { ApplierOptionsContract, Bus, Contextualized, EditEnv, HandlerContract } from "../exports";
export declare class EditEnvHandler implements HandlerContract {
    name: "edit-env-handler";
    protected bus: Bus;
    handle(action: Contextualized<EditEnv>, applierOptions: ApplierOptionsContract): Promise<void>;
}
