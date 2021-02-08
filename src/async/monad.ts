/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */




import type { OneArgFun } from "../type/defs";
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
 * @param f f: a -> b
 * @returns (ma >>= f): mb
 */
export const bind: {
    /* uncurried */
    <A, B>(
        ma: Promise<A>, f: OneArgFun<A, B>,
    ): Promise<B>;
    /* curried */
    <A, B>(
        ma: Promise<A>,
    ): { (f: OneArgFun<A, B>): Promise<B>; };
} = curry(async <A, B>(
    ma: Promise<A>,
    f: OneArgFun<A, B>,
) => f(await ma));




/**
 * Time monad - `=<<`.
 *
 * @function rbind
 * @param f f: a -> b
 * @param ma
 * @returns (f =<< ma): mb
 */
export const rbind: {
    /* uncurried */
    <A, B>(
        f: OneArgFun<A, B>, ma: Promise<A>,
    ): Promise<B>;
    /* curried */
    <A, B>(
        f: OneArgFun<A, B>,
    ): { (ma: Promise<A>): Promise<B>; };
} = curry(async <A, B>(
    f: OneArgFun<A, B>,
    ma: Promise<A>,
) => f(await ma));
