/**
 * Array tools.
 *
 * @module array
 * @license Apache-2.0
 * @author drmats
 */




import { isNumber } from "./type"
import {
    identity,
    objectReduce,
    randomInt,
} from "./utils"




/**
 * Create object composed of keys resulting from application
 * of `iteratee` function to each element of the passed array `arr`.
 * Values corresponds to the number of occurences of an element
 * in the passed array.
 *
 * `iteratee` is optional and defaults to `identity` function.
 *
 * Example:
 *
 * ```
 * countBy(
 *     "exemplo plus quam ratione vivimus".split(" "),
 *     (w) => w.length
 * )
 * ```
 *
 * @function countBy
 * @param {Array} arr
 * @param {Function} [iteratee=identity]
 * @returns {Object.<String, Number>}
 */
export const countBy = (arr, iteratee = identity) =>
    arr.reduce((acc, el) => (
        (key) => isNumber(acc[key]) ?
            { ...acc, [key]: acc[key] + 1, } :
            { ...acc, [key]: 1, }
    )(iteratee(el)), Object.create(null))




/**
 * Choose a random element from a non-empty array.
 *
 * @function draw
 * @param {Array|String} arr
 * @returns {*}
 */
export const draw = (arr) => arr[randomInt() % arr.length]




/**
 * Find duplicates in a given array.
 *
 * Optionally, before comparision, each element is transformed by
 * `iteratee` function (which defaults to `identity`).
 *
 * Example:
 *
 * ```
 * array.findDuplicates(["one", "two", "one", "three", "six", "two", "two"])
 * ```
 *
 * @function findDuplicates
 * @param {Array} arr
 * @param {Function} [iteratee=identity]
 * @returns {Object}
 */
export const findDuplicates = (arr, iteratee = identity) =>
    objectReduce(
        countBy(arr, iteratee),
        (acc, [k, v,]) => v > 1  ?  acc.concat([k,])  :  acc,
        []
    )




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
export const flatten = (arr) => arr.reduce((acc, el) => acc.concat(el), [])




/**
 * Return first element of the given array.
 *
 * @function head
 * @param {Array|String} arr
 * @returns {*}
 */
export const head = (arr) => arr[0]




/**
 * Return array without its last element.
 *
 * @function init
 * @param {Array|String} arr
 * @returns {Array|String}
 */
export const init = (arr) => arr.slice(0, arr.length-1)




/**
 * Return last element of the given array.
 *
 * @function last
 * @param {Array|String} arr
 * @returns {*}
 */
export const last = (arr) => arr[arr.length-1]




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

    if (args.length === 1) { [stop,] = args }
    else if (args.length === 2) { [start, stop,] = args }
    else if (args.length === 3) {
        [start, stop, step,] = args
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
 * Shuffle all elements in the given array
 * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
 *
 * The operation is taken in-place.
 *
 * @function shuffle
 * @param {Array} arr
 * @returns {Array}
 */
export const shuffle = (arr) => {
    if (!Array.isArray(arr)) throw new TypeError(
        `array.shuffle() expected array as argument, got ${typeof arr}`
    )

    for (let i = arr.length-1;  i > 0;  i -= 1) {
        let j = randomInt() % (i+1);
        [arr[i], arr[j],] = [arr[j], arr[i],]
    }

    return arr
}




/**
 * - `sparse(stop, size)` -> array of 'size' distinct integers
 *     in range `[0..stop-1]`
 * - `sparse(start, stop, size)` -> array of 'size' distinct integers
 *     in range `[start..stop-1]`
 *
 * Generate sparse array of distinct integers
 * with (almost) uniform distribution.
 *
 * @function sparse
 * @param {Number} [start=0]
 * @param {Number} stop
 * @param {Number} size
 * @returns {Array}
 */
export const sparse = (...args) => {
    let
        start = 0, stop = 0, size = 0,
        hash = Object.create(null),
        interval = 0

    if (args.length === 2) { [stop, size,] = args }
    else if (args.length === 3) { [start, stop, size,] = args }
    else throw new TypeError(
        `array.sparse() expected 2 or 3 arguments, got ${args.length}`
    )

    if (start > stop) { [start, stop,] = [stop, start,] }
    interval = stop - start

    if (size <= 0  ||  interval === 0) { return [] }
    if (size >= interval) { return range(start, stop) }

    while (size > 0) {
        let val = (randomInt() % interval) + start
        if (!Object.hasOwnProperty.call(hash, val)) {
            hash[val] = val
            size -= 1
        }
    }

    return Object.values(hash).sort((a, b) => a - b)
}




/**
 * Return array without its head (first element).
 *
 * @function tail
 * @param {Array|String} arr
 * @returns {Array|String}
 */
export const tail = (arr) => arr.slice(1)
