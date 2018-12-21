/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import {
    findDuplicates,
    head,
    last,
    range,
} from "./array"
import { isArray } from "./type"




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
 * Return curried form of a given function `f`.
 *
 * If funcion `f` has _arity_ 3, and `g = curry(f)` then
 * a following invocations have the same result:
 *
 * ```
 * g(a, b, c)
 * g(a, b)(c)
 * g(a)(b, c)
 * g(a)(b)(c)
 * ```
 *
 * Function `f` _arity_ is obtained by checking it's `.length`
 * property, so if function `f` is defined with a _rest parameter_
 * then this parameter is excluded. Also only parameters before
 * the first one with a default value are included.
 *
 * @function curry
 * @param {Function} f
 * @returns {Function}
 */
export const curry = (f) => curryN(f.length, f)




/**
 * Translate the evaluation of function `f` taking `n` arguments
 * into an evaluation of sequence of `n` functions, where each
 * next function is a result of previous function evaluation.
 *
 * ```
 * f(a, b, c, d, e)  <=>  curryN(5, f)(a)(b)(c)(d)(e)
 * ```
 *
 * @function curryN
 * @param {Number} n
 * @param {Function} f
 * @returns {Function}
 */
export const curryN = (n, f) =>
    (...args) =>
        n <= args.length  ?
            f(...args)  :
            curryN(n - args.length, partial(f)(...args))




/**
 * Translate the evaluation of function `f` taking multiple arguments
 * into an evaluation of sequence of functions, each with a single argument.
 *
 * Because `curryThunk` doesn't assume anything on passed function
 * `f` _arity_, final invocation has to be done with no arguments.
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
 * Create function that can "lock the thing".
 *
 * During the first `n` invocations returned function acts as identity.
 * During the `n+1` invocation the argument `thing` is memoized
 * and on all subsequent invocations passed arguments are ignored
 * and memoized `thing` is returned.
 *
 * ```
 * let lock = func.locker()
 *
 * lock("I like you!")
 * 'I like you!'
 *
 * lock("I hate you.")
 * 'I like you!'
 *
 * let lock2 = func.locker(2)
 *
 * lock2("Repeat after me!")
 * 'Repeat after me!'
 *
 * lock2(42)
 * 42
 *
 * lock2("All right...")
 * 42
 * ```
 *
 * @function locker
 * @param {Number} [n=1]
 * @returns {Function} (any) => any
 */
export const locker = (n = 1) => (
    ({ memoized, value }) =>
        (thing) => {
            if (memoized < n) {
                memoized += 1
                value = thing
            }
            return value
        }
)({ memoized: 0, value: null })




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
 * Returned function will expect the number of arguments to be
 * no less than the number of `indices`. If not all of the required
 * arguments will be passed, a new function will be returned
 * expecting _rest_ of the arguments.
 *
 * In other words - function returned by `rearg` is *curried*.
 *
 * Example:
 *
 * ```
 * string.padLeft("Foo", 10, ".")  ->  ".......Foo"
 *
 * let rePad = func.rearg(string.padLeft)(1, 2, 0)  // *curried* form
 * rePad(10, ".", "Bar")  ->  ".......Bar"
 *
 * console.log("a", "b", "c", "d", "e")
 * a b c d e
 *
 * let revConsole = func.rearg(console.log)(4, 3, 2, 1, 0)
 * revConsole("a", "b", "c", "d", "e")
 * e d c b a
 *
 * revConsole("f")("g", "h")("i")("j")
 * j i h g f
 * ```
 *
 * @function rearg
 * @param {Function} f
 * @returns {Function}
 */
export const rearg = (f) => (...indices) => {
    if (indices.length === 0) return f

    if (findDuplicates(indices).length > 0) throw RangeError(
        "func.rearg: duplicate indices are forbidden"
    )

    // index mapping "new" -> "old"
    let indexPairs = indices
        .map((n, o) => [n, o])
        .sort(([n1], [n2]) => n1 - n2)

    return curryN(
        indices.length,
        (...args) => {
            let
                // source arguments: [argument, usageCount]
                sargs = args.map((a) => [a, 0]),

                // destination arguments: [argument, usageCount]
                dargs = range(Math.max(
                    head(last(indexPairs)) + 1,
                    args.length)
                ).map(() => [null, 0]),

                // not used source arguments
                rest = null

            // fill destination arguments with source arguments
            // (through index mapping) and mark valid destination arguments
            // and used source arguments
            indexPairs.forEach(([n, o]) => {
                dargs[n][0] = head(sargs[o])
                dargs[n][1] += 1
                sargs[o][1] += 1
            })

            // filter-out all used source arguments and leave only unused ones
            rest = sargs.filter((a) => last(a) === 0).reverse()

            // return function `f` invocation with valid destination arguments
            // and not-valid ones replaced with the unused source arguments
            return f(...dargs.map((a) => {
                if (last(a) !== 0) return head(a)
                let rel = rest.pop()
                if (isArray(rel)) return head(rel)
                return rel
            }))
        }
    )
}




/**
 * Y-combinator (returns fixed point of a higher-order function passed as `f`).
 *
 * @function Y
 * @param {Function} f
 * @returns {Function}
 */
export const Y = (f) => ((g) => g(g))((h) => (...args) => f(h(h))(...args))
