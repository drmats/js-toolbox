/**
 * Array - type declarations.
 *
 * @module array
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import type { OneArgFun } from "../type/defs";




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
export declare function countBy<T extends string | number> (
    arr: readonly T[],
): Record<string | number, number>;
export declare function countBy<T> (
    arr: readonly T[],
    iteratee: OneArgFun<T, string | number>,
): Record<string | number, number>;




/**
 * Compute array as `a` \ `b` (set difference).
 */
export declare function difference<T> (a: readonly T[], b: readonly T[]): T[];




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
export declare function findDuplicates<T extends string | number> (
    arr: readonly T[],
): string[];
export declare function findDuplicates<T> (
    arr: readonly T[],
    iteratee: OneArgFun<T, string | number>,
): string[];




/**
 * Compute array that is an intersection of `a` and `b` arrays.
 */
export declare function intersection<T> (
    a: readonly T[],
    b: readonly T[],
): T[];




/**
 * Check if array `a` is a subset of array `b`.
 */
export declare function isSubset<T> (
    a: readonly T[],
    b: readonly T[],
): boolean;




/**
 * Create a new array with removed duplicates.
 */
export declare function removeDuplicates<T extends string | number> (
    arr: readonly T[],
): string[];
export declare function removeDuplicates<T> (
    arr: readonly T[],
    iteratee: OneArgFun<T, string | number>
): string[];




/**
 * Check set equality of two arrays treated as sets.
 */
export declare function setEqual<T> (
    a: readonly T[],
    b: readonly T[],
): boolean;
