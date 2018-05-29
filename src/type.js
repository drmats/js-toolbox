/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 */




/**
 * Determine if a given value is a `Function`.
 *
 * @function isFunction
 * @param {*} f
 * @returns {Boolean}
 */
export const isFunction = (f) =>
    f != null  &&  typeof f === "function"




/**
 * Determine if a given value is a proper `Number`
 * (not `NaN` and not `Infinity`).
 *
 * @function isNumber
 * @param {*} n
 * @returns {Boolean}
 */
export const isNumber = (n) =>
    n != null  &&  typeof n === "number"  &&
    !Number.isNaN(n)  && Number.isFinite(n)




/**
 * Determine if a given value is an `Object`
 * (not `null`, not `undefined` and not `Array`).
 *
 * @function isObject
 * @param {*} o
 * @returns {Boolean}
 */
export const isObject = (o) =>
    o != null  &&  typeof o === "object"  &&  !Array.isArray(o)




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 *
 * @function nullToUndefined
 * @param {*} val
 * @returns {*}
 */
export const nullToUndefined = (val) => val === null  ?  undefined  :  val
