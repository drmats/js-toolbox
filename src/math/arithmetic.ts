/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { roundIfClose } from "../math/rounding";
import { curry } from "../func/curry";




/**
 * Add two values.
 *
 * @function add
 * @param a
 * @param b
 * @returns a+b
 */
export const add = curry((a: number, b: number) => Number(a) + Number(b));




/**
 * Decrement given value by one.
 *
 * @function dec
 * @param n
 * @returns n-1
 */
export const dec = add(-1);




/**
 * Divide first value by the second value.
 *
 * @function div
 * @param a
 * @param b
 * @returns a/b
 */
export const div = curry((a: number, b: number) => Number(a) / Number(b));




/**
 * Increment given value by one.
 *
 * @function inc
 * @param n
 * @returns n+1
 */
export const inc = add(1);




/**
 * Invert a given value.
 *
 * @function inv
 * @param n
 * @returns 1/n
 */
export const inv = div(1);




/**
 * Base 10 logarithm.
 *
 * @function log10
 * @param x
 * @returns log10(x)
 */
export function log10 (x: number): number {
    return roundIfClose(Math.log(x) / Math.LN10);
}




/**
 * Base 2 logarithm.
 *
 * @function log2
 * @param x
 * @returns log2(x)
 */
export function log2 (x: number): number {
    return roundIfClose(Math.log(x) / Math.LN2);
}




/**
 * Modulo - reversed arguments for curried version usage convenience.
 *
 * ```
 * mod(a, b) === mod(a) (b) === b `mod` a
 * ```
 *
 * ```
 * let mod10 = mod(10);
 * mod10(-3) === 7
 * ```
 *
 * @function mod
 * @param a
 * @param b
 * @returns b `mod` a
 */
export const mod = curry(
    (a: number, b: number): number =>
        Number(b) - (Number(a) * Math.floor(Number(b) / Number(a))),
);




/**
 * Multiply two values.
 *
 * @function mul
 * @param a
 * @param b
 * @returns a*b
 */
export const mul = curry((a: number, b: number) => Number(a) * Number(b));




/**
 * Negate a given value.
 *
 * @function neg
 * @param n
 * @returns -n
 */
export const neg = mul(-1);




/**
 * Raise one value to the power of the second value.
 *
 * @function pow
 * @param a
 * @param b
 * @returns a**b
 */
export const pow = curry((a: number, b: number) => Number(a) ** Number(b));




/**
 * Remainder - `%` operator - reversed arguments. See `mod`.
 *
 * @function remainder
 * @param a
 * @param b
 * @returns b%a
 */
export const remainder = curry((a: number, b: number) => Number(b) % Number(a));




/**
 * Subtract second value from the first value.
 *
 * @function sub
 * @param a
 * @param b
 * @returns a-b
 */
export const sub = curry((a: number, b: number) => Number(a) - Number(b));
