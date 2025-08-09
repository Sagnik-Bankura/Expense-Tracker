import { ApplierOptionsContract, Bus, Contextualized, Extract, HandlerContract, PromptContract } from "../exports";
export declare class ExtractHandler implements HandlerContract {
    name: "extract-handler";
    protected bus: Bus;
    protected prompt: PromptContract;
    protected action: Contextualized<Extract>;
    protected applierOptions: ApplierOptionsContract;
    handle(action: Contextualized<Extract>, applierOptions: ApplierOptionsContract): Promise<void>;
    /**
     * Extracts the given input to the given relative target.
     */
    protected extract(relativeTemplateOrGlob: string, relativeTarget: string): Promise<void>;
    /**
     * Extracts the files in the given directory to the given target-relative directory.
     */
    protected extractDirectory(relativeInputDirectory: string, relativeTargetDirectory: string, glob?: string): Promise<void>;
    /**
     * Copies the given relative file to the given target directory.
     */
    protected extractTemplateFile(relativeFilePath: string, relativeInputDirectory: string, targetDirectory: string): Promise<void>;
    /**
     * Copies the input file to the target file. Both are absolute paths.
     */
    protected copyFile(inputFile: string, targetFile: string): Promise<void>;
    /**
     * Renames a file.dotfile file into .file.
     */
    protected renameDotFile(input: string): string;
    /**
     * Checks if the input is a file.
     */
    protected isFile(input: string): boolean;
    /**
     * Checks if the input is a directory.
     */
    protected isDirectory(input: string): boolean;
}
