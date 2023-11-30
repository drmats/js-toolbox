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
export declare function flatten<T> (arr: readonly (readonly T[])[]): T[];




/**
 * Checks if a given array is a continuous block.
 */
export declare function isContinuous<T> (
    arr: readonly T[],
): boolean;
export declare function isContinuous<T extends (number | bigint)> (
    arr: readonly T[],
    neighbour: (a: T, b: T) => boolean,
): boolean;




/**
 * Checks if a given array is sorted.
 */
export declare function isSorted<T> (
    arr: readonly T[],
): boolean;
export declare function isSorted<T> (
    arr: readonly T[],
    cmp: (a: T, b: T) => boolean,
): boolean;




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
export declare function range (...args: readonly number[]): number[];




/**
 * Take every `nth` element from an `arr` array.
 */
export declare function takeEvery (
    nth: number,
): <T>(arr: readonly T[]) => T[];




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
export declare function zipWith<In, Out> (
    f: (...args: readonly In[]) => Out,
): (...arrs: readonly (readonly In[])[]) => Out[];




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
export declare function zip<T extends readonly (readonly unknown[])[]> (
    ...arrs: T,
): T;
