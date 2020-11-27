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
export declare function dict<
    T,
    Keys extends keyof T = keyof T
> (
    entries: [Keys, T][]
): { [k in Keys]: T };




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
export declare function objectMap<
    In,
    Keys extends keyof In = keyof In,
    Out
> (
    o: JSAnyObj<In>,
    f: (kv: [Keys, In[Keys]]) => [Keys, Out]
): { [k in Keys]: Out; };

export declare function objectMap<
    In,
    Keys extends keyof In = keyof In,
    Out
> (
    o: JSAnyObj<In>,
    f: (kv: [Keys, In[Keys]]) => [keyof any, Out]
): { [k in keyof any]: Out; };




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
export declare function objectReduce<
    In,
    Keys extends keyof In = keyof In,
    Out
> (
    o: JSAnyObj<In>,
    f: (acc: Out, kv: [Keys, In[Keys]]) => Out,
    init: Out
): Out;




/**
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 */
export declare function swap (
    o: Record<string, string>
): Record<string, string>;
