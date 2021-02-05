/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */




import type { OneArgFun } from "../type/defs";




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
 * @param f f: a -> b
 * @param ma
 * @returns (f >>= ma): mb
 */
export async function bind<A, B> (
    f: OneArgFun<A, B>, ma: Promise<A>,
): Promise<B> {
    return f(await ma);
}
