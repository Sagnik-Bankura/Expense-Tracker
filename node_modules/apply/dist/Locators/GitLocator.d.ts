import { Bus, LocatorContract, RepositoryPreset } from "../exports";
export declare class GitLocator implements LocatorContract {
    name: string;
    protected bus: Bus;
    locate(resolvable: string): Promise<RepositoryPreset>;
    /**
     * Resolves the short syntax for GitHub.
     *
     * @example organization/repository
     * @example organization/repository(at)tag
     * @example git(at)github.com:organization/repository
     */
    protected resolveGitHubUrl(resolvable: string): RepositoryPreset | false;
}
