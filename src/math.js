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
export const add = curry((a, b) => Number(a) + Number(b))




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
 * Decrement given value by one.
 *
 * @function dec
 * @param {Number} n
 * @returns {Number}
 */
export const dec = add(-1)




/**
 * Divide first value by the second value.
 *
 * @function div
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const div = curry((a, b) => Number(a) / Number(b))




/**
 * Increment given value by one.
 *
 * @function inc
 * @param {Number} n
 * @returns {Number}
 */
export const inc = add(1)




/**
 * Invert a given value.
 *
 * @function inv
 * @param {Number} n
 * @returns {Number}
 */
export const inv = div(1)




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
 * Divides the first argument by the second and returns the remainder.
 *
 * @function mod
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const mod = curry((a, b) => Number(a) % Number(b))




/**
 * Multiply two values.
 *
 * @function mul
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const mul = curry((a, b) => Number(a) * Number(b))




/**
 * Negate a given value.
 *
 * @function neg
 * @param {Number} n
 * @returns {Number}
 */
export const neg = mul(-1)




/**
 * Raise one value to the power of the second value.
 *
 * @function pow
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const pow = curry((a, b) => Number(a) ** Number(b))




/**
 * Compute product of numbers in a passed array.
 *
 * @function product
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export const product = (arr) => arr.reduce(mul, 1)




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
 * Subtract second value from the first value.
 *
 * @function sub
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const sub = curry((a, b) => Number(a) - Number(b))




/**
 * Compute sum of numbers in a passed array.
 *
 * @function sum
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export const sum = (arr) => arr.reduce(add, 0)
