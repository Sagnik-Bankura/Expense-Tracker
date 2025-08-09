import { ApplierOptionsContract, Bus, Contextualized, Ecosystem, HandlerContract, InstallDependencies, PromptContract } from "../exports";
interface PackageManager {
    bin: string;
    lockFile: string;
    args: string[];
    check: [string, string[]];
}
export declare class InstallDependenciesHandler implements HandlerContract {
    name: "install-dependencies-handler";
    protected bus: Bus;
    protected prompt: PromptContract;
    protected applierOptions: ApplierOptionsContract;
    protected ecosystems: Record<Ecosystem, Function>;
    protected nodePackageManagers: PackageManager[];
    handle(action: Contextualized<InstallDependencies>, applierOptions: ApplierOptionsContract): Promise<void>;
    /**
     * Installs the dependencies with the correct package manager.
     */
    protected installNodeDependencies(): Promise<void>;
    /**
     * Installs the dependencies for the PHP ecosystem, which is simpler because
     * there is only one package manager.
     */
    protected installPhpDependencies(): Promise<void>;
}
export {};
