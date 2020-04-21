/**
 * Async - type declarations.
 *
 * @module @xcmats/js-toolbox/async
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Make any promise cancellable.
 *
 * Example:
 *
 * ```
 * let { promise, cancel } = async.cancellable(
 *     async.timeout(() => "Job done!", 2000)
 * )
 *
 * promise.then(utils.to_("resolved")).catch(utils.to_("rejected"))
 *
 * cancel("I've changed my mind")
 * ```
 */
export function cancellable (p: Promise<any>): object;




/**
 * Mutual exclusion for asynchronous functions.
 *
 * Example:
 *
 * ```
 * const mutex = async.createMutex()
 *
 * let f = async (m) => {
 *     let val = await m.lock()
 *     return `Freed with val: ${val}`
 * }
 *
 * f(mutex).then(utils.to_("success")).catch(utils.to_("failure"))
 *
 * mutex.resolve(42)  //  mutex.reject("ERROR")
 * ```
 */
export function createMutex (): object;




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
export function delay (
    time?: number,
    passCancel?: (canceller: (reason: any) => void) => void
): Promise<number>;




/**
 * `setInterval` in `Promise` / `async` skin.
 *
 * Example:
 *
 * ```
 * interval(
 *     () => { console.log("Hey!"); return 42 },
 *     (c) => timeout(() => c(), 4 * timeUnit.second)
 * )
 * .then((x) => console.log("Finished:", x))
 * .catch((c) => console.log("Error:", c))
 * ```
 */
export function interval<T> (
    f: (clear: (reason: any) => T) => T,
    passClear: (clear: (reason: any) => T) => void,
    time?: number
): Promise<T>;




/**
 * Resolve or reject when any of the promises
 * passed as arguments resolve or reject.
 *
 * Complementary function to the standard `Promise.all()`.
 *
 * Example:
 *
 * ```
 * m1 = async.createMutex()
 * m2 = async.createMutex()
 *
 * async.race(m1.lock(), m2.lock())
 *     .then(utils.to_("resolved"))
 *     .catch(utils.to_("rejected"))
 *
 * m1.resolve("All right!")  //  or, e.g: m2.reject("Some left!")
 * ```
 */
export function race (...ps: Promise<any>[]): Promise<any>;




/**
 * Repeat `f` (sync. or async.) while `condition` evaluates to `true`.
 *
 * Resolves with result of last `f` execution
 * when `condition` evaluates to `false`.
 */
export function repeat<T> (
    f: () => Promise<T> | T,
    condition: () => boolean
): Promise<T>;




/**
 * `setTimeout` in `Promise` / `async` skin.
 *
 * Example:
 *
 * ```
 * async.timeout(
 *     () => { console.log("Hey!"); return 42 }, 2000,
 *     (c) => async.timeout(() => c("Cancelled!"), 1000)
 * )
 * .then((x) => console.log("Success:", x))
 * .catch((c) => console.log("Error or cancel:", c))
 * ```
 */
export function timeout<T> (
    f: () => T,
    passCancel?: (cancel: () => T) => void,
    time?: number
): Promise<T>;
