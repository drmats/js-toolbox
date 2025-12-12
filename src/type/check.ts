/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import type { Fun, JSAnyObj } from "../type/defs";




/**
 * Determine if a given value is an `Array`.
 *
 * @function isArray
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isArray = Array.isArray;




/**
 * Determine if a given value is a `Boolean`.
 *
 * @function isBoolean
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isBoolean = (c: unknown): c is boolean =>
    c != null  &&  "boolean" === typeof c;




/**
 * Determine if a given value is of `Date` type.
 *
 * @function isDate
 * @param {unknown} c
 * @returns {Date}
 */
export const isDate = (c: unknown): c is Date => c instanceof Date;




/**
 * Determine if a given value is a `Function`.
 *
 * @function isFunction
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isFunction = (c: unknown): c is Fun =>
    c != null  &&  "function" === typeof c;




/**
 * Determine if a given value is a proper `Number`
 * (not `NaN` and not `Infinity`).
 *
 * @function isNumber
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isNumber = (c: unknown): c is number =>
    c != null  &&  "number" === typeof c  &&
    !Number.isNaN(c)  &&  Number.isFinite(c);




/**
 * Determine if a given value is an `Object`
 * (not `null`, not `undefined` and not `Array`).
 *
 * @function isObject
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isObject = (c: unknown): c is JSAnyObj =>
    c != null  &&  "object" === typeof c  &&  !isArray(c);




/**
 * Determine if a given value is of `RegExp` type.
 *
 * @function isRegExp
 * @param {unknown} c
 * @returns {RegExp}
 */
export const isRegExp = (c: unknown): c is RegExp => c instanceof RegExp;




/**
 * Determine if a given value is a `String`.
 *
 * @function isString
 * @param {unknown} c
 * @returns {Boolean}
 */
export const isString = (c: unknown): c is string =>
    c != null  &&  "string" === typeof c;
