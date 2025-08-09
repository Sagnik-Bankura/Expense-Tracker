import { ContextAware } from "../exports";
export declare class Instruct<Context = any> {
    heading?: ContextAware<string, Context>;
    messages: ContextAware<string | string[], Context>;
    /**
     * Defines the instruction table's heading.
     */
    withHeading(heading?: ContextAware<string, Context>): this;
    /**
     * Adds the given messages to the instruction set.
     */
    to(messages: ContextAware<string | string[], Context>): this;
}
