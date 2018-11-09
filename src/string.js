/**
 * String tools.
 *
 * @module string
 * @license Apache-2.0
 * @author drmats
 */




import {
    draw,
    head,
    last,
    range,
    tail,
} from "./array"
import { Y } from "./func"




/**
 * Return full set of ASCII letters.
 *
 * @function asciiLetters
 * @returns {String}
 */
export const asciiLetters = () =>
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"




/**
 * Return lowercase ASCII letters.
 *
 * @function asciiLowercase
 * @returns {String}
 */
export const asciiLowercase = () => "abcdefghijklmnopqrstuvwxyz"




/**
 * Return uppercase ASCII letters.
 *
 * @function asciiUppercase
 * @returns {String}
 */
export const asciiUppercase = () => "ABCDEFGHIJKLMNOPQRSTUVWXYZ"




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
export const big = Y((r) => (n, c = "x") => n > 0  ?  r(n - 1, c + c)  :  c)




/**
 * Convert `thisKindOfText` to `ThisKindOfText`.
 *
 * @function camelToPascal
 * @param {String} str
 * @returns {String}
 */
export const camelToPascal = (str) =>
    str  &&  str.length > 0  ?
        head(str).toUpperCase() + tail(str)  :
        empty()




/**
 * Convert `thisKindOfText` to `this_kind_of_text`.
 *
 * @function camelToSnake
 * @param {String} str
 * @returns {String}
 */
export const camelToSnake = (str) =>
    str  ?  str.replace(/([A-Z])/g, "_$1").toLowerCase()  :  empty()




/**
 * Ensure given string is in form `Aaaaaaaa`.
 *
 * @function capitalize
 * @param {String} str
 * @returns {String}
 */
export const capitalize = (str) =>
    str  &&  str.length > 0  ?
        head(str).toUpperCase() + tail(str).toLowerCase()  :
        empty()




/**
 * Return all digits.
 *
 * @function digits
 * @returns {String}
 */
export const digits = () => "0123456789"




/**
 * Enumeration (used by `ellipsis` and `shorten`)
 * indicating position in a string.
 *
 * @private
 * @constant position
 */
const position = Object.freeze({
    BEGIN: 0,
    MIDDLE: 1,
    END: 2,
})




/**
 * Constructs new string with inserted `sep` (of default value `…`)
 * at the `ellipsis.BEGIN`, `ellipsis.MIDDLE` or `ellipsis.END`.
 * Returned string has the same length as input string
 * (thus some original characters are replaced with `sep` contents).
 *
 * @function ellipsis
 * @param {String} str Text to insert `sep` (`…`) into.
 * @param {Number} [placing=ellipsis.MIDDLE] Place to insert.
 *     Can be `ellipsis.BEGIN`, `ellipsis.MIDDLE` or `ellipsis.END`.
 * @param {String} [sep="…"] Separator.
 * @returns {String}
 */
export const ellipsis = (str, placing = 1, sep = "…") => {
    let x = str.split(empty())
    if (str.length >= sep.length) {
        if (placing === position.MIDDLE) {
            x.splice(
                Math.floor(x.length / 2) - Math.floor(sep.length / 2),
                sep.length, sep
            )
        } else if (placing === position.BEGIN) {
            x.splice(0, sep.length, sep)
        } else if (placing === position.END) {
            x.splice(x.length - sep.length, sep.length, sep)
        }
    }
    return x.join(empty())
}
Object.freeze(Object.assign(ellipsis, position))




/**
 * Construct empty string.
 *
 * @function empty
 * @returns {String}
 */
export const empty = () => ""




/**
 * Construct space.
 *
 * @function space
 * @returns {String}
 */
export const space = () => " "




/**
 * Construct newline.
 *
 * @function nl
 * @returns {String}
 */
export const nl = () => "\n"




/**
 * Prepend given `input` string with an appropriate amount of
 * `ch` characters so that returning string length is equal to `len`.
 * If `len` is smaller than length of `input` then `input` is being
 * returned untouched (padding doesn't shorten the `input`).
 *
 * @function padLeft
 * @param {String} input
 * @param {Number} len
 * @param {String} [space=" "]
 * @returns {String}
 */
export const padLeft = (input = empty(), len = 0, ch = space()) => (
    (ilen, c) => range(len - ilen).map(() => c).join(empty()) + input
)(input.length, head(ch))




/**
 * Append an appropriate amount of `ch` characters to the given `input`
 * string so that returning string length is equal to `len`.
 * If `len` is smaller than length of `input` then `input` is being
 * returned untouched (padding doesn't shorten the `input`).
 *
 * @function padRight
 * @param {String} input
 * @param {Number} len
 * @param {String} [space=" "]
 * @returns {String}
 */
export const padRight = (input = empty(), len = 0, ch = space()) => (
    (ilen, c) => input + range(len - ilen).map(() => c).join(empty())
)(input.length, head(ch))




/**
 * Convert `ThisKindOfText` to `thisKindOfText`.
 *
 * @function pascalToCamel
 * @param {String} str
 * @returns {String}
 */
export const pascalToCamel = (str) =>
    str  &&  str.length > 0  ?
        head(str).toLowerCase() + tail(str)  :
        empty()




/**
 * Convert `ThisKindOfText` to `this_kind_of_text`.
 *
 * @function pascalToSnake
 * @param {String} str
 * @returns {String}
 */
export const pascalToSnake = (str) =>
    str  ?  tail(camelToSnake(str))  :  empty()




/**
 * Quote text.
 *
 * @function quote
 * @param {String} [str=empty()]
 * @param {String} [q="\"\""]
 * @returns {String}
 */
export const quote = (str = empty(), q = "\"\"") =>
    `${head(q)}${str}${last(q)}`




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




/**
 * Constructs new string not longer than `len`.
 *
 * @function shorten
 * @param {String} str Text to be shortened.
 * @param {Number} [len=Infinity] Desired text length.
 * @param {Number} [placing=shorten.MIDDLE] Character cutting place.
 *     Can be `shorten.BEGIN`, `shorten.MIDDLE` or `shorten.END`.
 * @param {String} [sep="…"] Separator.
 * @returns {String}
 */
export const shorten = (str, len = Infinity, placing = 1, sep = "…") => {
    let x = str.split(empty())
    if (len < str.length) {
        if (placing === position.MIDDLE) {
            x.splice(Math.floor(len/2), str.length - len)
        } else if (placing === position.BEGIN) {
            x.splice(0, x.length - len)
        } else if (placing === position.END) {
            x.splice(len, x.length - len)
        }
        return ellipsis(x.join(empty()), placing, sep)
    }
    return str
}
Object.freeze(Object.assign(shorten, position))




/**
 * Convert `this_kind_of_text` to `thisKindOfText`.
 *
 * @function snakeToCamel
 * @param {String} str
 * @returns {String}
 */
export const snakeToCamel = (str) => (
    (pascal) =>
        pascal.length > 0  ?
            head(pascal).toLowerCase() + tail(pascal)  :
            empty()
)(snakeToPascal(str))




/**
 * Convert `this_kind_of_text` to `ThisKindOfText`.
 *
 * @function snakeToPascal
 * @param {String} str
 * @returns {String}
 */
export const snakeToPascal = (str) =>
    str  ?
        str.split(/_+/g).map((w) => capitalize(w)).join(empty())  :
        empty()




/**
 * Wrap passed string with `prefix` and `suffix`.
 *
 * @function wrap
 * @param {String} [str=empty()]
 * @param {String} [prefix=empty()]
 * @param {String} [suffix=empty()]
 * @returns {String}
 */
export const wrap = (str = empty(), prefix = empty(), suffix = empty()) =>
    `${prefix}${str}${suffix}`
