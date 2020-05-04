/**
 * Array tools.
 *
 * @module array
 * @license Apache-2.0
 * @author drmats
 */




import { flow } from "../func/combinators"
import { identity } from "../func/tools"
import { objectReduce } from "../struct/object"
import { isNumber } from "../type/check"




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
 *     w => w.length
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
        key => isNumber(acc[key]) ?
            { ...acc, [key]: acc[key] + 1 } :
            { ...acc, [key]: 1 }
    )(iteratee(el)), Object.create(null))




/**
 * Compute array as `a` \ `b` (set difference).
 *
 * @function difference
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
export const difference = (a, b) => {
    let diff = new Set(a)

    for (let element of b)
        diff.delete(element)

    return Array.from(diff)
}




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
 * @returns {Array.<String>}
 */
export const findDuplicates = (arr, iteratee = identity) =>
    objectReduce(
        countBy(arr, iteratee),
        (acc, [k, v]) => v > 1  ?  [...acc, k]  :  acc,
        []
    )




/**
 * Compute array that is an intersection of `a` and `b` arrays.
 *
 * @function intersection
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
export const intersection = (a, b) => {
    let
        aa = new Set(a),
        intersection = new Set()

    for (let element of b)
        if (aa.has(element)) intersection.add(element)

    return Array.from(intersection)
}




/**
 * Check if array `a` is a subset of array `b`.
 *
 * @function isSubset
 * @param {Array} a
 * @param {Array} b
 * @returns {Boolean}
 */
export const isSubset = (a, b) => {
    let
        aa = new Set(a),
        bb = new Set(b)

    if (aa.size > bb.size) return false
    for (let element of aa)
        if (!bb.has(element)) return false

    return true
}




/**
 * Create a new array with removed duplicates.
 *
 * @function removeDuplicates
 * @param {Array} arr
 * @param {Function} [iteratee=identity]
 * @returns {Array.<String>}
 */
export const removeDuplicates = flow(
    countBy,
    Object.keys.bind(Object)
)




/**
 * Check set equality of two arrays treated as sets.
 *
 * @function setEqual
 * @param {Array} a
 * @param {Array} b
 * @returns {Boolean}
 */
export const setEqual = (a, b) =>
    isSubset(a, b)  &&  isSubset(b, a)
