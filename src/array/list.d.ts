/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Append `ys` to `xs` and return xs.
 */
export declare function append (xs: unknown[]): (ys: unknown[]) => unknown[];




/**
 * Drop the first `n` elements of a given array.
 * Returns array without the first `n` elements.
 */
export declare function drop (n: number): (arr: unknown[]) => unknown[];




/**
 * Drop the last `n` elements of a given array.
 * Returns array without the last `n` elements.
 */
export declare function dropLast (n: number): (arr: unknown[]) => unknown[];




/**
 * Return first element of the given array.
 */
export declare function head (arr: unknown[] | string): unknown | string;




/**
 * Return array without its last element.
 */
export declare function init (arr: unknown[] | string): unknown[] | string;




/**
 * Return last element of the given array.
 */
export declare function last (arr: unknown[] | string): unknown | string;




/**
 * - `range(stop)` -> array of numbers; start defaults to `0`
 * - `range(start, stop[, step])` -> array of numbers
 *
 * Return a list containing an arithmetic progression.
 * - `range(i, j)` returns `[i, i+1, i+2, ..., j-1]`.
 *
 * When step is given, it specifies the increment (or decrement).
 * For example:
 * - `range(4)` returns `[0, 1, 2, 3]`.
 *
 * Imitates Python's `range()`.
 */
export declare function range (...args: number[]): number[];




/**
 * Return array without its head (first element).
 */
export declare function tail (arr: unknown[] | string): unknown[] | string;




/**
 * Take the first `n` elements of a given array.
 */
export declare function take (n: number): (arr: unknown[]) => unknown[];




/**
 * Take the last `n` elements of a given array.
 */
export declare function takeLast (n: number): (arr: unknown[]) => unknown[];
