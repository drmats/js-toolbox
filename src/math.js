/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */




import { curry } from "./func"
import { maxInt } from "./type"




/**
 * Add two values.
 *
 * @function add
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const add = curry((a, b) => a + b)




/**
 * Compute mathematical average of array of numbers.
 *
 * @function average
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export const average = (arr) => sum(arr) / arr.length




/**
 * If input is greater than zero then return it, else return zero.
 *
 * @function clamp
 * @param {Number} n
 * @returns {Number}
 */
export const clamp = (n) => n > 0 ? n : 0




/**
 * Base 10 logarithm.
 *
 * @function log10
 * @param {Number} x
 * @returns {Number}
 */
export const log10 = (x) => roundIfClose(Math.log(x) / Math.LN10)




/**
 * Base 2 logarithm.
 *
 * @function log2
 * @param {Number} x
 * @returns {Number}
 */
export const log2 = (x) => roundIfClose(Math.log(x) / Math.LN2)




/**
 * Generate a random positive integer.
 * NOT CRYPTOGRAPHICALLY SECURE.
 *
 * @function randomInt
 * @returns {Number}
 */
export const randomInt = () => Math.floor(Math.random() * (maxInt * 1e-3))




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




/**
 * Compute sum of numbers in passed array.
 *
 * @function sum
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export const sum = (arr) => arr.reduce(add, 0)
