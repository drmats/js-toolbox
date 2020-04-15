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
export function append (xs: any[]): (ys: any[]) => any[];




/**
 * Create object composed of keys resulting from application
 * of `iteratee` function to each element of the passed array `arr`.
 * Values corresponds to the number of occurences of an element
 * in the passed array.
 *
 * `iteratee` is optional and defaults to `identity` function.
 *
 * Example:
 *
 * ```
 * countBy(
 *     "exemplo plus quam ratione vivimus".split(" "),
 *     (w) => w.length
 * )
 * ```
 */
export function countBy (
    arr: any[], iteratee?: (el: any) => (any)
): object;




/**
 * Compute array as `a` \ `b` (set difference).
 */
export function difference (a: any[], b: any[]): any[];




/**
 * Choose a random element from a non-empty array.
 */
export function draw (arr: any[] | string): any | string;




/**
 * Drop the first `n` elements of a given array.
 * Returns array without the first `n` elements.
 */
export function drop (n: number): (arr: any[]) => any[];




/**
 * Drop the last `n` elements of a given array.
 * Returns array without the last `n` elements.
 */
export function dropLast (n: number): (arr: any[]) => any[];




/**
 * Find duplicates in a given array.
 *
 * Optionally, before comparision, each element is transformed by
 * `iteratee` function (which defaults to `identity`).
 *
 * Example:
 *
 * ```
 * findDuplicates(["one", "two", "one", "three", "six", "two", "two"])
 * ```
 */
export function findDuplicates (
    arr: any[],
    iteratee?: (el: any) => (any)
): string[];




/**
 * Simple array flattener.
 */
export function flatten (arr: any[][]): any[];




/**
 * Return first element of the given array.
 */
export function head (arr: any[] | string): any | string;




/**
 * Return array without its last element.
 */
export function init (arr: any[] | string): any[] | string;




/**
 * Compute array that is an intersection of `a` and `b` arrays.
 */
export function intersection (a: any[], b: any[]): any[];




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
 * Check if array `a` is a subset of array `b`.
 */
export function isSubset (a: any[], b: any[]): boolean;




/**
 * Return last element of the given array.
 */
export function last (arr: any[] | string): any | string;




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
export function range (...args: number[]): number[];




/**
 * Create a new array with removed duplicates.
 */
export function removeDuplicates (
    arr: any[],
    iteratee?: (el: any) => (any)
): string[];




/**
 * Check set equality of two arrays treated as sets.
 */
export function setEqual (a: any[], b: any[]): boolean;




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




/**
 * Return array without its head (first element).
 */
export function tail (arr: any[] | string): any[] | string;




/**
 * Take the first `n` elements of a given array.
 */
export function take (n: number): (arr: any[]) => any[];




/**
 * Take every `nth` element from an `arr` array.
 */
export function takeEvery (nth: number): (arr: any[]) => any[];




/**
 * Take the last `n` elements of a given array.
 */
export function takeLast (n: number): (arr: any[]) => any[];




/**
 * Zip given arrays using provided `f` operator.
 *
 * Example:
 *
 * ```
 * array.zipWith((a, b) => a + b)([1, 2, 3, 4], [10, 20, 30, 40])
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
