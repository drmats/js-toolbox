/**
 * Func - ambient type declarations.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type { Fun } from "../type/consts";
import type {
    Head,
    Length,
    Tail,
} from "../type/list";




/**
 * Recursive type for curried functions.
 */
export type CurryFun<
    F extends Fun,
    P extends any[] = Parameters<F>,
    R = ReturnType<F>
> = Length<P> extends 0 ?
    () => R :
    Length<P> extends 1 ?
        (x: Head<P>) => R :
        (x: Head<P>) => CurryFun<(...args: Tail<P>) => R>;




/**
 * Recursive type for thunk-curried functions.
 */
export type ThunkFun<
    F extends Fun,
    P extends any[] = Parameters<F>,
    R = ReturnType<F>
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
 */
export declare function curry<
    F extends Fun
> (f: F):
    Length<Parameters<F>> extends 0 | 1 ?
        F :
        F & CurryFun<F>;




/**
 * Translate the evaluation of function `f` taking `n` arguments
 * into an evaluation of sequence of `n` functions, where each
 * next function is a result of previous function evaluation.
 *
 * ```
 * f(a, b, c, d, e)  <=>  curryN(5, f) (a) (b) (c) (d) (e)
 * ```
 */
export declare function curryN<
    F extends Fun
> (n: number, f: F):
    Length<Parameters<F>> extends 0 | 1 ?
        F :
        F & CurryFun<F>;




/**
 * Translate the evaluation of function `f` taking multiple arguments
 * into an evaluation of sequence of functions,
 * each with a single argument.
 *
 * Because `curryThunk` doesn't assume anything on passed function
 * `f` _arity_, final invocation has to be done with no arguments.
 *
 * ```
 * f(a, b, c, d)  <=>  curryThunk(f) (a) (b) (c) (d) ()
 * ```
 */
export declare function curryThunk<
    F extends Fun
> (f: F): ThunkFun<F>;




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
 */
export declare function partial<
    F extends Fun
> (
    f: F
): (...init: any[]) => Fun;
