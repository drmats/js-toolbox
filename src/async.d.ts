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
 * Asynchronous version of standard `Array.prototype.map` function.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `element` - currently processed element
 *     - `index` - current index
 *
 * `f` can return `Promise.<any>` or `<any>`
 *
 * Example:
 *
 * ```
 * (async () => {
 *     let x = await async.map(
 *         array.range(10),
 *         (x) => async.timeout(() => 4*x, 100*x)
 *     )
 *     console.log(x)
 * })()
 * ```
 */
export function map<T> (
    arr: any[],
    f: (el: any, i: number) => Promise<T> | T
): Promise<T[]>;




/**
 * Asynchronous version of standard `Array.prototype.map` function.
 *
 * *Implementation that does paralell execution*.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `element` - currently processed element
 *     - `index` - current index
 *
 * `f` can return `Promise.<any>` or `<any>`
 *
 * Example:
 *
 * ```
 * (async () => {
 *     let x = await parMap(
 *         array.range(10),
 *         (x) => async.timeout(() => 4*x, 100*x)
 *     )
 *     console.log(x)
 * })()
 * ```
 */
export function parMap<T> (
    arr: any[],
    f: (el: any, i: number) => Promise<T> | T
): Promise<T[]>;




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
 * Asynchronous version of standard `Array.prototype.reduce` function.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `acc` - accumulates the `f`'s return values; it is
 *         the accumulated value previously returned
 *         in the last invocation of `f`, or `initAcc`, if supplied.
 *     - `element` - currently processed element
 *     - `index` - current index
 * - `initAcc` - value to use as the first argument to the first call
 *     of the `f`. If no initial value is supplied, the first element
 *     in the array will be used.
 *
 * `f` can return `Promise.<any>` or `<any>`
 *
 * Example:
 *
 * ```
 * (async () => {
 *     let x = await async.reduce(
 *         array.range(10),
 *         (acc, x) => async.timeout(() => acc+x, 100*x),
 *         0
 *     )
 *     console.log(x)
 * })()
 * ```
 */
export function reduce<T> (
    arr: any[],
    f: (acc: T, el: any, i: number) => Promise<T> | T,
    initAcc: T
): Promise<T>;




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
