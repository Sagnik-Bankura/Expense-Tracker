import { Bus, ResolverOptions } from "../exports";
interface ResolvableAndOptions {
    resolvable: string;
    options: ResolverOptions;
}
declare type AdvancedPresetAlias = ResolverOptions & {
    preset: string;
};
declare type NestedAlias = {
    [namespaceOrAlias: string]: string | AdvancedPresetAlias;
};
interface FileConfiguration {
    [namespaceOrAlias: string]: string | NestedAlias;
}
interface OrganizationMapping {
    type: 'namespace';
    /**
     * The content before colons in the user-given resolvable string.
     */
    alias: string;
    /**
     * Actual organization.
     */
    organization: string;
}
interface PresetMapping {
    type: 'preset';
    path?: string;
    ssh?: boolean;
    /**
     * What the user-given resolvable should be.
     */
    alias: string;
    /**
     * The actual resolvable.
     */
    preset: string;
}
declare type ResolutionMapping = Array<OrganizationMapping | PresetMapping>;
export declare class AliasResolver {
    protected configuration: ResolutionMapping;
    protected bus: Bus;
    path: string;
    resolve(resolvable: string, options: ResolverOptions): Promise<ResolvableAndOptions>;
    /**
     * Parses the configuration file.
     */
    protected parseResolutionMapping(configuration?: FileConfiguration): Promise<ResolutionMapping>;
    /**
     * Reads the configuration file.
     */
    protected readConfiguration(): Promise<FileConfiguration | undefined>;
}
export {};
