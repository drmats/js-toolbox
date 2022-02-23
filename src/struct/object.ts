/**
 * Struct - type declarations.
 *
 * @module struct
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
    Fun,
    JSAnyArrObj,
    JSAnyObj,
} from "../type/defs";
import { curry } from "../func/curry";
import { flow } from "../func/combinators";
import { btquote } from "../utils/misc";
import {
    isFunction,
    isObject,
} from "../type/check";




/**
 * Do the deep-copy of any JavaScript object
 * that doesn't contain functions.
 *
 * @function clone
 * @param {JSAnyArrObj} o
 * @returns {JSAnyArrObj}
 */
export const clone = flow(
    JSON.stringify,
    JSON.parse,
) as (o: JSAnyArrObj) => JSAnyArrObj;




/**
 * Construct `Object` from the result of `Object.entries()` call.
 *
 * ```
 * entries = [[k1, v1], ..., [kn, vn]]
 * ```
 *
 * Imitates Python's `dict()`.
 *
 * @function dict
 * @param {Array.<Array>} entries
 * @returns {Object}
 */
export function dict<T> (
    entries: [PropertyKey, T][],
): { [k in PropertyKey]?: T; } {
    return entries.reduce(
        (acc, [k, v]) => ({ ...acc, [k]: v }), {},
    );
}




/**
 * Map (iteration) on objects - shallow.
 *
 * - `o` - `Object` to enumerate on.
 * - `f` - `Function` to call on each key, params:
 *     - `this` - bound to the enumerated object,
 *     - `kv` - current `[key, value]` array,
 *
 * `f` should return `[key, value]` array.
 *
 * @function objectMap
 * @param o Object
 * @param f Function
 * @returns Mapped object
 */
export const objectMap = curry((o: JSAnyObj, f: Fun) => {
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "struct.objectMap() expected object and function, " +
        `got ${btquote(o)} and ${btquote(f)}`,
    );
    return dict(Object.entries(o).map((kv => f.call(o, kv))));
}) as {
    /* specialized-case overload (output keys related to input keys) */
    <
        In extends JSAnyObj,
        Keys extends keyof In,
        Out = any,
    >(
        o: In,
        f: (kv: [Keys, In[Keys]]) => [Keys, Out]
    ): { [k in Keys]: Out; };
    /* specialized-case - curried */
    <In extends JSAnyObj>(
        o: In
    ): {
        <Keys extends keyof In, Out = any>(
            f: (kv: [Keys, In[Keys]]) => [Keys, Out]
        ): { [k in Keys]: Out; };
    };
    /* general-case overload (output keys not related to input keys) */
    <
        In extends JSAnyObj,
        Keys extends keyof In,
        Out = any,
    >(
        o: In,
        f: (kv: [Keys, In[Keys]]) => [PropertyKey, Out]
    ): { [k in PropertyKey]?: Out; };
    /* general-case - curried */
    <In extends JSAnyObj>(
        o: In
    ): {
        <Keys extends keyof In, Out = any>(
            f: (kv: [Keys, In[Keys]]) => [PropertyKey, Out]
        ): { [k in PropertyKey]?: Out; };
    };
};




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
 *
 * @function objectReduce
 * @param o Object
 * @param f Function
 * @param init T
 * @returns T
 */
export const objectReduce = curry((o: JSAnyObj, f: Fun, init: unknown) => {
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "struct.objectReduce() expected object and function, " +
        `got ${btquote(o)} and ${btquote(f)}`,
    );
    return Object.entries(o).reduce((acc, kv) => f.call(o, acc, kv), init);
}) as {
    /* uncurried */
    <
        In extends JSAnyObj,
        Keys extends keyof In,
        Out,
    >(
        o: In,
        f: (acc: Out, kv: [Keys, In[Keys]]) => Out,
        init: Out,
    ): Out;
    /* curried */
    <In extends JSAnyObj>(o: In): {
        <Keys extends keyof In, Out>(
            f: (acc: Out, kv: [Keys, In[Keys]]) => Out
        ): {
            (init: Out): Out;
        };
    };
};




/**
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 *
 * @function swap
 * @param {JSAnyObj} o
 * @returns {JSAnyObj}
 */
export const swap = (
    o: JSAnyObj,
): JSAnyObj => objectMap(o) (([k, v]) => [v, k]);
