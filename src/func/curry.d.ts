/**
 * Func - type declarations.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @author drmats
 */




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
 * Function `f` _arity_ is obtained by checking it's `.length`
 * property, so if function `f` is defined with a _rest parameter_
 * then this parameter is excluded. Also only parameters before
 * the first one with a default value are included.
 */
export function curry (f: Function): Function;




/**
 * Translate the evaluation of function `f` taking `n` arguments
 * into an evaluation of sequence of `n` functions, where each
 * next function is a result of previous function evaluation.
 *
 * ```
 * f(a, b, c, d, e)  <=>  curryN(5, f) (a) (b) (c) (d) (e)
 * ```
 */
export function curryN<T> (
    n: number,
    f: (...args: any[]) => T
): (...args: any[]) => Function | T;




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
export function curryThunk<T> (
    f: (...args: any[]) => T
): (...args: any[]) => Function | T;




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
export function partial<T> (
    f: (...args: any[]) => T
): (...init: any[]) => (...rest: any[]) => T;
