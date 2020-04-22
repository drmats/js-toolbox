/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 *
 * @function nullToUndefined
 * @param {any} val
 * @returns {any}
 */
export const nullToUndefined = val =>
    val === null  ?  undefined  :  val




/**
 * Returns `false` for all **falsy** values
 * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
 * and `true` for all **truthy** values.
 *
 * @function toBool
 * @param {any} x
 * @returns {Boolean}
 */
export const toBool = x => !!x
