/**
 * Array tools.
 *
 * @module array
 * @license Apache-2.0
 * @author drmats
 */




import { range } from "./tools"
import {
    dec,
    inc,
    sub,
} from "../math/arithmetic"
import { randomInt } from "../math/random"
import { isArray } from "../type/check"




/**
 * Choose a random element from a non-empty array.
 *
 * @function draw
 * @param {Array<T>|String} arr
 * @returns {T|String}
 */
export const draw = xs => {
    if (!xs.length) throw new TypeError("array.draw() - empty list")
    return xs[randomInt() % xs.length]
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
export const shuffle = arr => {
    if (!isArray(arr)) throw new TypeError(
        `array.shuffle() - expected array as argument, got [${typeof arr}]`
    )

    for (let i = dec(arr.length);  i > 0;  i -= 1) {
        let j = randomInt() % inc(i);
        [arr[i], arr[j]] = [arr[j], arr[i]]
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

    if (args.length === 2) { [stop, size] = args }
    else if (args.length === 3) { [start, stop, size] = args }
    else throw new TypeError(
        `array.sparse() expected 2 or 3 arguments, got ${args.length}`
    )

    if (start > stop) { [start, stop] = [stop, start] }
    interval = stop - start

    if (size <= 0  ||  interval === 0) { return [] }
    if (size >= interval) { return range(start, stop) }

    while (size > 0) {
        let val = (randomInt() % interval) + start
        if (!Object.hasOwnProperty.call(hash, val)) {
            hash[val] = val
            size = dec(size)
        }
    }

    return Object.values(hash).sort(sub)
}
