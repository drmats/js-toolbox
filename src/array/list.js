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
