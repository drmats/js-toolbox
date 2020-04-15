/**
 * Math - type declarations.
 *
 * @module @xcmats/js-toolbox/math
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Add two values.
 */
export function add (a: number, b: number): number;




/**
 * Compute mathematical average of array of numbers.
 */
export function average (arr: number[]): number;




/**
 * Fit `n` in a [`low`, `high`] range
 * (inclusive of `low` and `high`).
 */
export function clamp (low: number, high: number, n: number): number;




/**
 * Decrement given value by one.
 */
export function dec (n: number): number;




/**
 * Divide first value by the second value.
 */
export function div (a: number, b: number): number;




/**
 * Increment given value by one.
 */
export function inc (n: number): number;




/**
 * Invert a given value.
 */
export function inv (n: number): number;




/**
 * Base 10 logarithm.
 */
export function log10 (x: number): number;




/**
 * Base 2 logarithm.
 */
export function log2 (x: number): number;




/**
 * Divides the first argument by the second and returns the remainder.
 */
export function mod (a: number, b: number): number;




/**
 * Multiply two values.
 */
export function mul (a: number, b: number): number;




/**
 * Negate a given value.
 */
export function neg (n: number): number;




/**
 * Raise one value to the power of the second value.
 */
export function pow (a: number, b: number): number;




/**
 * Compute product of numbers in a passed array.
 */
export function product (arr: number[]): number;




/**
 * Generate a random positive integer.
 * NOT CRYPTOGRAPHICALLY SECURE.
 */
export function randomInt (): number;




/**
 * Round to the nearest integer if the given value is within
 * epsilon range of that integer. Default epsilon is `1e-9`,
 * which can be changed through `precision` parameter.
 */
export function roundIfClose (x: number, precision?: number): number;




/**
 * Subtract second value from the first value.
 */
export function sub (a: number, b: number): number;




/**
 * Compute sum of numbers in a passed array.
 */
export function sum (arr: number[]): number;
