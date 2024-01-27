/**
 * Functional programming tools.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { Fun } from "../type/defs";
import type { Head, Length, Tail } from "../type/list";




/**
 * Recursive type for curried functions.
 */
export type CurryFun<
    F extends Fun,
    P extends any[] = Parameters<F>,
    R = ReturnType<F>,
> = Length<P> extends 0 ?
    () => R :
    Length<P> extends 1 ?
        (x: Head<P>) => R :
        (x: Head<P>) => CurryFun<(...args: Tail<P>) => R>;




/**
 * `curry` and `curryN` return type.
 */
type CurryReturnType<
    F extends Fun,
> = Length<Parameters<F>> extends 0 | 1 ?
        F : F & CurryFun<F>;




/**
 * Recursive type for thunk-curried functions.
 */
export type ThunkFun<
    F extends Fun,
    P extends any[] = Parameters<F>,
    R = ReturnType<F>,
> = Length<P> extends 0 ?
    () => R :
    (x: Head<P>) => ThunkFun<(...args: Tail<P>) => R>;




/**
 * Return curried form of a given function `f`.
 *
 * If funcion `f` has _arity_ 3, and `g = curry(f)` then
 * a following invocations have the same result:
 *
 * ```
 * g(a,  b,  c)
 * g(a,  b) (c)
 * g(a) (b,  c)
 * g(a) (b) (c)
 * ```
 *
 * Function `f`'s _arity_ is obtained by checking it's `.length`
 * property, so if function `f` is defined with a _rest parameter_
 * then this parameter is excluded. Also, only parameters before
 * the first one with a default value are included.
 *
 * @function curry
 * @param {Function} f
 * @returns {CurryFun}
 */
export function curry<F extends Fun> (f: F): CurryReturnType<F> {
    return curryN(f.length, f);
}




/**
 * Translate the evaluation of function `f` taking `n` arguments
 * into an evaluation of sequence of `n` functions, where each
 * next function is a result of previous function evaluation.
 *
 * ```
 * f(a, b, c, d, e)  <=>  curryN(5, f) (a) (b) (c) (d) (e)
 * ```
 *
 * @function curryN
 * @param {Number} n
 * @param {Function} f
 * @returns {CurryFun}
 */
export function curryN<F extends Fun> (n: number, f: F): CurryReturnType<F> {
    return (
        (...args: any[]) =>
            n <= args.length ?
                f(...args) :
                curryN(n - args.length, partial(f) (...args))
    ) as CurryReturnType<F>;
}




/**
 * Translate the evaluation of function `f` taking multiple arguments
 * into an evaluation of sequence of functions, each with a single argument.
 *
 * Because `curryThunk` doesn't assume anything on passed function
 * `f` _arity_, final invocation has to be done with no arguments.
 *
 * ```
 * f(a, b, c, d)  <=>  curryThunk(f) (a) (b) (c) (d) ()
 * ```
 *
 * @function curryThunk
 * @param {Function} f
 * @returns {ThunkFun}
 */
export function curryThunk<F extends Fun> (f: F): ThunkFun<F> {
    return (
        (...args: any[]) =>
            args.length === 0 ?
                f() :
                curryThunk(partial(f) (...args))
    ) as ThunkFun<F>;
}




/**
 * Partial application.
 *
 * Bind `init` arguments to function `f` and construct
 * a function of smaller _arity_ which accept `rest` of the arguments.
 *
 * Example:
 *
 * ```
 * let f = (a, b) => a + b
 * f(3, 4)  ->  7
 * let g = partial(f) (3)  // note that `partial` is in *curried* form
 * g(4)  ->  7
 * ```
 *
 * @function partial
 * @param {Function} f
 * @returns {Function}
 */
export function partial<F extends Fun> (f: F): (...init: any[]) => Fun {
    return (...init) => (...rest) => f(...[...init, ...rest]);
}
