/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */




import {
    add,
    mul,
} from "./arithmetic"




/**
 * Compute mathematical average of array of numbers.
 *
 * @function average
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export const average = arr => sum(arr) / arr.length




/**
 * Compute product of numbers in a passed array.
 *
 * @function product
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export const product = arr => arr.reduce(mul, 1)




/**
 * Compute sum of numbers in a passed array.
 *
 * @function sum
 * @param {Array.<Number>} arr
 * @returns {Number}
 */

export const sum = arr => arr.reduce(add, 0)
