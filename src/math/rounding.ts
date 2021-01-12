/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */




import { curry } from "../func/curry";




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
export const clamp = curry((low: number, high: number, n: number) =>
    n < low  ?  low  :
        n >= low  &&  n < high  ?  n  :
            high,
);




/**
 * Round to the nearest integer if the given value is within
 * epsilon range of that integer. Default epsilon is `1e-9`,
 * which can be changed through `precision` parameter.
 *
 * @function roundIfClose
 * @param x
 * @param [precision=9]
 * @returns rounded number
 */
export function roundIfClose (x: number, precision = 9): number {
    return ((rounded) =>
        Math.abs(rounded - x) <= 10**(-precision)  ?  rounded  :  x
    )(Math.round(x));
}
