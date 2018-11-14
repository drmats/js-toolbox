/**
 * Data structure manipulation tools.
 *
 * @module struct
 * @license Apache-2.0
 * @author drmats
 */




import {
    flow,
    partial,
    rearg,
    Y,
} from "./func"
import { quote } from "./string"
import {
    isFunction,
    isObject,
} from "./type"
import { handleException } from "./utils"




/**
 * Apply `path` to an object `o`. Return element reachable through
 * that `path` or `def` value.
 *
 * Example:
 *
 * ```
 * access({ a: { b: [10, { c: 42 }] } }, ["a", "b", 1, "c"])  ===  42
 * ```
 *
 * @function access
 * @param {Object} [o={}]
 * @param {Array.<String>} [path=[]]
 * @param {*} [def]
 * @returns {*}
 */
export const access = (o = {}, path = [], def = undefined) =>
    handleException(
        () => path.reduce((acc, p) => acc[p], o) || def,
        () => def
    )




/**
 * Do the deep-copy of any JavaScript object
 * that doesn't contain functions.
 *
 * @function clone
 * @param {Object} o
 * @returns {Object}
 */
export const clone = flow(JSON.stringify, JSON.parse)




/**
 * Construct function appropriate to use as the `children` argument
 * to the `struct.dfs` function.
 *
 * @function keyAccessor
 * @param  {...(Number|String)} path A path leading from the `node`
 *      to the `children` array.
 * @returns {Function}
 */
export const keyAccessor = (...path) =>
    (n) => access(n, path, []).map((c, i) => [c, path.concat([i])])




/**
 * Depth-first search. Executes certain operation `f`
 * on each `tree` node in reduce-like fashion, accumulating
 * intermediate results.
 *
 * @function dfs
 * @param {Object} tree Tree-like structure.
 * @param {Function} f Function to be executed on each node.
 *      Its signature is as follows: `function (accs, node, path, position)`,
 *      where:
 *      <ul>
 *          <li>`accs` - array of accumulated results,
 *              for each subtree of current `node`</li>
 *          <li>`node` - reference to current node</li>
 *          <li>`path` - current `node` is reachable by applying
 *              `struct.access` to `tree` and `path`</li>
 *          <li>`position` - position of currently processed node
 *              in an array of children (current node is "position-th"
 *              child of its parent)</li>
 *      </ul>
 * @param {Function} [children] Function that should accept `node` and return
 *      array of `n` tuples. In each tuple first element should be the `n`-th
 *      `child` of the `node` and second element should be the `path` leading
 *      from the `node` to the `n`-th `child`. If there is no children
 *      to given `node` then returned array should be empty.
 * @returns {*} Accumulated result for all subtree nodes.
 */
export const dfs = (
    tree = {},
    f = (_accs, node, _path, _position) => node,
    children = keyAccessor("children")
) => {
    let bquote = (x) => partial(rearg(quote)(1,0))("[]")(typeof x)
    if (
        !isObject(tree) || !isFunction(f) || !isFunction(children)
    ) throw new TypeError(
        "struct.dfs() expected object and 2 functions, " +
        `got ${bquote(tree)}, ${bquote(f)} and ${bquote(children)}`
    )
    return Y(
        (aux) =>
            (node, path, position) => f(
                children(node).map(
                    ([child, childPath], p) =>
                        aux(child, path.concat(childPath), p)
                ), node, path, position
            )
    )(tree, [], 0)
}




/**
 * Construct `Object` from the result of `Object.entries()` call.
 *
 * ```
 * entries = [[k1, v1,], ..., [kn, vn,]]
 * ```
 *
 * Imitates Python's `dict()`.
 *
 * @function dict
 * @param {Array.<Array>} entries
 * @returns {Object}
 */
export const dict = (entries) => entries.reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v }), {}
)




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
 * @param {Object} o
 * @param {Function} f
 * @returns {Object}
 */
export const objectMap = (o, f) => {
    let bquote = (x) => partial(rearg(quote)(1,0))("[]")(typeof x)
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "struct.objectMap() expected object and function, " +
        `got ${bquote(o)} and ${bquote(f)}`
    )
    return dict(Object.entries(o).map((kv) => f.call(o, kv)))
}




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
 * @param {Object} o
 * @param {Function} f
 * @param {*} init
 * @returns {*}
 */
export const objectReduce = (o, f, init) => {
    let bquote = (x) => partial(rearg(quote)(1,0))("[]")(typeof x)
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "struct.objectReduce() expected object and function, " +
        `got ${bquote(o)} and ${bquote(f)}`
    )
    return Object.entries(o).reduce((acc, kv) => f.call(o, acc, kv), init)
}




/**
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 *
 * @function swap
 * @param {Object.<String, String>} o
 * @returns {Object.<String, String>}
 */
export const swap = (o) => objectMap(o, ([k, v]) => [v, k])
