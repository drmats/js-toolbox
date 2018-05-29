/**
 * String tools.
 *
 * @module string
 * @license Apache-2.0
 */




import {
    draw,
    head,
    last,
    range,
    tail
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
 * ```
 * big(2) = "xxxx"
 * big(3, "a") = "aaaaaaaa"
 * ```
 *
 * @function big
 * @param {Number} n
 * @param {String} c
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
 * Construct empty string.
 *
 * @function empty
 * @returns {String}
 */
export const empty = () => ""




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
 * @param {String} str
 * @param {String} [q="\"\""]
 * @returns {String}
 */
export const quote = (str, q="\"\"") => `${head(q)}${str}${last(q)}`




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
