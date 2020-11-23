/**
 * Array tools.
 *
 * @module array
 * @license Apache-2.0
 * @author drmats
 */




import type { JSArrStr } from "../type/consts";
import { dec } from "../math/arithmetic";




/**
 * Utility type:
 * Infers one: `unknown[]` or `string` from `unknown[] | string` union type.
 * If `unknown[]` nor `string` can be inferred then it's `never`.
 */
type ArrOrStr<T = JSArrStr> = T extends (infer U)[]
    ? U[]
    : T extends string
    ? string
    : never;




/**
 * Utility type:
 * Infers one: `unknown` or `string` from `unknown[] | string` union type.
 * If `unknown` nor `string` can be inferred then it's `never`.
 */
type ArrElOrStr<T = JSArrStr> = T extends (infer U)[]
    ? U
    : T extends string
    ? string
    : never;




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
    n: number
): <T extends JSArrStr>(xs: T) => ArrOrStr<T> {
    return <T extends JSArrStr>(xs: T) =>
        xs.slice(n) as ArrOrStr<T>;
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
    n: number
): <T extends JSArrStr>(xs: T) => ArrOrStr<T> {
    return <T extends JSArrStr>(xs: T) => (
        n >= xs.length ? [] : xs.slice(0, xs.length - n)
    ) as ArrOrStr<T>;
}




/**
 * Return first element of the given array.
 *
 * @function head
 * @param {Array<T>|String} arr
 * @returns First element or type error is thrown.
 */
export function head<T extends JSArrStr> (
    [x]: T
): ArrElOrStr<T> {
    if (!x) throw new TypeError("array.head() - empty list");
    return x;
}




/**
 * Return array without its last element.
 *
 * @function init
 * @param {Array<T>|String} [arr]
 * @returns {Array<T>|String}
 */
export function init<T extends JSArrStr> (
    xs: T
): ArrOrStr<T> {
    return xs.slice(0, dec(xs.length)) as ArrOrStr<T>;
}




/**
 * Return the last element of the given array.
 *
 * @function last
 * @param {Array|String} arr
 * @returns Last element or type error is thrown.
 */
export function last<T extends JSArrStr> (
    xs: T
): ArrElOrStr<T> {
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
export function tail<T extends JSArrStr> (
    [_x, ...xs]: T
): ArrOrStr<T> {
    return xs as ArrOrStr<T>;
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
    n: number
): <T extends JSArrStr>(xs: T) => ArrOrStr<T> {
    return <T extends JSArrStr>(xs: T) =>
        xs.slice(0, n) as ArrOrStr<T>;
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
    n: number
): <T extends JSArrStr>(xs: T) => ArrOrStr<T> {
    return <T extends JSArrStr>(xs: T) => (
        (n >= xs.length) ? xs : xs.slice(xs.length - n)
    ) as ArrOrStr<T>;
}
