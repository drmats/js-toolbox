/**
 * Various tools.
 *
 * @module utils
 * @license Apache-2.0
 */




import {
    isFunction,
    isObject,
} from "./type"




/**
 * Apply path to an object `o`.
 *
 * ```
 * access({ a: { b: { c: 42 } } }, ["a", "b", "c"]) -> 42
 * ```
 *
 * @function access
 * @param {Object} o
 * @param {Array.<String>} path
 * @returns {*}
 */
export const access = (o, path) => handleException(
    () => path.reduce((acc, p) => acc[p], o),
    () => undefined
)




/**
 * Functional replacement of a `switch` statement.
 *
 * @function choose
 * @param {String} key
 * @param {Object.<String, Function>} actions
 * @param {Function} defaultAction
 * @param {Array} args
 * @returns {*}
 */
export const choose = (
    key,
    actions = {},
    defaultAction = () => null,
    args = []
) =>
    key in actions ?
        actions[key](...args) :
        defaultAction(...args)




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
    (acc, [k, v,]) => ({ ...acc, [k]: v, }), {}
)




/**
 * Handle exceptions in expressions.
 *
 * @function handleException
 * @param {Function} fn
 * @param {Function} [handler]
 * @returns {*}
 */
export const handleException = (fn, handler = null) => {
    try { return fn() }
    catch (ex) { return isFunction(handler)  ?  handler(ex)  :  ex }
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
 * @param {Object} o
 * @param {Function} f
 * @returns {Object}
*/
export const objectMap = (o, f) => {
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "objectMap() expected object and function"
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
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "objectReduce() expected object and function"
    )
    return Object.entries(o).reduce((acc, kv) => f.call(o, acc, kv), init)
}




/**
 * When `o = { a: "b", c: "d" }`
 * then `swap(o) = { b: "a", d: "c" }`.
 *
 * @function swap
 * @param {Object.<String, String>} o
 * @returns {Object.<String, String>}
 */
export const swap = (o) => objectMap(o, ([k, v,]) => [v, k,])
