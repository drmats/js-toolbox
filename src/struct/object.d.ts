/**
 * Struct - type declarations.
 *
 * @module @xcmats/js-toolbox/struct
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type {
    JSAnyArrObj,
    JSAnyObj,
} from "../type/consts";




/**
 * Apply `path` to an object `o`. Return element reachable through
 * that `path` or `def` value.
 *
 * Example:
 *
 * ```
 * access({ a: { b: [10, { c: 42 }] } }, ["a", "b", 1, "c"])  ===  42
 * ```
 */
export declare function access<T extends any> (): T;
export declare function access<T extends any> (
    o: JSAnyArrObj,
): T;
export declare function access<T extends any> (
    o: JSAnyArrObj,
    path: (string | number)[],
): T;
export declare function access<T extends any> (
    o: JSAnyArrObj,
    path: (string | number)[],
    def: T
): T;




/**
 * Do the deep-copy of any JavaScript object
 * that doesn't contain functions.
 */
export declare function clone (o: JSAnyArrObj): JSAnyArrObj;




/**
 * Construct `Object` from the result of `Object.entries()` call.
 *
 * ```
 * entries = [[k1, v1,], ..., [kn, vn,]]
 * ```
 *
 * Imitates Python's `dict()`.
 */
export declare function dict (entries: [string, unknown][]): JSAnyObj;




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
    o: JSAnyObj,
    f: (kv: [string, unknown]) => [string, unknown]
): JSAnyObj;




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
    o: JSAnyObj,
    f: (acc: T, kv: [string, unknown]) => T,
    init: T
): T;




/**
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 */
export declare function swap (o: Record<string, string>):
    Record<string, string>;
