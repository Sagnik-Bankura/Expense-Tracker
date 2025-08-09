import { ApplierContract, ApplierOptionsContract, Bus, ImporterContract, Preset, ResolverContract, PresetLocation } from "../exports";
export declare class PresetApplier implements ApplierContract {
    protected resolver: ResolverContract;
    protected importer: ImporterContract;
    protected bus: Bus;
    run(applierOptions: ApplierOptionsContract): Promise<void>;
    /**
     * Performs the actions.
     */
    performActions(preset: Preset, applierOptions: ApplierOptionsContract): Promise<void>;
    /**
     * Cleans up the temporary directory if needed.
     */
    protected cleanUp({ path, temporary }: PresetLocation): void;
}
