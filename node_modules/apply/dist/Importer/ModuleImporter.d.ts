import { Bus, ImporterContract, Preset } from "../exports";
export declare class ModuleImporter implements ImporterContract {
    protected bus: Bus;
    import(directory: string): Promise<Preset>;
    /**
     * Finds the configuration file for the given directory.
     */
    protected findConfiguration(directory: string): string;
    /**
     * Evaluates the configuration and returns the preset.
     */
    protected evaluateConfiguration(script: string, directory: string, filename: string): Promise<Preset>;
    /**
     * Removes the import statement for this very package from the given script.
     */
    protected removeSelfImportStatement(script: string): string;
    protected transformScript(contents: string, resolveDir: string, sourcefile: string): string;
    protected createContext(directory: string, filename: string): Record<string, any>;
}
