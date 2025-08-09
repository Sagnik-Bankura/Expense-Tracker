import { ApplierOptionsContract, ApplyPreset, Bus, Contextualized, HandlerContract } from "../exports";
export declare class ApplyPresetHandler implements HandlerContract {
    name: "apply-preset-handler";
    protected bus: Bus;
    handle(action: Contextualized<ApplyPreset>, applierOptions: ApplierOptionsContract): Promise<void>;
}
