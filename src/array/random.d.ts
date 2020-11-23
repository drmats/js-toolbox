/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




import type {
    ArrStr,
    ChooseArrElOrStr,
} from "../type/consts";




/**
 * Choose a random element from a non-empty array.
 */
export declare function draw<T extends ArrStr> (
    arr: T
): ChooseArrElOrStr<T>;




/**
 * Shuffle all elements in the given array
 * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
 *
 * The operation is taken in-place.
 */
export declare function shuffle<T> (arr: T[]): T[];




/**
 * - `sparse(stop, size)` -> array of 'size' distinct integers
 *     in range `[0..stop-1]`
 * - `sparse(start, stop, size)` -> array of 'size' distinct integers
 *     in range `[start..stop-1]`
 *
 * Generate sparse array of distinct integers
 * with (almost) uniform distribution.
 */
export declare function sparse (...args: number[]): number[];
