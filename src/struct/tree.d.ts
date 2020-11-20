/**
 * Struct - type declarations.
 *
 * @module @xcmats/js-toolbox/struct
 * @license Apache-2.0
 * @author drmats
 */




import type {
    JSAnyArrObj,
    JSAnyObj,
} from "../type/consts";




/**
 * Construct function appropriate to use as the `children` argument
 * in the `struct.dfs` function. Use it with `struct.dfs` to
 * enumerate on any javascript object.
 */
export declare function hashAccessor ():
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n: JSAnyArrObj) => [any, (string | number)[]][];




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
export declare function keyAccessor (...path: (string | number)[]):
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (n: JSAnyArrObj) => [any, (string | number)[]][];




/**
 * Depth-first search. Executes certain operation `f`
 * on each `tree` node in reduce-like fashion, accumulating
 * intermediate results.
 */
export declare function dfs<T> (
    tree: JSAnyObj = {},
    f: (
        accs: T[],
        node: JSAnyObj,
        path: (string | number)[],
        position: number
    ) => T = (_accs, node, _path, _position) => node,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (n: JSAnyArrObj) => [any, (string | number)[]][] = keyAccessor()
): T;
