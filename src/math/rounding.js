/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */




import { curry } from "../func/curry"




/**
 * Fit `n` in a [`low`, `high`] range
 * (inclusive of `low` and `high`).
 *
 * @function clamp
 * @param {Number} low
 * @param {Nunmer} high
 * @param {Number} n
 * @returns {Number}
 */
export const clamp = curry((low, high, n) =>
    n < low  ?  low  :
        n >= low  &&  n < high  ?  n  :
            high
)




/**
 * Round to the nearest integer if the given value is within
 * epsilon range of that integer. Default epsilon is `1e-9`,
 * which can be changed through `precision` parameter.
 *
 * @function roundIfClose
 * @param {Number} x
 * @param {Number} [precision=9]
 * @returns {Number}
 */
export const roundIfClose = (x, precision = 9) => (
    (rounded) =>
        Math.abs(rounded - x) <= 10**(-precision)  ?  rounded  :  x
)(Math.round(x))
