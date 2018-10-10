/**
 * Javascript toolbox - type declarations.
 *
 * @module @xcmats/js-toolbox
 * @license Apache-2.0
 * @author drmats
 * @see {@link ../src/index.js}
 */




declare module "@xcmats/js-toolbox" {




    /**
     * @namespace array
     * @see {@link ../src/array.js}
     */
    export declare namespace array {

        /**
         * Create object composed of keys resulting from application
         * of `iteratee` function to each element of the passed array `arr`.
         * Values corresponds to the number of occurences of an element
         * in the passed array.
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
        export declare function countBy (
            arr: any[], iteratee?: (el: any) => (any)
        ): object;


        /**
         * Choose a random element from a non-empty array.
         */
        export declare function draw (arr: any[] | string): any[] | string;


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
        export declare function findDuplicates (
            arr: any[],
            iteratee?: (el: any) => (any)
        ): object;


        /**
         * Simple array flattener.
         */
        export declare function flatten (arr: any[][]): any[];


        /**
         * Return first element of the given array.
         */
        export declare function head (arr: any[] | string): any | string;


        /**
         * Return array without its last element.
         */
        export declare function init (arr: any[] | string): any[] | string;


        /**
         * Return last element of the given array.
         */
        export declare function last (arr: any[] | string): any | string;


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
        export declare function range (...args: number[]): number[];


        /**
         * Shuffle all elements in the given array
         * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
         *
         * The operation is taken in-place.
         */
        export declare function shuffle (arr: any[]): any[];


        /**
         * - `sparse(stop, size)` -> array of 'size' distinct integers
         *     in range `[0..stop-1]`
         * - `sparse(start, stop, size)` -> array of 'size' distinct integers
         *     in range `[start..stop-1]`
         *
         * Generate sparse array of distinct integers
         * with (almost) uniform distribution.
         */
        export declare function sparse (...args: number[]): number[];


        /**
         * Return array without its head (first element).
         */
        export declare function tail (arr: any[] | string): any[] | string;

    }

    export declare const countBy = array.countBy;
    export declare const draw = array.draw;
    export declare const findDuplicates = array.findDuplicates;
    export declare const flatten = array.flatten;
    export declare const head = array.head;
    export declare const init = array.init;
    export declare const last = array.last;
    export declare const range = array.range;
    export declare const shuffle = array.shuffle;
    export declare const sparse = array.sparse;
    export declare const tail = array.tail;




    /**
     * @namespace async
     * @see {@link ../src/async.js}
     */
    export declare namespace async {

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
        export declare function interval<T> (
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
         *     let x = await async.map(
         *         array.range(10),
         *         (x) => async.timeout(() => 4*x, 100*x)
         *     )
         *     console.log(x)
         * })()
         * ```
         */
        export declare function map<T> (
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
        export declare function parMap<T> (
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
         *     let x = await async.reduce(
         *         array.range(10),
         *         (acc, x) => async.timeout(() => acc+x, 100*x),
         *         0
         *     )
         *     console.log(x)
         * })()
         * ```
         */
        export declare function reduce<T> (
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
        export declare function repeat<T> (
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
        export declare function timeout<T> (
            f: () => T,
            clear?: (clearer: () => T) => void,
            time?: number
        ): Promise<T>;

    }

    export declare const delay = async.delay;
    export declare const interval = async.interval;
    export declare const asyncMap = async.map;
    export declare const parMap = async.parMap;
    export declare const asyncReduce = async.reduce;
    export declare const asyncRepeat = async.repeat;
    export declare const timeout = async.timeout;




    /**
     * @namespace codec
     * @see {@link ../src/codec.js}
     */
    export declare namespace codec {

        /**
         * Concatenate contents of a given byte arrays (Uint8Array)
         * into a new byte array (Uint8Array).
         */
        export declare function concatBytes (
            ...u8as: Uint8Array[]
        ): Uint8Array;


        /**
         * Compare two byte arrays.
         */
        export declare function compareBytes (
            u8a1: Uint8Array,
            u8a2: Uint8Array
        ): Uint8Array;


        /**
         * Convert given a utf8-encoded string to byte array (Uint8Array).
         */
        export declare function stringToBytes (s: string): Uint8Array;


        /**
         * Convert a given byte array (Uint8Array) to an utf8-encoded string.
         */
        export declare function bytesToString (bytes: Uint8Array): string;


        /**
         * Convert a hex-encoded string to a byte array (Uint8Array).
         *
         * If given `hexInput` is of odd length (hexInput.length % 2 !== 0)
         * then the last hex-digit is treated as full byte representation,
         * i.e.:
         *
         * ```
         * hexToBytes("fa6") <=> hexToBytes("fa06") <=> Uint8Array [ 250, 6 ]
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
        export declare function hexToBytes (hexInput: string): Uint8Array;


        /**
         * Convert a given byte array (Uint8Array) to a hex-encoded string.
         * Each byte is encoded on the two hexadecimal digits.
         */
        export declare function bytesToHex (bytes: Uint8Array): string;


        /**
         * Decode given Base64-encoded string into byte array (Uint8Array).
         */
        export declare function b64dec (s: string): Uint8Array;


        /**
         * Base64-encode given byte array (Uint8Array).
         */
        export declare function b64enc (bytes: Uint8Array): string;


        /**
         * Base64 decoding for strings (b64-string to utf8-string).
         */
        export declare function b64ToString (s: string): string;


        /**
         * Base64 encoding for strings (utf8-string to b64-string)
         */
        export declare function stringToB64 (s: string): string;


        /**
         * Covert a given b64-encoded string to a hex-encoded string.
         */
        export declare function b64ToHex (s: string): string;


        /**
         * Covert a given hex-encoded string to a b64-encoded string.
         */
        export declare function hexToB64 (s: string): string;

    }

    export declare const concatBytes = codec.concatBytes;
    export declare const compareBytes = codec.compareBytes;
    export declare const stringToBytes = codec.stringToBytes;
    export declare const bytesToString = codec.bytesToString;
    export declare const hexToBytes = codec.hexToBytes;
    export declare const bytesToHex = codec.bytesToHex;
    export declare const b64dec = codec.b64dec;
    export declare const b64enc = codec.b64enc;
    export declare const b64ToString = codec.b64ToString;
    export declare const stringToB64 = codec.stringToB64;
    export declare const b64ToHex = codec.b64ToHex;
    export declare const hexToB64 = codec.hexToB64;




    /**
     * @namespace func
     * @see {@link ../src/func.js}
     */
    export declare namespace func {

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
        export declare function compose (...fs: Function[]): Function;


        /**
         * Translate the evaluation of function `f` taking multiple arguments
         * into an evaluation of sequence of functions,
         * each with a single argument.
         *
         * ```
         * f(a, b, c, d)  <=>  curry(f)(a)(b)(c)(d)()
         * ```
         */
        export declare function curry <T> (
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
        export declare function partial<T> (
            f: (...args: any[]) => T
        ): (...init: any[]) => (...rest: any[]) => T;


        /**
         * Y-combinator (returns fixed point of a higher-order function
         * passed as `f`).
         */
        export declare function Y (f: Function): Function;

    }

    export declare const compose = func.compose;
    export declare const curry = func.curry;
    export declare const partial = func.partial;
    export declare const Y = func.Y;




    /**
     * @namespace math
     * @see {@link ../src/math.js}
     */
    export declare namespace math {

        /**
         * Compute mathematical average of array of numbers.
         */
        export declare function average (arr: number[]): number;


        /**
         * Base 10 logarithm.
         */
        export declare function log10 (x: number): number;


        /**
         * Base 2 logarithm.
         */
        export declare function log2 (x: number): number;


        /**
         * Round to the nearest integer if the given value is within
         * epsilon range of that integer. Default epsilon is `1e-9`,
         * which can be changed through `precision` parameter.
         */
        export declare function roundIfClose (x: number, precision?: number): number;


        /**
         * Compute sum of numbers in passed array.
         */
        export declare function sum (arr: number[]): number;

    }

    export declare const average = math.average;
    export declare const log10 = math.log10;
    export declare const log2 = math.log2;
    export declare const roundIfClose = math.roundIfClose;
    export declare const sum = math.sum;




    /**
     * @namespace redux
     * @see {@link ../src/redux.js}
     */
    export declare namespace redux {

        /**
         * Create clean and readable reducers for redux.
         */
        export declare function createReducer (initState?: object): Function;

    }

    export declare const createReducer = redux.createReducer;




    /**
     * @namespace string
     * @see {@link ../src/string.js}
     */
    export declare namespace string {

        /**
         * Return full set of ASCII letters.
         */
        export declare function asciiLetters (): string;


        /**
         * Return lowercase ASCII letters.
         */
        export declare function asciiLowercase (): string;


        /**
         * Return uppercase ASCII letters.
         */
        export declare function asciiUppercase (): string;


        /**
         * Allocate a big string (of size 2^n). Use with caution!
         *
         * - `big(16)` makes `2^16 = 65536` string size.
         * - `big(23)` makes `2^23 = 8M` string size,
         * - `big(24)` makes `16M` and so on.
         *
         * `c = "x"` - Character used during string generation.
         *
         * Example:
         *
         * ```
         * big(2) === "xxxx"
         * big(3, "a") === "aaaaaaaa"
         * ```
         */
        export declare function big (n: number, c?: string): string;


        /**
         * Convert `thisKindOfText` to `ThisKindOfText`.
         */
        export declare function camelToPascal (str: string): string;


        /**
         * Convert `thisKindOfText` to `this_kind_of_text`.
         */
        export declare function camelToSnake (str: string): string;


        /**
         * Ensure given string is in form `Aaaaaaaa`.
         */
        export declare function capitalize (str: string): string;


        /**
         * Return all digits.
         */
        export declare function digits (): string;


        /**
         * Constructs new string with inserted `sep` (of default value `…`)
         * at the `ellipsis.BEGIN`, `ellipsis.MIDDLE` or `ellipsis.END`.
         * Returned string has the same length as input string
         * (thus some original characters are replaced with `sep` contents).
         */
        export declare function ellipsis (
            str: string,
            placing?: number,
            sep?: string
        ): string;


        /**
         * Construct empty string.
         */
        export declare function empty (): string;


        /**
         * Convert `ThisKindOfText` to `thisKindOfText`.
         */
        export declare function pascalToCamel (str: string): string;


        /**
         * Convert `ThisKindOfText` to `this_kind_of_text`.
         */
        export declare function pascalToSnake (str: string): string;


        /**
         * Quote text.
         */
        export declare function quote (str?: string, q?: string): string;


        /**
         * Construct random string of desired length.
         */
        export declare function random (
            size?: number,
            letters?: string
        ): string;


        /**
         * Constructs new string not longer than `len`.
         */
        export declare function shorten (
            str: string,
            len?: number,
            placing?: number,
            sep?: string
        ): string;


        /**
         * Convert `this_kind_of_text` to `thisKindOfText`.
         */
        export declare function snakeToCamel (str: string): string;


        /**
         * Convert `this_kind_of_text` to `ThisKindOfText`.
         */
        export declare function snakeToPascal (str: string): string;


        /**
         * Wrap passed string with `prefix` and `suffix`.
         */
        export declare function wrap (
            str?: string,
            prefix?: string,
            suffix?: string
        ): string;

    }

    export declare const asciiLetters = string.asciiLetters;
    export declare const asciiLowercase = string.asciiLowercase;
    export declare const asciiUppercase = string.asciiUppercase;
    export declare const bigString = string.big;
    export declare const camelToPascal = string.camelToPascal;
    export declare const camelToSnake = string.camelToSnake;
    export declare const capitalize = string.capitalize;
    export declare const digits = string.digits;
    export declare const ellipsis = string.ellipsis;
    export declare const emptyString = string.empty;
    export declare const pascalToCamel = string.pascalToCamel;
    export declare const pascalToSnake = string.pascalToSnake;
    export declare const quote = string.quote;
    export declare const randomString = string.random;
    export declare const shorten = string.shorten;
    export declare const snakeToCamel = string.snakeToCamel;
    export declare const snakeToPascal = string.snakeToPascal;
    export declare const wrap = string.wrap;




    /**
     * @namespace type
     * @see {@link ../src/type.js}
     */
    export declare namespace type {

        /**
         * Determine if a given value is a `Function`.
         */
        export declare function isFunction (f: any): boolean;


        /**
         * Determine if a given value is a proper `Number`
         * (not `NaN` and not `Infinity`).
         */
        export declare function isNumber (n: any): boolean;


        /**
         * Determine if a given value is an `Object`
         * (not `null`, not `undefined` and not `Array`).
         */
        export declare function isObject (o: any): boolean;


        /**
         * Determine if a given value is a `String`.
         */
        export declare function isString (s: any): boolean;


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
        export declare function nullToUndefined (val: any): any;


        /**
         * Returns `false` for all **falsy** values
         * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
         * and `true` for all **truthy** values.
         */
        export declare function toBool (x: any): boolean;

    }

    export declare const isFunction = type.isFunction;
    export declare const isNumber = type.isNumber;
    export declare const isObject = type.isObject;
    export declare const isString = type.isString;
    export declare const maxInt = type.maxInt;
    export declare const minInt = type.minInt;
    export declare const nullToUndefined = type.nullToUndefined;
    export declare const toBool = type.toBool;




    /**
     * @namespace utils
     * @see {@link ../src/utils.js}
     */
    export declare namespace utils {

        /**
         * Apply path to an object `o`.
         *
         * Example:
         *
         * ```
         * access({ a: { b: { c: 42 } } }, ["a", "b", "c"]) === 42
         * ```
         */
        export declare function access (
            o: object,
            path: string[],
            def?: any
        ): any;


        /**
         * Functional replacement of a `switch` statement.
         */
        export declare function choose (
            key: string,
            actions?: object,
            defaultAction?: Function,
            args?: any[]
        ): any;


        /**
         * Do the deep-copy of any JavaScript object
         * that doesn't contain functions.
         */
        export declare function clone (o: object): object;


        /**
         * Determine runtime environment (is it development or not?).
         * `devEnv() -> true/false`
         *
         * When `strict` is not set to `true` then "development environment"
         * can be simulated by storing value of any type under "dev" key
         * in browser's sessionStorage, e.g. `sessionStorage[dev] = true`.
         */
        export declare function devEnv (strict: boolean): boolean;


        /**
         * Construct `Object` from the result of `Object.entries()` call.
         *
         * ```
         * entries = [[k1, v1,], ..., [kn, vn,]]
         * ```
         *
         * Imitates Python's `dict()`.
         */
        export declare function dict (entries: [string, any][]): object;


        /**
         * Get useful library configuration variables.
         */
        export declare function getLibConfig (): object;


        /**
         * Return global `process` variable if it exists.
         */
        export declare function getProcess (): object;


        /**
         * Handle exceptions in expressions.
         *
         * @function handleException
         * @param {Function} fn
         * @param {Function} [handler]
         * @returns {*}
         */
        export declare function handleException<T> (
            fn: () => T,
            handler?: (p: any) => T
        ): T;


        /**
         * Return value passed as a first argument.
         */
        export declare function identity<T> (val: T): T;


        /**
         * Check current runtime environment.
         */
        export declare function isBrowser (): boolean;


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
        export declare function objectMap (
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
        export declare function objectReduce<T> (
            o: object,
            f: (acc: T, kv: [string, any]) => T,
            init: T
        ): T;


        /**
         * Generate a random positive integer.
         * NOT CRYPTOGRAPHICALLY SECURE.
         */
        export declare function randomInt (): number;


        /**
         * When `o == { a: "b", c: "d" }`
         * then `swap(o) == { b: "a", d: "c" }`.
         */
        export declare function swap (o: object): object;


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
        export declare const timeUnit: TimeUnit;

    }

    export declare const access = utils.access;
    export declare const choose = utils.choose;
    export declare const clone = utils.clone;
    export declare const devEnv = utils.devEnv;
    export declare const dict = utils.dict;
    export declare const getLibConfig = utils.getLibConfig;
    export declare const getProcess = utils.getProcess;
    export declare const handleException = utils.handleException;
    export declare const identity = utils.identity;
    export declare const isBrowser = utils.isBrowser;
    export declare const objectMap = utils.objectMap;
    export declare const objectReduce = utils.objectReduce;
    export declare const randomInt = utils.randomInt;
    export declare const swap = utils.swap;
    export declare const timeUnit = utils.timeUnit;




}
