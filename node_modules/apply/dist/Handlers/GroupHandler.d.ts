import { ApplierOptionsContract, Bus, Contextualized, Group, HandlerContract } from "../exports";
export declare class GroupHandler implements HandlerContract {
    name: "group-handler";
    protected bus: Bus;
    handle(action: Contextualized<Group>, applierOptions: ApplierOptionsContract): Promise<void>;
}
