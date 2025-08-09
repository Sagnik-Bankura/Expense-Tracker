import { LocatorContract, LocalPreset } from "../exports";
export declare class DiskLocator implements LocatorContract {
    name: string;
    locate(resolvable: string): Promise<LocalPreset>;
}
