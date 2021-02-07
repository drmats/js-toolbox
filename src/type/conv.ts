/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




import { curry } from "../func/curry";




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 *
 * @function nullToUndefined
 * @param {T} val
 * @returns {undefined | T}
 */
export const nullToUndefined = <T extends unknown>(val: T): undefined | T =>
    val === null ? undefined : val;




/**
 * Returns `false` for all **falsy** values
 * (`false`, `0`, `""`, `null`, `undefined`, and `NaN`),
 * and `true` for all **truthy** values.
 *
 * @function toBool
 * @param {unknown} x
 * @returns {Boolean}
 */
export const toBool = (x: unknown): boolean => !!x;




/**
 * Lazy nullish coalescing (inspired by `??` operator, but with
 * `right` operand eager evaluation prevented using function abstracion).
 *
 * Returns its `right` operand when its `left` operand
 * is `null` or `undefined`, and otherwise returns its `left` operand.
 *
 * In assignments works almost as `||` operator, but also properly handle
 * values coercing to `false` (0 or empty string).
 *
 * @function lazyNullishCoalesce
 * @param left
 * @param right
 * @returns left ?? right()
 */
export const lazyNullishCoalesce = curry(
    <L, R>(left: L, right: () => R) => left == null ? right() : left,
) as {
    /* uncurried */
    <L, R>(left: L, right: () => R):
        L extends null ? R : L extends undefined ? R : L;
    /* curried */
    <L>(left: L): {
        <R>(right: () => R):
            L extends null ? R : L extends undefined ? R : L;
    };
};
