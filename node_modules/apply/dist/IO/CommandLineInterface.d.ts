import { ApplierContract, Bus, CommandLineInterfaceOption, CommandLineInterfaceParameter, OutputContract } from "../exports";
/**
 * Command line interface for applying a preset.
 */
export declare class CommandLineInterface {
    protected output: OutputContract;
    protected applier: ApplierContract;
    protected bus: Bus;
    protected parameters: CommandLineInterfaceParameter[];
    protected options: CommandLineInterfaceOption[];
    /**
     * Runs the CLI.
     */
    run(argv: string[]): Promise<number>;
    apply(resolvable: string, target: string, options: Record<string, any>, args: readonly string[]): Promise<number>;
    /**
     * Parses the command line arguments.
     */
    parse(argv: string[]): ParsedArgv;
}
interface ParsedArgv {
    args: ReadonlyArray<string>;
    options: {
        [k: string]: any;
    };
}
export {};
