/**
 * Mathematical tools.
 *
 * @module @xcmats/js-toolbox/math
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { maxInt } from "~type/consts";




/**
 * Generate a random positive integer.
 * NOT CRYPTOGRAPHICALLY SECURE.
 *
 * @function randomInt
 * @returns {Number}
 */
export function randomInt (): number {
    return Math.floor(Math.random() * (maxInt * 1e-3));
}
