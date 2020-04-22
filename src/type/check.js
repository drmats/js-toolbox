/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Determine if a given value is an `Array`.
 *
 * @function isArray
 * @param {any} a
 * @returns {Boolean}
 */
export const isArray = Array.isArray




/**
 * Determine if a given value is a `Function`.
 *
 * @function isFunction
 * @param {any} f
 * @returns {Boolean}
 */
export const isFunction = f =>
    f != null  &&  "function" === typeof f




/**
 * Determine if a given value is a proper `Number`
 * (not `NaN` and not `Infinity`).
 *
 * @function isNumber
 * @param {any} n
 * @returns {Boolean}
 */
export const isNumber = n =>
    n != null  &&  "number" === typeof n  &&
    !Number.isNaN(n)  &&  Number.isFinite(n)




/**
 * Determine if a given value is an `Object`
 * (not `null`, not `undefined` and not `Array`).
 *
 * @function isObject
 * @param {any} o
 * @returns {Boolean}
 */
export const isObject = o =>
    o != null  &&  "object" === typeof o  &&  !isArray(o)




/**
 * Determine if a given value is a `String`.
 *
 * @function isString
 * @param {any} s
 * @returns {Boolean}
 */
export const isString = s =>
    s != null  &&  "string" === typeof s
