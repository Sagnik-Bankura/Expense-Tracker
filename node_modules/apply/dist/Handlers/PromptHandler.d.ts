import { HandlerContract, Contextualized, Prompt, Bus, PromptContract } from "../exports";
export declare class PromptHandler implements HandlerContract {
    name: "prompt-handler";
    protected bus: Bus;
    protected prompt: PromptContract;
    handle(action: Contextualized<Prompt>): Promise<void>;
}
