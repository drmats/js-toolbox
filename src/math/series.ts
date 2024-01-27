/**
 * Mathematical tools.
 *
 * @module @xcmats/js-toolbox/math
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { add, mul } from "~math/arithmetic";




/**
 * Compute mathematical average of array of numbers.
 *
 * @function average
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export function average (arr: readonly number[]): number {
    return sum(arr) / arr.length;
}




/**
 * Compute product of numbers in a passed array.
 *
 * @function product
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export function product (arr: readonly number[]): number {
    return arr.reduce(mul, 1);
}




/**
 * Compute sum of numbers in a passed array.
 *
 * @function sum
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export function sum (arr: readonly number[]): number {
    return arr.reduce(add, 0);
}
