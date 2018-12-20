/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import {
    head,
    isContinuous,
} from "./array"




/**
 * Functional replacement of a `switch` statement.
 *
 * @function choose
 * @param {String} key
 * @param {Object.<String, Function>} actions
 * @param {Function} defaultAction
 * @param {Array} args
 * @returns {any}
 */
export const choose = (
    key,
    actions = {},
    defaultAction = () => null,
    args = []
) =>
    key in actions ?
        actions[key](...args) :
        defaultAction(...args)




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
export const compose = (...fs) => (...args) =>
    head(fs.reduceRight((result, f) => [f(...result)], args))




/**
 * Translate the evaluation of function `f` taking multiple arguments
 * into an evaluation of sequence of functions, each with a single argument.
 *
 * Because `curryThunk` doesn't assume anything on passed function
 * `f` arity, final invocation has to be done with no arguments.
 *
 * ```
 * f(a, b, c, d)  <=>  curryThunk(f)(a)(b)(c)(d)()
 * ```
 *
 * @function curryThunk
 * @param {Function} f
 * @returns {Function}
 */
export const curryThunk = (f) => (...args) =>
    args.length === 0  ?  f()  :  curryThunk(partial(f)(...args))




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
 * @param {any} val
 * @returns {any}
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
 * Function composition - read as "compose forward" or "and then".
 * Version of `flow` taking _arguments_ (`args`) first
 * and then _functions_ (`fs`).
 *
 * ```
 * let:
 * f: X -> Y,  g: Y -> Z
 *
 * then:
 * g(f(x))  <=>  (g . f)(x)  <=>  pipe(x)(f, g)
 * ```
 *
 * @function pipe
 * @param {...Function} args
 * @returns {Function}
 */
export const pipe = (...args) => (...fs) => flow(...fs)(...args)




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
export const rearg = (f) => (...indices) => {
    if (indices.length === 0) return f

    let indexPairs = indices
        .map((n, o) => [n, o])
        .sort(([n1], [n2]) => n1 - n2)

    if (
        !isContinuous(indexPairs, ([n1], [n2]) => n2 - n1 === 1)  ||
        compose(head, head)(indexPairs)  !== 0
    ) {
        throw new RangeError("Not all required arguments are covered.")
    }

    return (...args) => f(...indexPairs.map(([_, o]) => args[o]))

}




/**
 * Y-combinator (returns fixed point of a higher-order function passed as `f`).
 *
 * @function Y
 * @param {Function} f
 * @returns {Function}
 */
export const Y = (f) => ((g) => g(g))((h) => (...args) => f(h(h))(...args))
