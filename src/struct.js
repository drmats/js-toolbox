/**
 * Data structure manipulation tools.
 *
 * @module struct
 * @license Apache-2.0
 * @author drmats
 */




import {
    isFunction,
    isObject,
} from "./type"
import { handleException } from "./utils"




/**
 * Apply path to an object `o`.
 *
 * Example:
 *
 * ```
 * access({ a: { b: { c: 42 } } }, ["a", "b", "c"]) === 42
 * ```
 *
 * @function access
 * @param {Object} o
 * @param {Array.<String>} path
 * @param {*} [def=undefined]
 * @returns {*}
 */
export const access = (o, path, def = undefined) => handleException(
    () => path.reduce((acc, p) => acc[p], o) || def,
    () => def
)




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
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "utils.objectMap() expected object and function," +
        ` got ${typeof o} and ${typeof f}`
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
        "utils.objectReduce() expected object and function," +
        ` got ${typeof o} and ${typeof f}`
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