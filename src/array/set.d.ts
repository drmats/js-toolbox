/**
 * Array - type declarations.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @author drmats
 */




import type { JSOneArgFun } from "../type";
import { identity } from "../func/tools";




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
 *     w => w.length
 * )
 * ```
 */
export declare function countBy (
    arr: unknown[],
    iteratee: JSOneArgFun = identity
): Record<string, unknown>;




/**
 * Compute array as `a` \ `b` (set difference).
 */
export declare function difference (a: unknown[], b: unknown[]): unknown[];




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
export declare function findDuplicates (
    arr: unknown[],
    iteratee: JSOneArgFun = identity
): string[];




/**
 * Compute array that is an intersection of `a` and `b` arrays.
 */
export declare function intersection (a: unknown[], b: unknown[]): unknown[];




/**
 * Check if array `a` is a subset of array `b`.
 */
export declare function isSubset (a: unknown[], b: unknown[]): boolean;




/**
 * Create a new array with removed duplicates.
 */
export declare function removeDuplicates (
    arr: unknown[],
    iteratee: JSOneArgFun = identity
): string[];




/**
 * Check set equality of two arrays treated as sets.
 */
export declare function setEqual (a: unknown[], b: unknown[]): boolean;
