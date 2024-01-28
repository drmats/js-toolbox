/**
 * String tools.
 *
 * @module string
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { empty, space } from "../string/consts";
import { head, last, tail } from "../array/list";
import { range } from "../array/tools";




/**
 * Convert `thisKindOfText` to `ThisKindOfText`.
 *
 * @function camelToPascal
 * @param {String} str
 * @returns {String}
 */
export const camelToPascal = str =>
    str  &&  str.length > 0  ?
        head(str).toUpperCase() + tail(str)  :
        empty();




/**
 * Convert `thisKindOfText` to `this_kind_of_text`.
 *
 * @function camelToSnake
 * @param {String} str
 * @returns {String}
 */
export const camelToSnake = str =>
    str  ?
        str.replace(/([A-Z])/g, "_$1").toLowerCase()  :
        empty();




/**
 * Ensure given string is in form `Aaaaaaaa`.
 *
 * @function capitalize
 * @param {String} str
 * @returns {String}
 */
export const capitalize = str =>
    str  &&  str.length > 0  ?
        head(str).toUpperCase() + tail(str).toLowerCase()  :
        empty();




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
});




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
    const x = str.split(empty());
    if (str.length >= sep.length) {
        if (placing === position.MIDDLE) {
            x.splice(
                Math.floor(x.length / 2) - Math.floor(sep.length / 2),
                sep.length, sep,
            );
        } else if (placing === position.BEGIN) {
            x.splice(0, sep.length, sep);
        } else if (placing === position.END) {
            x.splice(x.length - sep.length, sep.length, sep);
        }
    }
    return x.join(empty());
};
Object.freeze(Object.assign(ellipsis, position));




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
    (ilen, c) => range(len - ilen).map(() => c).join(empty()) + String(input)
)(String(input).length, head(ch));




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
    (ilen, c) => String(input) + range(len - ilen).map(() => c).join(empty())
)(String(input).length, head(ch));




/**
 * Convert `ThisKindOfText` to `thisKindOfText`.
 *
 * @function pascalToCamel
 * @param {String} str
 * @returns {String}
 */
export const pascalToCamel = str =>
    str  &&  str.length > 0  ?
        head(str).toLowerCase() + tail(str)  :
        empty();




/**
 * Convert `ThisKindOfText` to `this_kind_of_text`.
 *
 * @function pascalToSnake
 * @param {String} str
 * @returns {String}
 */
export const pascalToSnake = str =>
    str  ?  tail(camelToSnake(str))  :  empty();




/**
 * Quote text.
 *
 * @function quote
 * @param {String} [str=empty()]
 * @param {String} [q="\"\""]
 * @returns {String}
 */
export const quote = (str = empty(), q = "\"\"") =>
    `${head(q)}${str}${last(q)}`;




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
    const x = str.split(empty());
    if (len < str.length) {
        if (placing === position.MIDDLE) {
            x.splice(Math.floor(len/2), str.length - len);
        } else if (placing === position.BEGIN) {
            x.splice(0, x.length - len);
        } else if (placing === position.END) {
            x.splice(len, x.length - len);
        }
        return ellipsis(x.join(empty()), placing, sep);
    }
    return str;
};
Object.freeze(Object.assign(shorten, position));




/**
 * Convert `this_kind_of_text` to `thisKindOfText`.
 *
 * @function snakeToCamel
 * @param {String} str
 * @returns {String}
 */
export const snakeToCamel = str => (
    pascal =>
        pascal.length > 0  ?
            head(pascal).toLowerCase() + tail(pascal)  :
            empty()
)(snakeToPascal(str));




/**
 * Convert `this_kind_of_text` to `ThisKindOfText`.
 *
 * @function snakeToPascal
 * @param {String} str
 * @returns {String}
 */
export const snakeToPascal = str =>
    str  ?
        str.split(/_+/g).map(w => capitalize(w)).join(empty())  :
        empty();




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
    `${prefix}${str}${suffix}`;
