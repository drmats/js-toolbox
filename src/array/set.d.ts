/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




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
 * Compute array that is an intersection of `a` and `b` arrays.
 */
export function intersection (a: any[], b: any[]): any[];




/**
 * Check if array `a` is a subset of array `b`.
 */
export function isSubset (a: any[], b: any[]): boolean;




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
