/**
 * Javascript toolbox - type declarations.
 *
 * @license Apache-2.0
 * @author drmats
 * @see {@link ../src/index.js}
 */




declare module "@xcmats/js-toolbox" {




    /**
     * @name array
     * @see {@link array.js}
     */


     /**
     * Create object composed of keys resulting from application of `iteratee`
     * function to each element of the passed array `arr`. Values corresponds
     * to the number of occurences of an element in the passed array.
     *
     * `iteratee` is optional and defaults to `identity` function.
     *
     * Example:
     *
     * ```
     * countBy(
     *     "exemplo plus quam ratione vivimus".split(" "),
     *     (w) => w.length
     * )
     * ```
     */
    export function countBy (arr: any[], iteratee?: (any) => (any)): object;


    /**
     * Choose a random element from a non-empty array.
     */
    export function draw (arr: any[] | string): any[] | string;


    /**
     * Find duplicates in a given array.
     *
     * Optionally, before comparision, each element is transformed by
     * `iteratee` function (which defaults to `identity`).
     *
     * Example:
     *
     * ```
     * findDuplicates(["one", "two", "one", "three", "six", "two", "two"])
     * ```
     */
    export function findDuplicates (
        arr: any[],
        iteratee?: (any) => (any)
    ): object;


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
        cancel?: (canceller: (reason: any) => void) => void
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
        f: () => T,
        clear: (canceller: (reason: any) => T) => void,
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
     * `f` can return `Promise.<*>` or `<*>`
     *
     * Example:
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
     * Example:
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
     * Repeat `f` (sync. or async.) while `condition` evaluates to `true`.
     *
     * Resolves with result of last `f` execution
     * when `condition` evaluates to `false`.
     */
    export function asyncRepeat<T> (
        f: () => Promise<T> | T,
        condition: () => boolean
    ): Promise<T>;


    /**
     * `setTimeout` in `Promise` / `async` skin.
     *
     * Example:
     *
     * ```
     * timeout(
     *     () => { console.log("Hey!"); return 42 }, 2 * timeUnit.second,
     *     (c) => timeout(() => c("Cancelled!"), timeUnit.second)
     * )
     * .then((x) => console.log("Success:", x))
     * .catch((c) => console.log("Error or cancel:", c))
     * ```
     */
    export function timeout<T> (
        f: () => T,
        clear?: (clearer: () => T) => void,
        time?: number
    ): Promise<T>;




    /**
     * @name codec
     * @see {@link codec.js}
     */


    /**
     * Decode given Base64-encoded string into byte array (Uint8Array).
     */
    export function b64dec (s: string): Uint8Array;


    /**
     * Base64-encode given byte array (Uint8Array).
     */
    export function b64enc (bytes: Uint8Array): string;


    /**
     * Convert given byte array (Uint8Array) to a hex-encoded string.
     * Each byte is encoded on the two hexadecimal digits.
     */
    export function bytesToHex (bytes: Uint8Array): string;


    /**
     * Convert given byte array (Uint8Array) to an utf8-encoded string.
     */
    export function bytesToString (bytes: Uint8Array): string;


    /**
     * Convert hex-encoded string to byte array (Uint8Array).
     *
     * If given `hexInput` is of odd length (hexInput.length % 2 !== 0)
     * then the last hex-digit is treated as full byte representation,
     * i.e.:
     *
     * ```
     *     hexToBytes("fa6") <=> hexToBytes("fa06") <=> Uint8Array [ 250, 6 ]
     * ```
     *
     * All unrecognized hex-digit groups (e.g. "zz") are treated
     * by `parseInt()` as `NaN` and then effectively converted
     * to `Uint8Array [ 0 ]`.
     *
     * Input parameter (`hexInput`) can be prefixed with `0x`.
     *
     * All whitespaces, tabs and carriage returns
     * are stripped out from the input.
     */
    export function hexToBytes (hexInput: string): Uint8Array;


    /**
     * Convert given utf8-encoded string to byte array (Uint8Array).
     */
    export function stringToBytes (s: string): Uint8Array;


    /**
     * Base64 decoding for strings.
     */
    export function stringB64dec (s: string): string;


    /**
     * Base64 encoding for strings.
     */
    export function stringB64enc (s: string): string;




    /**
     * @name func
     * @see {@link func.js}
     */


    /**
     * Function composition.
     *
     * ```
     * let:
     * f: X -> Y,  g: Y -> Z
     *
     * then:
     * g(f(x))  <=>  (g . f)(x)  <=>  compose(g, f)(x)
     * ```
     */
    export function compose (...fs: Function[]): Function;


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
     * Example:
     *
     * ```
     * bigString(2) === "xxxx"
     * bigString(3, "a") === "aaaaaaaa"
     * ```
     */
    export function bigString (n: number, c?: string): string;


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
     * Constructs new string with inserted `sep` (of default value `…`)
     * at the `ellipsis.BEGIN`, `ellipsis.MIDDLE` or `ellipsis.END`.
     * Returned string has the same length as input string
     * (thus some original characters are replaced with `sep` contents).
     */
    export function ellipsis (
        str: string,
        placing?: number,
        sep?: string
    ): string;


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
    export function quote (str?: string, q?: string): string;


    /**
     * Construct random string of desired length.
     */
    export function randomString (size?: number, letters?: string): string;


    /**
     * Constructs new string not longer than `len`.
     */
    export function shorten (
        str: string,
        len?: number,
        placing?: number,
        sep?: string
    ): string;


    /**
     * Convert `this_kind_of_text` to `thisKindOfText`.
     */
    export function snakeToCamel (str: string): string;


    /**
     * Convert `this_kind_of_text` to `ThisKindOfText`.
     */
    export function snakeToPascal (str: string): string;


    /**
     * Wrap passed string with `prefix` and `suffix`.
     */
    export function wrap (
        str?: string,
        prefix?: string,
        suffix?: string
    ): string;




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
     * Determine if a given value is a `String`.
     */
    export function isString (s: any): string;


    /**
     * Maximum representable safe integer in JavaScript.
     */
    export const maxInt: number;


    /**
     * Minimum representable safe integer in JavaScript.
     */
    export const minInt: number;


    /**
     * If `val` is `null` then return `undefined`, else return `val`.
     */
    export function nullToUndefined (val: any): any;


    /**
     * Returns `false` for all **falsy** values
     * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
     * and `true` for all **truthy** values.
     */
    export function toBool (x: any): boolean;




    /**
     * @name utils
     * @see {@link utils.js}
     */


    /**
     * Apply path to an object `o`.
     *
     * Example:
     *
     * ```
     * access({ a: { b: { c: 42 } } }, ["a", "b", "c"]) === 42
     * ```
     */
    export function access (o: object, path: string[], def?: any): any;


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
     * Do the deep-copy of any JavaScript object
     * that doesn't contain functions.
     */
    export function clone (o: object): object;


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
     * Check current runtime environment.
     */
    export function isBrowser (): boolean;


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
     * Generate a random positive integer.
     */
    export function randomInt (): number;


    /**
     * When `o == { a: "b", c: "d" }`
     * then `swap(o) == { b: "a", d: "c" }`.
     */
    export function swap (o: object): object;


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
    export const timeUnit: object;




}
