/**
 * Async - type declarations.
 *
 * @module @xcmats/js-toolbox/async
 * @license Apache-2.0
 * @author drmats
 */




import { identity } from "../func/tools";
import { timeUnit } from "../utils/misc";




/**
 * Delay current async execution by `time` miliseconds.
 *
 * Example:
 *
 * ```
 * (async () => {
 *     await async.delay()
 *     console.log("Hello ...")
 *     await async.delay()
 *     console.log("... world")
 * })()
 * ```
 */
export declare function delay (
    time: number = timeUnit.second,
    passCancel: (canceller: (reason: unknown) => void) => void = identity
): Promise<number>;




/**
 * `setInterval` in `Promise` / `async` skin.
 *
 * Example:
 *
 * ```
 * interval(
 *     () => { console.log("Hey!"); return 42 },
 *     c => timeout(() => c(), 4 * timeUnit.second)
 * )
 * .then(x => console.log("Finished:", x))
 * .catch(c => console.log("Error:", c))
 * ```
 */
export declare function interval<T> (
    f: (clear: (reason: unknown) => T) => T,
    passClear: (clear: (reason: unknown) => T) => void = identity,
    time: number = timeUnit.second
): Promise<T>;




/**
 * `setTimeout` in `Promise` / `async` skin.
 *
 * Example:
 *
 * ```
 * async.timeout(
 *     () => { console.log("Hey!"); return 42 }, 2000,
 *     c => async.timeout(() => c("Cancelled!"), 1000)
 * )
 * .then(x => console.log("Success:", x))
 * .catch(c => console.log("Error or cancel:", c))
 * ```
 */
export declare function timeout<T> (
    f: () => T,
    time: number = timeUnit.second,
    passCancel: (cancel: () => T) => void = identity
): Promise<T>;
