/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Choose a random element from a non-empty array.
 */
export function draw (arr: any[] | string): any | string;




/**
 * Shuffle all elements in the given array
 * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
 *
 * The operation is taken in-place.
 */
export function shuffle (arr: any[]): any[];




/**
 * - `sparse(stop, size)` -> array of 'size' distinct integers
 *     in range `[0..stop-1]`
 * - `sparse(start, stop, size)` -> array of 'size' distinct integers
 *     in range `[start..stop-1]`
 *
 * Generate sparse array of distinct integers
 * with (almost) uniform distribution.
 */
export function sparse (...args: number[]): number[];
