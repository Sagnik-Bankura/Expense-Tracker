"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const os_1 = require("os");
const inversify_1 = require("inversify");
const exports_1 = require("@/exports");
const AliasResolver_1 = require("@/Resolvers/AliasResolver");
/**
 * The application container.
 */
const container = new inversify_1.Container();
exports.container = container;
// I/O
container.bind(exports_1.Binding.Bus).toConstantValue(exports_1.bus);
container.bind(exports_1.Binding.Prompt).toConstantValue(new exports_1.CustomPrompt());
container.bind(exports_1.Binding.Output).to(exports_1.ConsoleOutput);
// Appliers
container.bind(exports_1.Binding.Applier).to(exports_1.PresetApplier);
// Resolvers
container.bind(exports_1.Binding.AliasResolver).to(AliasResolver_1.AliasResolver).whenTargetIsDefault();
container.bind(exports_1.Binding.AliasResolverPath).toConstantValue(os_1.homedir());
container.bind(exports_1.Binding.Resolver).to(exports_1.DefaultResolver).whenTargetIsDefault();
container.bind(exports_1.Binding.Locator).to(exports_1.DiskLocator).whenTargetNamed(exports_1.Name.DiskLocator);
container.bind(exports_1.Binding.Locator).to(exports_1.GitLocator).whenTargetNamed(exports_1.Name.GitLocator);
// Importers
container.bind(exports_1.Binding.Importer).to(exports_1.ModuleImporter).whenTargetIsDefault();
// Handlers
container.bind(exports_1.Binding.Handler).to(exports_1.ApplyPresetHandler).whenTargetNamed(exports_1.Name.Handler.ApplyPreset);
container.bind(exports_1.Binding.Handler).to(exports_1.ExtractHandler).whenTargetNamed(exports_1.Name.Handler.Extract);
container.bind(exports_1.Binding.Handler).to(exports_1.ExecuteHandler).whenTargetNamed(exports_1.Name.Handler.Execute);
container.bind(exports_1.Binding.Handler).to(exports_1.InstallDependenciesHandler).whenTargetNamed(exports_1.Name.Handler.InstallDependencies);
container.bind(exports_1.Binding.Handler).to(exports_1.PromptHandler).whenTargetNamed(exports_1.Name.Handler.Prompt);
container.bind(exports_1.Binding.Handler).to(exports_1.DeleteHandler).whenTargetNamed(exports_1.Name.Handler.Delete);
container.bind(exports_1.Binding.Handler).to(exports_1.EditJsonHandler).whenTargetNamed(exports_1.Name.Handler.EditJson);
container.bind(exports_1.Binding.Handler).to(exports_1.EditEnvHandler).whenTargetNamed(exports_1.Name.Handler.EditEnv);
container.bind(exports_1.Binding.Handler).to(exports_1.EditHandler).whenTargetNamed(exports_1.Name.Handler.Edit);
container.bind(exports_1.Binding.Handler).to(exports_1.GroupHandler).whenTargetNamed(exports_1.Name.Handler.Group);
container.bind(exports_1.Binding.Handler).to(exports_1.HookHandler).whenTargetNamed(exports_1.Name.Handler.Hook);
