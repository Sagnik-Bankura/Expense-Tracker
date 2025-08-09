export declare const Binding: {
    Applier: symbol;
    Resolver: symbol;
    AliasResolver: symbol;
    AliasResolverPath: symbol;
    Locator: symbol;
    Importer: symbol;
    Handler: symbol;
    Output: symbol;
    Bus: symbol;
    Prompt: symbol;
    Preset: symbol;
};
export declare const Name: {
    ResolverConfiguration: string;
    DefaultResolver: string;
    DiskLocator: string;
    GitLocator: string;
    Handler: {
        readonly ApplyPreset: "apply-preset-handler";
        readonly Extract: "extract-handler";
        readonly Execute: "execute-command-handler";
        readonly InstallDependencies: "install-dependencies-handler";
        readonly Prompt: "prompt-handler";
        readonly Delete: "delete-handler";
        readonly EditJson: "edit-json-handler";
        readonly EditEnv: "edit-env-handler";
        readonly Edit: "edit-handler";
        readonly Group: "group-handler";
        readonly Hook: "hook-handler";
    };
};
