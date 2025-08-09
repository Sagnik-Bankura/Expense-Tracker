import { CommandLineInterfaceOption, CommandLineInterfaceParameter, LogLevel, OutputContract, Verbosity } from "../exports";
/**
 * This stuff may be greatly improved. It's not the priority though.
 */
export declare class ConsoleOutput implements OutputContract {
    protected verbosity: Verbosity;
    register(verbosity: Verbosity): Promise<void>;
    protected subscribe(): void;
    protected log(level: LogLevel, content: string | Error): void;
    protected displayVersion(): void;
    protected displayHelp(options: CommandLineInterfaceOption[], parameters: CommandLineInterfaceParameter[]): void;
}
