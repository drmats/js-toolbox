/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Simple array flattener.
 */
export function flatten (arr: any[][]): any[];




/**
 * Checks if a given array is a continuous block.
 */
export function isContinuous<T> (
    arr: T[],
    cmp?: (a: T, b: T) => boolean
): boolean;




/**
 * Checks if a given array is sorted.
 */
export function isSorted<T> (
    arr: T[],
    cmp?: (a: T, b: T) => boolean
): boolean;




/**
 * Take every `nth` element from an `arr` array.
 */
export function takeEvery (nth: number): (arr: any[]) => any[];




/**
 * Zip given arrays using provided `f` operator.
 *
 * Example:
 *
 * ```
 * array.zipWith((a, b) => a + b) ([1, 2, 3, 4], [10, 20, 30, 40])
 * [ 11, 22, 33, 44 ]
 * ```
 */
export function zipWith<T> (
    f: (...args: any[]) => T
): (...arrs: any[][]) => T[];




/**
 * Zip given arrays.
 *
 * Example:
 *
 * ```
 * zip([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"])
 * [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ], [ 4, 'd' ], [ 5, 'e' ] ]
 * ```
 */
export function zip (...arrs: any[][]): any[][];
