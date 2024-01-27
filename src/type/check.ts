/**
 * Type tools.
 *
 * @module @xcmats/js-toolbox/type
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Fun, JSAnyObj } from "~type/defs";




/**
 * Determine if a given value is an `Array`.
 *
 * @function isArray
 * @param {any} a
 * @returns {Boolean}
 */
export const isArray = Array.isArray;




/**
 * Determine if a given value is a `Function`.
 *
 * @function isFunction
 * @param {any} f
 * @returns {Boolean}
 */
export const isFunction = (f: unknown): f is Fun =>
    f != null  &&  "function" === typeof f;




/**
 * Determine if a given value is a proper `Number`
 * (not `NaN` and not `Infinity`).
 *
 * @function isNumber
 * @param {any} n
 * @returns {Boolean}
 */
export const isNumber = (n: unknown): n is number =>
    n != null  &&  "number" === typeof n  &&
    !Number.isNaN(n)  &&  Number.isFinite(n);




/**
 * Determine if a given value is an `Object`
 * (not `null`, not `undefined` and not `Array`).
 *
 * @function isObject
 * @param {any} o
 * @returns {Boolean}
 */
export const isObject = (o: unknown): o is JSAnyObj =>
    o != null  &&  "object" === typeof o  &&  !isArray(o);




/**
 * Determine if a given value is a `String`.
 *
 * @function isString
 * @param {any} s
 * @returns {Boolean}
 */
export const isString = (s: unknown): s is string =>
    s != null  &&  "string" === typeof s;




/**
 * Determine if a given value is a `Boolean`.
 *
 * @function isBoolean
 * @param {any} b
 * @returns {Boolean}
 */
export const isBoolean = (b: unknown): b is boolean =>
    b != null  &&  "boolean" === typeof b;
