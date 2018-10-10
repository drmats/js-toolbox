/**
 * Various tools.
 *
 * @module utils
 * @license Apache-2.0
 * @author drmats
 */




import {
    isFunction,
    isObject,
    isString,
    maxInt,
    toBool,
} from "./type"




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
 * Do the deep-copy of any JavaScript object
 * that doesn't contain functions.
 *
 * @function clone
 * @param {Object} o
 * @returns {Object}
 */
export const clone = (o) => JSON.parse(JSON.stringify(o))




/**
 * Determine runtime environment (is it development or not?).
 * `devEnv() -> true/false`
 *
 * When `strict` is not set to `true` then "development environment"
 * can be simulated by storing value of any type under "dev" key
 * in browser's sessionStorage, e.g. `sessionStorage[dev] = true`.
 *
 * @function devEnv
 * @param {Boolean} [strict=false]
 * @returns {Boolean}
 */
export const devEnv = (strict = false) =>
    (
        // if you're in browser and not in strict mode
        // then check if there is "dev" key in `sessionStorage`
        isBrowser()  &&  !strict ?
            handleException(
                () => Object.prototype.hasOwnProperty.call(
                    sessionStorage, "dev"
                ),
                () => false
            ) : false
    )  ||  (
        // or if there is a `string` under `process.env.NODE_ENV`
        // and it is not equal to "production"
        isString(access(getProcess(), ["env", "NODE_ENV",]))  &&
        access(getProcess(), ["env", "NODE_ENV",]) !== "production"
    )  ||  (
        // or, maybe, you're not in browser
        // and there is no `string` under `process.env.NODE_ENV`,
        // which happens in "bare" node.js console
        !isBrowser()  &&
        !isString(access(getProcess(), ["env", "NODE_ENV",]))
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
    (acc, [k, v,]) => ({ ...acc, [k]: v, }), {}
)




/**
 * Return global `process` variable if it exists.
 * Also give "transform-inline-environment-variables" plugin a chance.
 *
 * @function getProcess
 * @returns {Object}
 */
export const getProcess = () => (
    (envvars) =>
        // eslint-disable-next-line
        isObject(process) ? {
            ...process,
            // eslint-disable-next-line
            browser: toBool(process.browser),
            env: {
                ...process.env,
                ...envvars,
            },
        } : {
            // eslint-disable-next-line
            browser: toBool(process.browser),
            env: envvars,
        }
)({
    NODE_ENV: handleException(
        // eslint-disable-next-line
        () => process.env.NODE_ENV
    ),
    BABEL_ENV: handleException(
        // eslint-disable-next-line
        () => process.env.BABEL_ENV
    ),
})




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
 * Return value passed as a first argument.
 *
 * @function identity
 * @param {*} val
 * @returns {*}
 */
export const identity = (val) => val




/**
 * Check current runtime environment.
 *
 * @function isBrowser
 * @returns {Boolean}
 */
export const isBrowser = () => toBool(getProcess().browser)




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
 * Generate a random positive integer.
 * NOT CRYPTOGRAPHICALLY SECURE.
 *
 * @function randomInt
 * @returns {Number}
 */
export const randomInt = () => Math.floor(Math.random() * (maxInt * 1e-3))




/**
 * When `o == { a: "b", c: "d" }`
 * then `swap(o) == { b: "a", d: "c" }`.
 *
 * @function swap
 * @param {Object.<String, String>} o
 * @returns {Object.<String, String>}
 */
export const swap = (o) => objectMap(o, ([k, v,]) => [v, k,])




/**
 * Time units represented in milliseconds.
 *
 * - `second` - `1000 milliseconds`
 * - `minute` - `60 seconds`
 * - `hour` - `60 minutes`
 * - `day` - `24 hours`
 * - `week` - `7 days`
 * - `month` - [**average** month]: `30.4375 days` (`365.25 days / 12`)
 * - `quarter` - [**average** quarter]: `3 months` (`365.25 days / 4`)
 * - `year` - [**average** year]: `365.25 days`
 *
 * @name timeUnit
 */
export const timeUnit = Object.freeze({
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2629800000,
    quarter: 7889400000,
    year: 31557600000,
})
