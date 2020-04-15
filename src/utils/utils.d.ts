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
 * Handle exceptions in expressions.
 */
export function handleException<T> (
    fn: () => T,
    handler?: (ex: any) => T
): T;




/**
 * Handle rejections in expressions.
 * Async version of `handleException`.
 */
export function handleRejection<T> (
    fn: () => Promise<T>,
    handler?: (ex: any) => Promise<T>
): Promise<T>;




/**
 * Check current runtime environment.
 */
export function isBrowser (): boolean;




/**
 * JSS color helper.
 */
export function rgb (r: number, g: number, b: number): string;




/**
 * JSS color helper (with alpha).
 */
export function rgba (
    r: number,
    g: number,
    b: number,
    a: number
): string;




/**
 * Run "main" function:
 *     - in browser on "load" event,
 *     - via setTimeout if there's no event API available
 */
export function run (main: Function): undefined;




/**
 * Time units represented in milliseconds.
 *
 * - `second` - `1000 milliseconds`
 * - `minute` - `60 seconds`
 * - `hour` - `60 minutes`
 * - `day` - `24 hours`
 * - `week` - `7 days`
 * - `month` - [**average** month]: `30.4375 days` (`365.25 days / 12`)
 * - `quarter` - [**average** quarter]: `3 months` (`365.25 days / 4`)
 * - `year` - [**average** year]: `365.25 days`
 */
export interface TimeUnit {
    second: number;
    minute: number;
    hour: number;
    day: number;
    week: number;
    month: number;
    quarter: number;
    year: number;
}
export const timeUnit: TimeUnit;




/**
 * Assign argument to the global object.
 * Async-console-dev-helper.
 */
export function to_(name?: string): Function;




/**
 * JSS url helper.
 */
export function url (x: string): string;
