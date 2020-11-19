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
 * @param {T} val
 * @returns {undefined | T}
 */
export const nullToUndefined = <T extends unknown>(val: T): undefined | T =>
    val === null  ?  undefined  :  val;




/**
 * Returns `false` for all **falsy** values
 * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
 * and `true` for all **truthy** values.
 *
 * @function toBool
 * @param {unknown} x
 * @returns {Boolean}
 */
export const toBool = (x: unknown): boolean => !!x;
