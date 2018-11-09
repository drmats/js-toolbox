/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import { head } from "./array"




/**
 * Function composition - read as "compose backward" or "but first".
 *
 * ```
 * let:
 * f: X -> Y,  g: Y -> Z
 *
 * then:
 * g(f(x))  <=>  (g . f)(x)  <=>  compose(g, f)(x)
 * ```
 *
 * @function compose
 * @param {...Function} fs
 * @returns {Function}
 */
export const compose = (...fs) =>
    (...args) => head(fs.reduceRight((result, f) => [f(...result)], args))




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
 * Function composition - read as "compose forward" or "and then".
 *
 * ```
 * let:
 * f: X -> Y,  g: Y -> Z
 *
 * then:
 * g(f(x))  <=>  (g . f)(x)  <=>  flow(f, g)(x)
 * ```
 *
 * Inspired by {@link https://github.com/tfausak/flow}.
 *
 * @function flow
 * @param {...Function} fs
 * @returns {Function}
 */
export const flow = (...fs) => compose(...fs.reverse())




/**
 * Return value passed as a first argument.
 *
 * @function identity
 * @param {*} val
 * @returns {*}
 */
export const identity = (val) => val




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
 * let g = partial(f)(3)  // note that `partial` is in *curried* form
 * g(4)  ->  7
 * ```
 *
 * @function partial
 * @param {Function} f
 * @returns {Function}
 */
export const partial = (f) => (...init) =>
    (...rest) => f(...[...init, ...rest])




/**
 * Function arguments rearrangement.
 *
 * Takes function `f` and `indices` and returns a new function,
 * which has it's arguments arranged according to `indices`.
 *
 * Example:
 *
 * ```
 * string.padLeft("Foo", 10, ".")  ->  ".......Foo"
 *
 * let rePad = rearg(string.padLeft)(1, 2, 0)  // *curried* form
 * rePad(10, ".", "Bar")  ->  ".......Bar"
 *
 * console.log("a", "b", "c", "d", "e")
 * a b c d e
 *
 * let revConsole = rearg(console.log)(4, 3, 2, 1, 0)
 * revConsole("a", "b", "c", "d", "e")
 * e d c b a
 * ```
 *
 * @function rearg
 * @param {Function} f
 * @returns {Function}
 */
export const rearg = (f) => (...indices) =>
    (...args) => f(
        ...indices
            .map((n, o) => [n, o])
            .sort(([n1], [n2]) => n1 - n2)
            .map(([_, o]) => args[o])
    )




/**
 * Y-combinator (returns fixed point of a higher-order function passed as `f`).
 *
 * @function Y
 * @param {Function} f
 * @returns {Function}
 */
export const Y = (f) => ((g) => g(g))((h) => (...args) => f(h(h))(...args))
