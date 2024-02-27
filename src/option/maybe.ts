/**
 * Carbon-copied Haskell's `Maybe` monad.
 *
 * @module option
 * @license Apache-2.0
 * @copyright Mat. 2023-present
 */

import { isObject } from "../type/check";
import { curry } from "../func/curry";




/**
 * 'Maybe' type internal trait.
 */
const __maybe: unique symbol = Symbol("__maybe");




/**
 * No value - type domain.
 */
export type Nothing = { readonly [__maybe]: false };




/**
 * No value - runtime domain.
 *
 * @constant NOTHING
 */
export const NOTHING: Nothing = { [__maybe]: false } as const;




/**
 * Value - type domain.
 */
export type Just<A> = { readonly [__maybe]: true; value: A };




/**
 * Value - runtime domain.
 * Monadic `return`.
 *
 * @function JUST
 * @param value
 * @returns Just<typeof value>
 */
export const JUST = <A>(value: A): Just<A> => ({ [__maybe]: true, value });




/**
 * No-value or value?
 */
export type Maybe<A> =
    | Nothing
    | Just<A>;




/**
 * Type assertion - does that value of `Maybe` type have value?
 *
 * @function hasValue
 * @param maybe
 * @return boolean
 */
export const hasValue = <A>(maybe: Maybe<A>): maybe is Just<A> =>
    isObject(maybe) && maybe[__maybe];




/**
 * Option monad - `>>=`;
 *
 * If `maybe` has value then apply `f` to it and return result.
 * Otherwise return `NOTHING`.
 *
 * @function bind
 * @param ma
 * @param f f: a -> mb
 * @returns (ma >>= f): mb
 */
export const bind: {
    /* uncurried */
    <A, B>(maybe: Maybe<A>, f: (value: A) => Maybe<B>): Maybe<B>;
    /* curried */
    <A, B>(maybe: Maybe<A>): (f: (value: A) => Maybe<B>) => Maybe<B>;
} = curry(
    <A, B>(maybe: Maybe<A>, f: (value: A) => Maybe<B>) =>
        hasValue(maybe) ? f(maybe.value) : NOTHING,
);




/**
 * Option monad - `=<<`;
 *
 * If `maybe` has value then apply `f` to it and return result.
 * Otherwise return `NOTHING`.
 *
 * @function rbind
 * @param f f: a -> mb
 * @param ma
 * @returns (f =<< ma): mb
 */
export const rbind: {
    /* uncurried */
    <A, B>(f: (value: A) => Maybe<B>, maybe: Maybe<A>): Maybe<B>;
    /* curried */
    <A, B>(f: (value: A) => Maybe<B>): (maybe: Maybe<A>) => Maybe<B>;
} = curry(
    <A, B>(f: (value: A) => Maybe<B>, maybe: Maybe<A>) =>
        hasValue(maybe) ? f(maybe.value) : NOTHING,
);




/**
 * Option monad - `ap`.
 *
 * Takes regular function and makes it `Maybe`-compatible.
 *
 * @function optionalize
 * @param f f: a -> b
 * @returns mf: ma -> mb
 */
export function optionalize<A, B> (
    f: (value: A) => B,
): (maybe: Maybe<A>) => Maybe<B> {
    return (maybe) => hasValue(maybe) ? JUST(f(maybe.value)) : NOTHING;
}
