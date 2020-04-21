/**
 * String tools.
 *
 * @module string
 * @license Apache-2.0
 * @author drmats
 */




import {
    asciiLetters,
    digits,
    empty,
} from "./consts"
import { draw } from "../array/random"
import { range } from "../array/list"
import { Y } from "../func/combinators"




/**
 * Allocate a big string (of size 2^n). Use with caution!
 *
 * - `big(16)` makes `2^16 = 65536` string size.
 * - `big(23)` makes `2^23 = 8M` string size,
 * - `big(24)` makes `16M` and so on.
 *
 * `c = "x"` - Character used during string generation.
 *
 * Example:
 *
 * ```
 * big(2) === "xxxx"
 * big(3, "a") === "aaaaaaaa"
 * ```
 *
 * @function big
 * @param {Number} n
 * @param {String} [c="x"]
 * @returns {String}
 */
export const big = Y(r =>
    (n, c = "x") =>
        n > 0 ?
            r(n - 1, c + c) :
            c
)




/**
 * Construct random string of desired length.
 *
 * @function random
 * @param {Number} [size=0]
 * @param {String} [letters=asciiLetters()+digits()]
 * @returns {String}
 */
export const random = (size = 0, letters = asciiLetters() + digits()) =>
    range(size).map(() => draw(letters.split(empty()))).join(empty())
