import { EventBus } from 'ts-bus';
import { BusEvent, EventCreatorFn } from 'ts-bus/types';
import { CommandLineInterfaceParameter, CommandLineInterfaceOption } from "../exports";
/**
 * An event definition for displaying the current version.
 */
export declare const outputVersion: {
    (payload: void): {
        type: "output:version";
        payload: void;
    };
    eventType: "output:version";
    toString(): "output:version";
};
/**
 * An event definition for displaying help usage.
 */
export declare const outputHelp: {
    (payload: {
        parameters: CommandLineInterfaceParameter[];
        options: CommandLineInterfaceOption[];
    }): {
        type: "output:help";
        payload: {
            parameters: CommandLineInterfaceParameter[];
            options: CommandLineInterfaceOption[];
        };
    };
    eventType: "output:help";
    toString(): "output:help";
};
/**
 * An event definition for logging a generic informational message.
 */
export declare const outputMessage: {
    (payload: {
        level: LogLevel;
        content: string | Error;
    }): {
        type: "output:message";
        payload: {
            level: LogLevel;
            content: string | Error;
        };
    };
    eventType: "output:message";
    toString(): "output:message";
};
/**
 * An event definition for logging a instruction messages.
 */
export declare const outputInstructions: {
    (payload: {
        heading?: string | undefined;
        instructions: string[];
    }): {
        type: "output:instructions";
        payload: {
            heading?: string | undefined;
            instructions: string[];
        };
    };
    eventType: "output:instructions";
    toString(): "output:instructions";
};
/**
 * The application's event bus.
 */
export declare class Bus {
    protected bus: EventBus;
    constructor();
    /**
     * Emits the given event.
     */
    emit(event: BusEvent<any>, meta?: any): this;
    /**
     * Adds an handler for the given event.
     */
    on<T extends BusEvent>(ev: EventCreatorFn<T>, handler: (e: ReturnType<typeof ev>) => void): this;
    /**
     * Emits a generic message event.
     */
    log(level: LogLevel, content: string | Error): this;
    /**
     * Emits a message event of type fatal.
     */
    fatal(content: string | Error): this;
    /**
     * Emits a message event of type warning.
     */
    warning(content: string | Error): this;
    /**
     * Emits a message event of type success.
     */
    success(content: string | Error): this;
    /**
     * Emits a message event of type info.
     */
    info(content: string | Error): this;
    /**
     * Emits a message event of type debug.
     */
    debug(content: string | Error): this;
    /**
     * Outputs instructions.
     */
    instruct(instructions: string[], heading?: string): this;
}
/**
 * Possible logging levels.
 */
export declare type LogLevel = 'fatal' | 'error' | 'warning' | 'success' | 'info' | 'debug';
/**
 * The singleton bus instance.
 */
export declare const bus: Bus;
