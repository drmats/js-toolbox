/**
 * Mathematical tools.
 *
 * @module @xcmats/js-toolbox/math
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { curry } from "~func/curry";




/**
 * Linear interpolation.
 *
 * @function interpolate
 * @param {Number} low lower output bound
 * @param {Number} high higher output bound
 * @param {Number} val value in range [0,1]
 *     (extrapolation done beyond that range)
 * @returns {Number}
 */
export const interpolate = curry((
    low: number,
    high: number,
    val: number,
): number =>
    val * (high - low) + low,
);
