/**
 * Type constants.
 *
 * @module @xcmats/js-toolbox/type
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




/**
 * Maximum representable safe integer in JavaScript.
 *
 * @name maxInt
 */
export const maxInt = Number.MAX_SAFE_INTEGER  ??  2 ** 53 - 1;




/**
 * Minimum representable safe integer in JavaScript.
 *
 * @name minInt
 */
export const minInt = Number.MIN_SAFE_INTEGER  ??  -(2 ** 53) + 1;
