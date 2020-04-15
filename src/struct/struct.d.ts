/**
 * Struct - type declarations.
 *
 * @module @xcmats/js-toolbox/struct
 * @license Apache-2.0
 * @author drmats
 */




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
export function access (
    o?: object,
    path?: (string | number)[],
    def?: any
): any;




/**
 * Do the deep-copy of any JavaScript object
 * that doesn't contain functions.
 */
export function clone (o: object): object;




/**
 * Construct function appropriate to use as the `children` argument
 * in the `struct.dfs` function. Use it with `struct.dfs` to
 * enumerate on any javascript object.
 */
export function hashAccessor ():
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
export function keyAccessor (
    ...path: (string | number)[]
): (n: object) => [object, (string | number)[]][];




/**
 * Depth-first search. Executes certain operation `f`
 * on each `tree` node in reduce-like fashion, accumulating
 * intermediate results.
 */
export function dfs<T> (
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
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 */
export function swap (o: object): object;
