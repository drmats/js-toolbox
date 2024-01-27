/**
 * Async - type declarations.
 *
 * @module @xcmats/js-toolbox/async
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




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
export declare function delay (): Promise<number>;
export declare function delay (
    time: number
): Promise<number>;
export declare function delay (
    time: number,
    passCancel: (canceller: (reason: unknown) => void) => void
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
    f: (clear: (reason: unknown) => T) => T
): Promise<T>;
export declare function interval<T> (
    f: (clear: (reason: unknown) => T) => T,
    passClear: (clear: (reason: unknown) => T) => void
): Promise<T>;
export declare function interval<T> (
    f: (clear: (reason: unknown) => T) => T,
    passClear: (clear: (reason: unknown) => T) => void,
    time: number
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
    f: () => T
): Promise<T>;
export declare function timeout<T> (
    f: () => T,
    time: number
): Promise<T>;
export declare function timeout<T> (
    f: () => T,
    time: number,
    passCancel: (cancel: () => T) => void
): Promise<T>;
