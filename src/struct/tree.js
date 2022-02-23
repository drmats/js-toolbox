/**
 * Data structure manipulation tools.
 *
 * @module struct
 * @license Apache-2.0
 * @author drmats
 */

import { access } from "./data"
import { choose } from "../func/choice"
import { Y } from "../func/combinators"
import { empty } from "../string/consts"
import {
    isArray,
    isFunction,
    isObject,
} from "../type/check"
import { btquote } from "../utils/misc"




/**
 * Construct function appropriate to use as the `children` argument
 * in the `struct.dfs` function. Use it with `struct.dfs` to
 * enumerate on any javascript object.
 *
 * @function hashAccessor
 * @see {@link module:struct~dfs}
 * @returns {Function}
 */
export const hashAccessor = () =>
    n => choose(
        [isObject(n), isArray(n)].map(v => v ? 1 : 0).join(empty()), {
            "10": () => Object.keys(n).map(k => [n[k], [k]]),
            "01": () => n.map((v, i) => [v, [i]]),
        }, () => [],
    )




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
 *
 * @function keyAccessor
 * @see {@link module:struct~dfs}
 * @see {@link module:struct~hashAccessor}
 * @param  {...(Number|String)} path A path leading from the `node`
 *      to the `children` array.
 * @returns {Function}
 */
export const keyAccessor = (...path) =>
    path.length > 0 ?
        n => access(n, path, []).map((c, i) => [c, [...path, i]]) :
        hashAccessor()




/**
 * Depth-first search. Executes certain operation `f`
 * on each `tree` node in reduce-like fashion, accumulating
 * intermediate results.
 *
 * @function dfs
 * @see {@link module:struct~keyAccessor}
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
 *      under given `node` then returned array should be empty.
 * @returns {any} Accumulated result for all subtree nodes.
 */
export const dfs = (
    tree = {},
    f = (_accs, node, _path, _position) => node,
    children = keyAccessor(),
) => {
    if (
        !isObject(tree) || !isFunction(f) || !isFunction(children)
    ) throw new TypeError(
        "struct.dfs() expected object and 2 functions, " +
        `got ${btquote(tree)}, ${btquote(f)} and ${btquote(children)}`,
    )
    return Y(aux =>
        (node, path, position) => f(
            children(node).map(
                ([child, childPath], p) =>
                    aux(child, path.concat(childPath), p),
            ), node, path, position,
        ),
    ) (tree, [], 0)
}
