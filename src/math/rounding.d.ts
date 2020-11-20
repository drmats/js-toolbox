/**
 * Math - type declarations.
 *
 * @module @xcmats/js-toolbox/math
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Fit `n` in a [`low`, `high`] range
 * (inclusive of `low` and `high`).
 */
export declare function clamp (low: number, high: number, n: number): number;




/**
 * Round to the nearest integer if the given value is within
 * epsilon range of that integer. Default epsilon is `1e-9`,
 * which can be changed through `precision` parameter.
 */
export declare function roundIfClose (
    x: number,
    precision: number = 9
): number;
