/**
 * Functional tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Translate the evaluation of function `f` taking multiple arguments
 * into an evaluation of sequence of functions, each with a single argument.
 *
 * ```
 * f(a, b, c, d)  <=>  curry(f)(a)(b)(c)(d)()
 * ```
 *
 * @function curry
 * @param {Function} f
 * @returns {Function}
 */
export const curry = (f) => (...args) =>
    args.length === 0  ?  f()  :  curry(partial(f)(...args))




/**
 * Partial application.
 *
 * Bind `init` arguments to function `f` and construct
 * a function of smaller arity which accept `rest` of the arguments.
 *
 * Example:
 *
 * ```
 * let f = (a, b) => a + b
 * f(3, 4)  ->  7
 * let g = partial(f)(3)
 * g(4)  ->  7
 * ```
 *
 * @function partial
 * @param {Function} f
 * @returns {Function}
 */
export const partial = (f) => (...init) =>
    (...rest) => f(...[...init, ...rest,])




/**
 * Y-combinator (returns fixed point of a higher-order function passed as `f`).
 *
 * @function Y
 * @param {Function} f
 * @returns {Function}
 */
export const Y = (f) => ((g) => g(g))((h) => (...args) => f(h(h))(...args))
