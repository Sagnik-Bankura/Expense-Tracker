import { ApplierOptionsContract, Bus, Contextualized, EditJson, HandlerContract } from "../exports";
export declare class EditJsonHandler implements HandlerContract {
    name: "edit-json-handler";
    protected bus: Bus;
    handle(action: Contextualized<EditJson>, applierOptions: ApplierOptionsContract): Promise<void>;
    /**
     * Gets the content of the file.
     */
    protected getContent(path: string): {
        type: "tab" | "space" | undefined;
        amount: number;
        indent: string;
        content: any;
    };
}
