/**
 * Async - type declarations.
 *
 * @module @xcmats/js-toolbox/async
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Asynchronous version of standard `Array.prototype.map` function.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `element` - currently processed element
 *     - `index` - current index
 *
 * `f` can return `Promise.<unknown>` or `<unknown>`
 *
 * Example:
 *
 * ```
 * (async () => {
 *     let x = await async.map(
 *         array.range(10),
 *         x => async.timeout(() => 4*x, 100*x)
 *     )
 *     console.log(x)
 * })()
 * ```
 */
export declare function map<I, O> (
    arr: I[],
    f: (el: I, i: number) => Promise<O> | O
): Promise<O[]>;
export declare function map<I> (arr: I[]): {
    <O>(f: (el: I, i: number) => Promise<O> | O): Promise<O[]>;
};




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
 * `f` can return `Promise.<unknown>` or `<unknown>`
 *
 * Example:
 *
 * ```
 * (async () => {
 *     let x = await async.parMap(
 *         array.range(10),
 *         x => async.timeout(() => 4*x, 100*x)
 *     )
 *     console.log(x)
 * })()
 * ```
 */
export declare function parMap<I, O> (
    arr: I[],
    f: (el: I, i: number) => Promise<O> | O
): Promise<O[]>;
export declare function parMap<I> (arr: I[]): {
    <O>(f: (el: I, i: number) => Promise<O> | O): Promise<O[]>;
};




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
 * `f` can return `Promise.<unknown>` or `<unknown>`
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
export declare function reduce<T, S> (
    arr: T[],
    f: (acc: S, el: T, i: number) => Promise<S> | S,
    initAcc: S
): Promise<S>;
export declare function reduce<T, S> (arr: T[]): {
    (f: (acc: S, el: T, i: number) => Promise<S> | S): {
        (initAcc: S): Promise<S>;
    };
};
