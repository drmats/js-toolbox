/**
 * Array tools.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { ArrStr } from "../type/defs";
import type { ChooseArrElOrStr, ChooseArrOrStr } from "../type/utils";
import { dec } from "../math/arithmetic";




/**
 * Append `ys` to `xs` and return xs.
 *
 * @function append
 * @param {Array<T>} xs
 * @returns Concatenating function ys => xs . ys
 */
export function append<X> (xs: X[]): <Y>(ys: Y[]) => (X | Y)[] {
    return ys => {
        Array.prototype.push.apply(xs, ys);
        return xs;
    };
}




/**
 * Drop the first `n` elements of a given array or string.
 * Returns array or string without the first `n` elements.
 *
 * @function drop
 * @param {Number} n
 * @returns Function which takes `xs` and returns
 *      array or string without the first `n` elements.
 */
export function drop (
    n: number,
): <T extends ArrStr>(xs: T) => ChooseArrOrStr<T> {
    return <T extends ArrStr>(xs: T) =>
        xs.slice(n) as ChooseArrOrStr<T>;
}




/**
 * Drop the last `n` elements of a given array.
 * Returns array without the last `n` elements.
 *
 * @function dropLast
 * @param {Number} n
 * @returns Function which takes `xs` and returns
 *      array or string without the last `n` elements.
 */
export function dropLast (
    n: number,
): <T extends ArrStr>(xs: T) => ChooseArrOrStr<T> {
    return <T extends ArrStr>(xs: T) => (
        n >= xs.length ? [] : xs.slice(0, xs.length - n)
    ) as ChooseArrOrStr<T>;
}




/**
 * Return first element of the given array.
 *
 * @function head
 * @param {Array<T>|String} arr
 * @returns First element or type error is thrown.
 */
export function head<T extends ArrStr> (
    xs: T,
): ChooseArrElOrStr<T> {
    if (!xs.length) throw new TypeError("array.head() - empty list");
    return xs[0];
}




/**
 * Return array without its last element.
 *
 * @function init
 * @param {Array<T>|String} [arr]
 * @returns {Array<T>|String}
 */
export function init<T extends ArrStr> (
    xs: T,
): ChooseArrOrStr<T> {
    return xs.slice(0, dec(xs.length)) as ChooseArrOrStr<T>;
}




/**
 * Return the last element of the given array.
 *
 * @function last
 * @param {Array|String} arr
 * @returns Last element or type error is thrown.
 */
export function last<T extends ArrStr> (
    xs: T,
): ChooseArrElOrStr<T> {
    if (!xs.length) throw new TypeError("array.last() - empty list");
    return xs[dec(xs.length)];
}




/**
 * Return array without its head (first element).
 *
 * @function tail
 * @param {Array|String} arr
 * @returns {Array<T>|String}
 */
export function tail<T extends ArrStr> (
    xs: T,
): ChooseArrOrStr<T> {
    return xs.slice(1, xs.length) as ChooseArrOrStr<T>;
}




/**
 * Take the first `n` elements of a given array.
 *
 * @function take
 * @param {Number} n
 * @returns Function which takes `xs` and return first `n` elements
 *
 */
export function take (
    n: number,
): <T extends ArrStr>(xs: T) => ChooseArrOrStr<T> {
    return <T extends ArrStr>(xs: T) =>
        xs.slice(0, n) as ChooseArrOrStr<T>;
}




/**
 * Take the last `n` elements of a given array.
 *
 * @function takeLast
 * @param {Number} n
 * @returns Function which takes `xs` and return last `n` elements
 *
 */
export function takeLast (
    n: number,
): <T extends ArrStr>(xs: T) => ChooseArrOrStr<T> {
    return <T extends ArrStr>(xs: T) => (
        (n >= xs.length) ? xs : xs.slice(xs.length - n)
    ) as ChooseArrOrStr<T>;
}
