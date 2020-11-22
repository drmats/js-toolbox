/**
 * Array tools.
 *
 * @module array
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Append `ys` to `xs` and return xs.
 *
 * @function append
 * @param {Array} xs
 * @returns {Function} (any[]) => any[]
 */
export const append = xs => ys => {
    Array.prototype.push.apply(xs, ys)
    return xs
}




/**
 * Drop the first `n` elements of a given array.
 * Returns array without the first `n` elements.
 *
 * @function drop
 * @param {Number} n
 * @returns {Function} which takes `arr` and returns
 *      array without the first `n` elements.
 */
export const drop = n => arr => arr.slice(n)




/**
 * Drop the last `n` elements of a given array.
 * Returns array without the last `n` elements.
 *
 * @function dropLast
 * @param {Number} n
 * @returns {Function} which takes `arr` and returns
 *      array without the last `n` elements.
 */
export const dropLast = n => arr => arr.slice(0, arr.length - n)




/**
 * Return first element of the given array.
 *
 * @function head
 * @param {Array|String} arr
 * @returns {any}
 */
export const head = ([x] = []) => x




/**
 * Return array without its last element.
 *
 * @function init
 * @param {Array|String} [arr]
 * @returns {Array|String}
 */
export const init = arr =>
    arr || arr === "" ?
        arr.slice(0, arr.length-1) :
        undefined




/**
 * Return last element of the given array.
 *
 * @function last
 * @param {Array|String} arr
 * @returns {any}
 */
export const last = arr => arr  &&  arr[arr.length-1]




/**
 * Return array without its head (first element).
 *
 * @function tail
 * @param {Array|String} arr
 * @returns {Array|String}
 */
export const tail = arr => arr  &&  arr.slice(1)




/**
 * Take the first `n` elements of a given array.
 *
 * @function take
 * @param {Number} n
 * @returns {Function} which takes `arr` and return first `n` elements
 *
 */
export const take = n => arr => arr  &&  arr.slice(0, n)




/**
 * Take the last `n` elements of a given array.
 *
 * @function takeLast
 * @param {Number} n
 * @returns {Function} which takes `arr` and return last `n` elements
 *
 */
export const takeLast = n => arr => arr && arr.slice(arr.length - n)
