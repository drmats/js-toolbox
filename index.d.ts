/**
 * Javascript toolbox - type declarations.
 *
 * @license Apache-2.0
 * @author drmats
 * @see {@link index.js}
 */




declare module "@xcmats/js-toolbox" {




    /**
     * @name array
     * @see {@link array.js}
     */


    /**
     * Choose a random element from a non-empty array.
     */
    export function draw (arr: any[] | string): any[] | string;


    /**
     * Simple array flattener.
     */
    export function flatten (arr: any[][]): any[];


    /**
     * Return first element of the given array.
     */
    export function head (arr: any[] | string): any | string;


    /**
     * Return array without its last element.
     */
    export function init (arr: any[] | string): any[] | string;


    /**
     * Return last element of the given array.
     */
    export function last (arr: any[] | string): any | string;


    /**
     * - `range(stop)` -> array of numbers; start defaults to `0`
     * - `range(start, stop[, step])` -> array of numbers
     *
     * Return a list containing an arithmetic progression.
     * - `range(i, j)` returns `[i, i+1, i+2, ..., j-1]`.
     *
     * When step is given, it specifies the increment (or decrement).
     * For example:
     * - `range(4)` returns `[0, 1, 2, 3]`.
     *
     * Imitates Python's `range()`.
     */
    export function range (...args: number[]): number[];


    /**
     * Shuffle all elements in the given array
     * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
     *
     * The operation is taken in-place.
     */
    export function shuffle (arr: any[]): any[];


    /**
     * - `sparse(stop, size)` -> array of 'size' distinct integers
     *     in range `[0..stop-1]`
     * - `sparse(start, stop, size)` -> array of 'size' distinct integers
     *     in range `[start..stop-1]`
     *
     * Generate sparse array of distinct integers
     * with (almost) uniform distribution.
     */
    export function sparse (...args: number[]): number[];


    /**
     * Return array without its head (first element).
     */
    export function tail (arr: any[] | string): any[] | string;




    /**
     * @name async
     * @see {@link async.js}
     */


    /**
     * Delay current async execution by `time` miliseconds.
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
        time: number,
        cancel: (canceller: (reason: any) => void) => void
    ): Promise<number>;


    /**
     * `setInterval` in `Promise` / `async` skin.
     *
     * Example usage:
     *
     * ```
     * interval(
     *     () => { console.log("Hey!"); return 42 },
     *     (c) => timeout(() => c(), 4000)
     * )
     * .then((x) => console.log("Finished:", x))
     * .catch((c) => console.log("Error:", c))
     * ```
     */
    export function interval<T> (
        f: () => T,
        time: number,
        cancel: (canceller: (reason: any) => void) => void
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
     * `f` can return `Promise.<*>` or `<*>`
     *
     * Example usage:
     *
     * ```
     * (async () => {
     *     let x = await asyncMap(
     *         array.range(10),
     *         (x) => async.timeout(() => 4*x, 100*x)
     *     )
     *     console.log(x)
     * })()
     * ```
     */
    export function asyncMap<T> (
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
     * `f` can return `Promise.<*>` or `<*>`
     *
     * Example usage:
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
     * `f` can return `Promise.<*>` or `<*>`
     *
     * Example usage:
     *
     * ```
     * (async () => {
     *     let x = await asyncReduce(
     *         array.range(10),
     *         (acc, x) => async.timeout(() => acc+x, 100*x),
     *         0
     *     )
     *     console.log(x)
     * })()
     * ```
     */
    export function asyncReduce<T> (
        arr: any[],
        f: (acc: T, el: any, i: number) => Promise<T> | T,
        initAcc: T
    ): Promise<T>;


    /**
     * `setTimeout` in `Promise` / `async` skin.
     *
     * Example usage:
     *
     * ```
     * timeout(
     *     () => { console.log("Hey!"); return 42 }, 1000,
     *     (c) => timeout(() => c("Cancelled!"), 800)
     * )
     * .then((x) => console.log("Success:", x))
     * .catch((c) => console.log("Error or cancel:", c))
     * ```
     */
    export function timeout<T> (
        f: () => T,
        clear: (clearer: () => T) => void,
        time: number
    ): Promise<T>;




    /**
     * @name func
     * @see {@link func.js}
     */


    /**
     * Translate the evaluation of function `f` taking multiple arguments
     * into an evaluation of sequence of functions,
     * each with a single argument.
     *
     * ```
     * f(a, b, c, d)  <=>  curry(f)(a)(b)(c)(d)()
     * ```
     */
    export function curry <T> (
        f: (...args: any[]) => T
    ): (...args: any[]) => Function | T;


    /**
     * Partial application.
     *
     * Bind `init` arguments to function `f` and construct
     * a function of smaller arity which accept `rest` of the arguments.
     *
     * Example:
     *
     * ```
     * let f = (a, b) => a + b
     * f(3, 4)  ->  7
     * let g = partial(f)(3)
     * g(4)  ->  7
     * ```
     */
    export function partial<T> (
        f: (...args: any[]) => T
    ): (...init: any[]) => (...rest: any[]) => T;


    /**
     * Y-combinator (returns fixed point of a higher-order function
     * passed as `f`).
     */
    export function Y (f: Function): Function;




    /**
     * @name math
     * @see {@link math.js}
     */


    /**
     * Compute mathematical average of array of numbers.
     */
    export function average (arr: number[]): number;


    /**
     * Base 10 logarithm.
     */
    export function log10 (x: number): number;


    /**
     * Base 2 logarithm.
     */
    export function log2 (x: number): number;


    /**
     * Round to the nearest integer if the given value is within
     * epsilon range of that integer. Default epsilon is `1e-9`,
     * which can be changed through `precision` parameter.
     */
    export function roundIfClose (x: number, precision?: number): number;


    /**
     * Compute sum of numbers in passed array.
     */
    export function sum (arr: number[]): number;




    /**
     * @name redux
     * @see {@link redux.js}
     */


    /**
     * Create clean and readable reducers for redux.
     */
    export function createReducer (initState?: object): Function;




    /**
     * @name string
     * @see {@link string.js}
     */


    /**
     * Return full set of ASCII letters.
     */
    export function asciiLetters (): string;


    /**
     * Return lowercase ASCII letters.
     */
    export function asciiLowercase (): string;


    /**
     * Return uppercase ASCII letters.
     */
    export function asciiUppercase (): string;


    /**
     * Allocate a big string (of size 2^n). Use with caution!
     *
     * - `bigString(16)` makes `2^16 = 65536` string size.
     * - `bigString(23)` makes `2^23 = 8M` string size,
     * - `bigString(24)` makes `16M` and so on.
     *
     * `c = "x"` - Character used during string generation.
     *
     * ```
     * bigString(2) = "xxxx"
     * bigString(3, "a") = "aaaaaaaa"
     * ```
     */
    export function bigString (n: number, c: string): string;


    /**
     * Convert `thisKindOfText` to `ThisKindOfText`.
     */
    export function camelToPascal (str: string): string;


    /**
     * Convert `thisKindOfText` to `this_kind_of_text`.
     */
    export function camelToSnake (str: string): string;


    /**
     * Ensure given string is in form `Aaaaaaaa`.
     */
    export function capitalize (str: string): string;


    /**
     * Return all digits.
     */
    export function digits (): string;


    /**
     * Construct empty string.
     */
    export function emptyString (): string;


    /**
     * Convert `ThisKindOfText` to `thisKindOfText`.
     */
    export function pascalToCamel (str: string): string;


    /**
     * Convert `ThisKindOfText` to `this_kind_of_text`.
     */
    export function pascalToSnake (str: string): string;


    /**
     * Quote text.
     */
    export function quote (str: string, q?: string): string;


    /**
     * Construct random string of desired length.
     */
    export function randomString (size?: number, letters?: string): string;


    /**
     * Convert `this_kind_of_text` to `thisKindOfText`.
     */
    export function snakeToCamel (str: string): string;


    /**
     * Convert `this_kind_of_text` to `ThisKindOfText`.
     */
    export function snakeToPascal (str: string): string;




    /**
     * @name type
     * @see {@link type.js}
     */


    /**
     * Determine if a given value is a `Function`.
     */
    export function isFunction (f: any): boolean;


    /**
     * Determine if a given value is a proper `Number`
     * (not `NaN` and not `Infinity`).
     */
    export function isNumber (n: any): boolean;


    /**
     * Determine if a given value is an `Object`
     * (not `null`, not `undefined` and not `Array`).
     */
    export function isObject (o: any): boolean;


    /**
     * If `val` is `null` then return `undefined`, else return `val`.
     */
    export function nullToUndefined (val: any): any;




    /**
     * @name utils
     * @see {@link utils.js}
     */


    /**
     * Apply path to an object `o`.
     *
     * ```
     * access({ a: { b: { c: 42 } } }, ["a", "b", "c"]) -> 42
     * ```
     */
    export function access (o: object, path: string[]): any;


    /**
     * Functional replacement of a `switch` statement.
     */
    export function choose (
        key: string,
        actions?: object,
        defaultAction?: Function,
        args?: any[]
    ): any;


    /**
     * Construct `Object` from the result of `Object.entries()` call.
     *
     * ```
     * entries = [[k1, v1,], ..., [kn, vn,]]
     * ```
     *
     * Imitates Python's `dict()`.
     */
    export function dict (entries: [string, any][]): object;


    /**
     * Handle exceptions in expressions.
     *
     * @function handleException
     * @param {Function} fn
     * @param {Function} [handler]
     * @returns {*}
     */
    export function handleException<T> (
        fn: () => T,
        handler?: (p: any) => T
    ): T;


    /**
     * Return value passed as a first argument.
     */
    export function identity<T> (val: T): T;


    /**
     * Map (iteration) on objects - shallow.
     *
     * - `o` - `Object` to enumerate on.
     * - `f` - `Function` to call on each key, params:
     *     - `this` - bound to the enumerated object,
     *     - `kv` - current `[key, value]` array,
     *
     * `f` should return `[key, value]` array.
     */
    export function objectMap (
        o: object,
        f: (kv: [string, any]) => [string, any]
    ): object;


    /**
     * Reduce (fold) on objects - shallow.
     *
     * - `o` - `Object` to enumerate on.
     * - `f` - `Function` to call on each key, params:
     *     - `this` - bound to the enumerated object,
     *     - `acc` - accumulated value,
     *     - `kv` - current `[key, value]` array,
     * - `init` - accumulated value initializer,
     *
     * `f` should return value of the same type as `init`.
     */
    export function objectReduce<T> (
        o: object,
        f: (acc: T, kv: [string, any]) => T,
        init: T
    ): T;


    /**
     * When `o = { a: "b", c: "d" }`
     * then `swap(o) = { b: "a", d: "c" }`.
     */
    export function swap (o: object): object;




}
