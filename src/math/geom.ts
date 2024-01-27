/**
 * Mathematical tools.
 *
 * @module @xcmats/js-toolbox/math
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




/**
 * Convert radians to degrees.
 *
 * @function degrees
 * @param {Number} radians
 * @returns {Number}
 */
export function degrees (radians: number): number {
    return radians * (180.0 / Math.PI);
}




/**
 * Convert degrees to radians.
 *
 * @function radians
 * @param {Number} degrees
 * @returns {Number}
 */
export function radians (degrees: number): number {
    return degrees * (Math.PI / 180.0);
}
