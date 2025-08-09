import { ApplierOptionsContract, Bus, Contextualized, Edit, HandlerContract, LineAddition, Preset } from "../exports";
export declare class EditHandler implements HandlerContract {
    name: "edit-handler";
    protected bus: Bus;
    protected preset: Preset;
    handle(action: Contextualized<Edit>, applierOptions: ApplierOptionsContract): Promise<void>;
    /**
     * Adds lines to the content.
     */
    performLineAddition(content: string, addition: LineAddition): Promise<string>;
}
