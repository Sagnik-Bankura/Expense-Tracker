import { ApplierOptionsContract, Bus, Contextualized, Delete, HandlerContract } from "../exports";
export declare class DeleteHandler implements HandlerContract {
    name: "delete-handler";
    protected bus: Bus;
    handle(action: Contextualized<Delete>, applierOptions: ApplierOptionsContract): Promise<void>;
}
