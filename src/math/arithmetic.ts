/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */




import { roundIfClose } from "./rounding";
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
 * Divides the first argument by the second and returns the remainder.
 *
 * @function mod
 * @param a
 * @param b
 * @returns a%b
 */
export const mod = curry((a: number, b: number) => Number(a) % Number(b));




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
 * Subtract second value from the first value.
 *
 * @function sub
 * @param a
 * @param b
 * @returns a-b
 */
export const sub = curry((a: number, b: number) => Number(a) - Number(b));
