/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/prefer-function-type */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

import type { NullToUndefined, UndefinedToNull } from "../type/utils";
import { curry } from "../func/curry";




/**
 * If `val` is `null` then return `undefined`, else return `val`.
 *
 * @function nullToUndefined
 * @param {T} val
 * @returns {NullToUndefined<T>} `val` is ensured not to be `null`
 */
export const nullToUndefined = <T>(val: T): NullToUndefined<T> =>
    (val === null ? undefined : val) as NullToUndefined<T>;




/**
 * If `val` is `undefined` then return `null`, else return `val`.
 *
 * @function undefinedToNull
 * @param {T} val
 * @returns {UndefinedToNull<T>} `val` is ensured not to be `undefined`
 */
export const undefinedToNull = <T>(val: T): UndefinedToNull<T> =>
    (val === undefined ? null : val) as UndefinedToNull<T>;




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
    <L, R>(left: L, right: () => R): L extends null
        ? R
        : L extends undefined
            ? R
            : L;
    /* curried */
    <L>(left: L): {
        <R>(right: () => R): L extends null
            ? R
            : L extends undefined
                ? R
                : L;
    };
};
