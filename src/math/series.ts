/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */

import {
    add,
    mul,
} from "./arithmetic";




/**
 * Compute mathematical average of array of numbers.
 *
 * @function average
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export function average (arr: number[]): number {
    return sum(arr) / arr.length;
}




/**
 * Compute product of numbers in a passed array.
 *
 * @function product
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export function product (arr: number[]): number {
    return arr.reduce(mul, 1);
}




/**
 * Compute sum of numbers in a passed array.
 *
 * @function sum
 * @param {Array.<Number>} arr
 * @returns {Number}
 */
export function sum (arr: number[]): number {
    return arr.reduce(add, 0);
}
