/**
 * Struct - type declarations.
 *
 * @module @xcmats/js-toolbox/struct
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Construct function appropriate to use as the `children` argument
 * in the `struct.dfs` function. Use it with `struct.dfs` to
 * enumerate on any javascript object.
 */
export declare function hashAccessor ():
    (n: object) => [object, (string | number)[]][];




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
export declare function keyAccessor (
    ...path: (string | number)[]
): (n: object) => [object, (string | number)[]][];




/**
 * Depth-first search. Executes certain operation `f`
 * on each `tree` node in reduce-like fashion, accumulating
 * intermediate results.
 */
export declare function dfs<T> (
    tree?: object,
    f?: (
        accs: T[],
        node: object,
        path: (string | number)[],
        position: number
    ) => T,
    children?: (
        n: object
    ) => [object, (string | number)[]][]
): T;
