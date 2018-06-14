/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Determine if a given value is a `Function`.
 *
 * @function isFunction
 * @param {*} f
 * @returns {Boolean}
 */
export const isFunction = (f) =>
    f != null  &&  "function" === typeof f




/**
 * Determine if a given value is a proper `Number`
 * (not `NaN` and not `Infinity`).
 *
 * @function isNumber
 * @param {*} n
 * @returns {Boolean}
 */
export const isNumber = (n) =>
    n != null  &&  "number" === typeof n  &&
    !Number.isNaN(n)  &&  Number.isFinite(n)




/**
 * Determine if a given value is an `Object`
 * (not `null`, not `undefined` and not `Array`).
 *
 * @function isObject
 * @param {*} o
 * @returns {Boolean}
 */
export const isObject = (o) =>
    o != null  &&  "object" === typeof o  &&
    !Array.isArray(o)




/**
 * Determine if a given value is a `String`.
 *
 * @function isString
 * @param {*} s
 * @returns {Boolean}
 */
export const isString = (s) =>
    s != null  &&  "string" === typeof s




/**
 * Maximum representable safe integer in JavaScript.
 *
 * @name maxInt
 */
export const maxInt = Number.MAX_SAFE_INTEGER  ||  2 ** 53 - 1




/**
 * Minimum representable safe integer in JavaScript.
 *
 * @name minInt
 */
export const minInt = Number.MIN_SAFE_INTEGER  ||  -(2 ** 53) + 1




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 *
 * @function nullToUndefined
 * @param {*} val
 * @returns {*}
 */
export const nullToUndefined = (val) =>
    val === null  ?  undefined  :  val




/**
 * Returns `false` for all **falsy** values
 * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
 * and `true` for all **truthy** values.
 *
 * @function toBool
 * @param {*} x
 * @returns {Boolean}
 */
export const toBool = (x) => !!x
