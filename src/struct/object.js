/**
 * Data structure manipulation tools.
 *
 * @module struct
 * @license Apache-2.0
 * @author drmats
 */




import { curry } from "../func/curry"
import { flow } from "../func/combinators"
import { quote } from "../string/transform"
import {
    isFunction,
    isObject,
} from "../type/check"




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
export const dict = entries => entries.reduce(
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
export const objectMap = curry((o, f) => {
    let bquote = x => quote(typeof x, "[]")
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "struct.objectMap() expected object and function, " +
        `got ${bquote(o)} and ${bquote(f)}`
    )
    return dict(Object.entries(o).map(kv => f.call(o, kv)))
})




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
 * @param {any} init
 * @returns {any}
 */
export const objectReduce = curry((o, f, init) => {
    let bquote = x => quote(typeof x, "[]")
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "struct.objectReduce() expected object and function, " +
        `got ${bquote(o)} and ${bquote(f)}`
    )
    return Object.entries(o).reduce((acc, kv) => f.call(o, acc, kv), init)
})




/**
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 *
 * @function swap
 * @param {Record<String, String>} o
 * @returns {Record<String, String>}
 */
export const swap = o => objectMap(o, ([k, v]) => [v, k])
