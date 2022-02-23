/**
 * Mathematical tools.
 *
 * @module math
 * @license Apache-2.0
 * @author drmats
 */

import { curry } from "../func/curry";




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
