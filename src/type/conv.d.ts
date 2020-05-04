/**
 * Type - type declarations.
 *
 * @module @xcmats/js-toolbox/type
 * @license Apache-2.0
 * @author drmats
 */




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 */
export declare function nullToUndefined (val: unknown): unknown;




/**
 * Returns `false` for all **falsy** values
 * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
 * and `true` for all **truthy** values.
 */
export declare function toBool (x: unknown): boolean;
