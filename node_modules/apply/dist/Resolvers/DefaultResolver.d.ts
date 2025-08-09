import { Bus, ResolverContract, ResolverOptions, PresetLocation, AliasResolver, LocatedPreset } from "../exports";
export declare class DefaultResolver implements ResolverContract {
    protected bus: Bus;
    protected aliasResolver: AliasResolver;
    resolve(initialResolvable: string, initalOptions: ResolverOptions): Promise<PresetLocation>;
    /**
     * Persists the resolved preset to the disk if needed.
     */
    persist(preset: LocatedPreset, options: ResolverOptions): Promise<PresetLocation>;
    /**
     * Clones a repository from Git.
     */
    private clone;
    /**
     * Ensures that the subdirectory given by the user exists in the resolved preset directory.
     */
    private ensureSubdirectoryExists;
}
