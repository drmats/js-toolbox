/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/prefer-function-type */

import type { Arr, Fun, OneArgFun } from "../type/defs";
import { curry } from "../func/curry";




/**
 * Time monad - `return`.
 *
 * @function unit
 * @param val
 * @returns promise
 */
export function unit<T> (val: T): Promise<T> {
    return Promise.resolve(val);
}




/**
 * Time monad - `>>=`.
 *
 * @function bind
 * @param ma
 * @param f f: a -> mb
 * @returns (ma >>= f): mb
 */
export const bind: {
    /* uncurried */
    <A, B>(
        ma: Promise<A>, f: OneArgFun<A, Promise<B>>,
    ): Promise<B>;
    /* curried */
    <A, B>(
        ma: Promise<A>,
    ): { (f: OneArgFun<A, Promise<B>>): Promise<B> };
} = curry(async <A, B>(
    ma: Promise<A>,
    f: OneArgFun<A, Promise<B>>,
) => await f(await ma));




/**
 * Time monad - `=<<`.
 *
 * @function rbind
 * @param f f: a -> mb
 * @param ma
 * @returns (f =<< ma): mb
 */
export const rbind: {
    /* uncurried */
    <A, B>(
        f: OneArgFun<A, Promise<B>>, ma: Promise<A>,
    ): Promise<B>;
    /* curried */
    <A, B>(
        f: OneArgFun<A, Promise<B>>,
    ): { (ma: Promise<A>): Promise<B> };
} = curry(async <A, B>(
    f: OneArgFun<A, Promise<B>>,
    ma: Promise<A>,
) => await f(await ma));




/**
 * Time monad - `ap`.
 *
 * @function ap
 * @param f f: a -> b
 * @returns mf: ma -> mb
 */
export function ap<A, B> (
    f: OneArgFun<A, B>,
): OneArgFun<Promise<A>, Promise<B>> {
    return async (ma: Promise<A>) => f(await ma);
}




/**
 * Time monad - `liftr`.
 *
 * @function liftr
 * @param f f: a[] -> b
 * @returns f: a[] -> mb
 */
export function liftr<A extends Arr, B> (
    f: Fun<A, B>,
): Fun<A, Promise<B>> {
    return (...x: A) => unit(f(...x));
}
