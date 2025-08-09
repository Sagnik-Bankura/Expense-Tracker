import { Bus, Contextualized, Hook, HandlerContract } from "../exports";
export declare class HookHandler implements HandlerContract {
    name: "hook-handler";
    protected bus: Bus;
    handle(action: Contextualized<Hook>): Promise<void>;
}
