/**
 * Struct - type declarations.
 *
 * @module @xcmats/js-toolbox/struct
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/prefer-function-type */

import type { DataIndex } from "../struct/data";
import type { JSAnyArrObj, JSAnyObj } from "../type/defs";




/**
 * Construct function appropriate to use as the `children` argument
 * in the `struct.dfs` function. Use it with `struct.dfs` to
 * enumerate on any javascript object.
 */
export declare function hashAccessor (): {
    (n: JSAnyArrObj): [any, DataIndex[]][];
};




/**
 * Construct function appropriate to use as the `children` argument
 * in the `struct.dfs` function. Use it with `struct.dfs` if your
 * tree-like structure contains children organized as arrays.
 *
 * E.g. if a `node` is defined as follows:
 *
 * ```
 * node = { val: "something", props: { num: 14, ch: [node1, node2] } }
 * ```
 *
 * then `keyAccessor` should be defined in this way:
 *
 * ```
 * keyAccessor("props", "ch")
 * ```
 *
 * `keyAccessor` called without arguments (`keyAccessor()`) returns
 * `hashAccessor`.
 */
export declare function keyAccessor (...path: DataIndex[]): {
    (n: JSAnyArrObj): [any, DataIndex[]][];
};




/**
 * Depth-first search. Executes certain operation `f`
 * on each `tree` node in reduce-like fashion, accumulating
 * intermediate results.
 */
export declare function dfs<T> (): T;
export declare function dfs<T> (
    tree: JSAnyObj
): T;
export declare function dfs<T> (
    tree: JSAnyObj,
    f: (
        accs: readonly T[],
        node: JSAnyObj,
        path: DataIndex[],
        position: number
    ) => T
): T;
export declare function dfs<T> (
    tree: JSAnyObj,
    f: (
        accs: readonly T[],
        node: JSAnyObj,
        path: DataIndex[],
        position: number
    ) => T,
    children: (n: JSAnyArrObj) => [any, DataIndex[]][]
): T;
