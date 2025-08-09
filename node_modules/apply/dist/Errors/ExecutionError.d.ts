export declare class ExecutionError extends Error {
    fatal: boolean;
    constructor(message?: string, fatal?: boolean);
    stopsExecution(fatal?: boolean): this;
    recoverable(recoverable?: boolean): this;
    withCompleteStack(error: Error): this;
    withStack(stack?: string): this;
    withoutStack(): this;
    withMessage(...message: string[]): this;
}
