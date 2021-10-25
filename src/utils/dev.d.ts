/**
 * Utils - type declarations.
 *
 * @module @xcmats/js-toolbox/utils
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Determine runtime environment (is it development or not?).
 * `devEnv() -> true/false`
 *
 * When `strict` is not set to `true` then "development environment"
 * can be simulated by storing value of any type under "dev" key
 * in browser's sessionStorage, e.g. `sessionStorage[dev] = true`.
 */
export declare function devEnv (): boolean;
export declare function devEnv (strict: boolean): boolean;




/**
 * Get useful library configuration variables.
 */
export declare function getLibConfig (): {
    dependencies: Record<string, string>;
    description: string;
    homepage: string;
    license: string;
    name: string;
    version: string;
};




/**
 * Return global `process` variable if it exists.
 */
export declare function getProcess (): {
    browser: boolean;
    env: Record<string, unknown>;
} & Record<string, unknown>;




/**
 * Check current runtime environment.
 */
export declare function isBrowser (): boolean;




/**
 * Assign argument to the global object.
 * Async-console-dev-helper.
 */
export declare function to_<T> (): (val: T) => T;
export declare function to_<T> (name: string): (val: T) => T;
