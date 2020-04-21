/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */




import { roundIfClose } from "./rounding"
import { curry } from "../func/curry"




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
export const log10 = x => roundIfClose(Math.log(x) / Math.LN10)




/**
 * Base 2 logarithm.
 *
 * @function log2
 * @param {Number} x
 * @returns {Number}
 */
export const log2 = x => roundIfClose(Math.log(x) / Math.LN2)




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
 * Subtract second value from the first value.
 *
 * @function sub
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
export const sub = curry((a, b) => Number(a) - Number(b))
