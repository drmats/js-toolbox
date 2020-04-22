/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import { findDuplicates } from "../array/set"
import {
    head,
    last,
    range,
} from "../array/list"
import { curryN } from "./curry"
import {
    isArray,
    isFunction,
} from "../type/check"




/**
 * Functional replacement of a `switch` statement.
 *
 * @function choose
 * @param {String} key
 * @param {Object.<String, Function>} [actions]
 * @param {Function} [defaultAction]
 * @param {Array} [args]
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
 * Handle exceptions in expressions.
 *
 * @function handleException
 * @param {Function} fn
 * @param {Function} [handler]
 * @returns {any}
 */
export const handleException = (fn, handler = null) => {
    try { return fn() }
    catch (ex) { return isFunction(handler)  ?  handler(ex)  :  ex }
}




/**
 * Return value passed as a first argument.
 *
 * @function identity
 * @param {any} x
 * @returns {any}
 */
export const identity = x => x




/**
 * Put a given argument under function abstraction.
 *
 * @function lazyish
 * @param {any} x
 * @returns {Function}
 */
export const lazyish = x => () => x




/**
 * Local binding.
 *
 * Inspired by {@link https://github.com/kongware/scriptum}
 *
 * @function local
 * @param {Function} () => T
 * @returns {*} T
 */
export const local = (f = identity) => f()




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
) ({ memoized: 0, value: null })




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
 * let rePad = func.rearg(string.padLeft) (1, 2, 0)  // *curried* form
 * rePad(10, ".", "Bar")  ->  ".......Bar"
 *
 * console.log("a", "b", "c", "d", "e")
 * a b c d e
 *
 * let revConsole = func.rearg(console.log) (4, 3, 2, 1, 0)
 * revConsole("a", "b", "c", "d", "e")
 * e d c b a
 *
 * revConsole("f") ("g", "h") ("i") ("j")
 * j i h g f
 * ```
 *
 * @function rearg
 * @param {Function} f
 * @returns {Function}
 */
export const rearg = f => (...indices) => {
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
                sargs = args.map(a => [a, 0]),

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
            return f(...dargs.map(a => {
                if (last(a) !== 0) return head(a)
                let rel = rest.pop()
                if (isArray(rel)) return head(rel)
                return rel
            }))
        }
    )
}
