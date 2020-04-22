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
export function devEnv (strict: boolean): boolean;




/**
 * Get useful library configuration variables.
 */
export function getLibConfig (): object;




/**
 * Return global `process` variable if it exists.
 */
export function getProcess (): object;




/**
 * Check current runtime environment.
 */
export function isBrowser (): boolean;




/**
 * Assign argument to the global object.
 * Async-console-dev-helper.
 */
export function to_ (name?: string): Function;
