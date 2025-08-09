import { ExecutionError, RepositoryPreset } from "../exports";
export declare class ResolutionError extends ExecutionError {
    static localSubdirectoryNotFound(subdirectory: string): ResolutionError;
    static localDirectoryNotFound(directory: string): ResolutionError;
    static subdirectoryNotFound(subdirectory: string, path: string): ResolutionError;
    static notRepository(resolvable: string): ResolutionError;
    static notCommunityOrganization(resolvable: string): ResolutionError;
    static communityOrganizationNotFound(shorthand: string): ResolutionError;
    static resolutionFailed(resolvable: string): ResolutionError;
    static cloneFailed(preset: RepositoryPreset, error: Error): ResolutionError;
}
