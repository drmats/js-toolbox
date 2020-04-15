/**
 * Type - type declarations.
 *
 * @module @xcmats/js-toolbox/type
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Determine if a given value is an `Array`.
 */
export function isArray (a: any): boolean;




/**
 * Determine if a given value is a `Function`.
 */
export function isFunction (f: any): boolean;




/**
 * Determine if a given value is a proper `Number`
 * (not `NaN` and not `Infinity`).
 */
export function isNumber (n: any): boolean;




/**
 * Determine if a given value is an `Object`
 * (not `null`, not `undefined` and not `Array`).
 */
export function isObject (o: any): boolean;




/**
 * Determine if a given value is a `String`.
 */
export function isString (s: any): boolean;




/**
 * Maximum representable safe integer in JavaScript.
 */
export const maxInt: number;




/**
 * Minimum representable safe integer in JavaScript.
 */
export const minInt: number;




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 */
export function nullToUndefined (val: any): any;




/**
 * Returns `false` for all **falsy** values
 * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
 * and `true` for all **truthy** values.
 */
export function toBool (x: any): boolean;
