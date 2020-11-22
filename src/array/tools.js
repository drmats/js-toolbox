/**
 * Array tools.
 *
 * @module array
 * @license Apache-2.0
 * @author drmats
 */




import { pipe } from "../func/combinators"
import {
    append,
    drop,
    head,
    take,
    tail,
} from "./list"
import { sub } from "../math/arithmetic"
import {
    isArray,
    isNumber,
} from "../type/check"




/**
 * Simple array flattener.
 *
 * ```
 * [[1, 2,], ..., [3, 4,],]  ->  [1, 2, ..., 3, 4,]
 * ```
 *
 * @function flatten
 * @param {Array.<Array>} arr
 * @returns {Array}
 */
export const flatten = arr => arr.reduce((acc, el) => [...acc, ...el], [])




/**
 * Checks if a given array is a continuous block.
 *
 * @function isContinuous
 * @param {Array.<T>} arr Array to check.
 * @param {Function} [neighbour] Comparison function.
 * @returns {Boolean}
 */
export const isContinuous = (
    arr,
    neighbour = (a, b) => b - a === 1
) =>
    isSorted(arr, neighbour)




/**
 * Checks if a given array is sorted.
 *
 * @function isSorted
 * @param {Array.<T>} arr Array to check.
 * @param {Function} [cmp] Comparison function.
 * @returns {Boolean}
 */
export const isSorted = (arr, cmp = (a, b) => a <= b) =>
    isArray(arr) ?
        zip(arr, tail(arr)).every((pair) => cmp(...pair)) :
        false




/**
 * - `range(stop)` -> array of numbers; start defaults to `0`
 * - `range(start, stop[, step])` -> array of numbers
 *
 * Return a list containing an arithmetic progression.
 * - `range(i, j)` returns `[i, i+1, i+2, ..., j-1]`.
 *
 * When step is given, it specifies the increment (or decrement).
 * For example:
 * - `range(4)` returns `[0, 1, 2, 3]`.
 *
 * Imitates Python's `range()`.
 *
 * @function range
 * @param {Number} [start=0]
 * @param {Number} stop
 * @param {Number} [step=1]
 * @returns {Array}
 */
export const range = (...args) => {
    let start = 0, stop = 0, step = 1, arr = []

    if (args.length === 1) { [stop] = args }
    else if (args.length === 2) { [start, stop] = args }
    else if (args.length === 3) {
        [start, stop, step] = args
        if (step === 0) throw new RangeError(
            "array.range() 'step' argument must not be zero"
        )
    } else throw new TypeError(
        `array.range() expected at most 3 arguments, got ${args.length}`
    )

    while (
        (start < stop  &&  step > 0)  ||
        (start > stop  &&  step < 0)
    ) {
        arr[arr.length] = start
        start += step
    }

    return arr
}




/**
 * Take every `nth` element from an `arr` array.
 *
 * @function takeEvery
 * @param {Number} nth
 * @returns {Function} (any[]) => any[]
 */
export const takeEvery = nth => arr =>
    isNumber(nth)  &&  nth > 0  &&  isArray(arr) ?
        pipe(
            range(Math.ceil(arr.length / nth))
                .reduce(([taken, rest]) => [
                    append(take(1) (rest)) (taken),
                    drop(nth) (rest),
                ], [[], arr])
        ) (
            head,
            arr => arr.reverse()
        ) : arr




/**
 * Zip given arrays using provided `f` operator.
 *
 * Example:
 *
 * ```
 * array.zipWith((a, b) => a + b) ([1, 2, 3, 4], [10, 20, 30, 40])
 * [ 11, 22, 33, 44 ]
 * ```
 *
 * @function zipWith
 * @param {Function} f (...any[]) => any
 * @returns {Funcion} (...any[][]) => any[]
 */
export const zipWith = f => (...arrs) =>
    range(
        head(arrs.map(arr => arr.length).sort(sub))
    ).map(i => f(...arrs.map(arr => arr[i])))




/**
 * Zip given arrays.
 *
 * Example:
 *
 * ```
 * zip([1, 2, 3, 4, 5], ["a", "b", "c", "d", "e"])
 * [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ], [ 4, 'd' ], [ 5, 'e' ] ]
 * ```
 *
 * @function zip
 * @param {...Array} arrs Arrays to zip.
 * @returns {Array}
 */
export const zip = zipWith((...args) => args)
