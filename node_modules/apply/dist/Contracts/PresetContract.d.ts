import { Preset } from "../exports";
export interface PresetContract {
}
export declare type PresetAware<T = any, K = any> = (preset: Preset<K>) => T;
export declare type ContextAware<T, K = any> = T | PresetAware<T, K>;
export declare type Contextualized<T> = {
    [k in keyof T]: ContextualizedProperty<T[k]>;
};
export declare type ContextualizedProperty<T> = T extends ContextAware<infer U> ? U : T;
