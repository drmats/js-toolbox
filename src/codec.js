/**
 * String, TypedArray and Base64 encoders/decoders.
 *
 * @module codec
 * @license Apache-2.0
 * @author drmats
 */




import {
    head,
    tail,
} from "./array"
import {
    compose,
    curry,
} from "./func"
import {
    inc,
    sum,
} from "./math"
import { empty } from "./string"
import { isNumber } from "./type"
import { isBrowser } from "./utils"




/**
 * Concatenate contents of a given byte arrays (Uint8Array)
 * into a new byte array (Uint8Array).
 *
 * @function concatBytes
 * @param {...Uint8Array} u8as
 * @returns {Uint8Array}
 */
export const concatBytes = (...u8as) => {
    if (u8as.length === 0) return new Uint8Array()
    if (
        u8as.some((u8a) => !isNumber(u8a.BYTES_PER_ELEMENT))
    ) throw new TypeError("Arguments must be of [TypedArray] type.")
    let result = new Uint8Array(sum(u8as.map((u8a) => u8a.length)))
    u8as.reduce((pointer, u8a) => {
        result.set(u8a, pointer)
        return pointer + u8a.length
    }, 0)
    return result
}




/**
 * Compare two byte arrays.
 *
 * @function compareBytes
 * @param {Uint8Array} u8a1
 * @param {Uint8Array} u8a2
 * @returns {Boolean}
 */
export const compareBytes = curry((u8a1, u8a2) => {
    if (
        !isNumber(u8a1.BYTES_PER_ELEMENT)  ||
        !isNumber(u8a2.BYTES_PER_ELEMENT)
    ) throw new TypeError("Arguments must be of [TypedArray] type.")
    if (
        u8a1.BYTES_PER_ELEMENT !== u8a2.BYTES_PER_ELEMENT  ||
        u8a1.length !== u8a2.length
    ) return false
    for (let i = 0;  i < u8a1.length;  i = inc(i))
        if (u8a1[i] !== u8a2[i]) return false
    return true
})




/**
 * Convert a given utf8-encoded string to byte array (Uint8Array).
 *
 * @function stringToBytes
 * @param {String} s
 * @returns {Uint8Array}
 */
export const stringToBytes = isBrowser() ?
    (s) => (new TextEncoder("utf-8")).encode(s) :
    (s) => Uint8Array.from(Buffer.from(s))




/**
 * Convert a given byte array (Uint8Array) to an utf8-encoded string.
 *
 * @function bytesToString
 * @param {Uint8Array} bytes
 * @returns {String}
 */
export const bytesToString = isBrowser() ?
    (bytes) => (new TextDecoder("utf-8")).decode(bytes) :
    (bytes) => Buffer.from(bytes).toString()




/**
 * Convert a hex-encoded string to a byte array (Uint8Array).
 *
 * If given `hexInput` is of odd length (hexInput.length % 2 !== 0)
 * then the last hex-digit is treated as full byte representation,
 * i.e.:
 *
 * ```
 * hexToBytes("fa6") <=> hexToBytes("fa06") <=> Uint8Array [ 250, 6 ]
 * ```
 *
 * All unrecognized hex-digit groups (e.g. "zz") are treated
 * by `parseInt()` as `NaN` and then effectively converted
 * to `Uint8Array [ 0 ]`.
 *
 * Input parameter (`hexInput`) can be prefixed with `0x`.
 *
 * All whitespaces, tabs and carriage returns
 * are stripped out from the input.
 *
 * @function hexToBytes
 * @param {String} input
 * @returns {Uint8Array}
 */
export const hexToBytes = ((hexInput) => (
    (hex) => Uint8Array.from(
        hex.split(empty())
            .reduceRight(
                (acc, el, i) =>
                    i % 2  ?
                        [el, ...acc] :
                        [el + head(acc), ...tail(acc)],
                []
            )
            .map((hexByte) => parseInt(hexByte, 16))
    )
)(hexInput.replace(/(\s)|(^0x)/g, empty())))




/**
 * Convert a given byte array (Uint8Array) to a hex-encoded string.
 * Each byte is encoded on the two hexadecimal digits.
 *
 * @function bytesToHex
 * @param {Uint8Array} bytes
 * @return {String}
 */
export const bytesToHex = (bytes) =>
    Array.from(bytes)
        .map((b) =>
            b < 16  ?
                "0" + b.toString(16) :
                b.toString(16)
        )
        .join(empty())




/**
 * Decode given Base64-encoded string into byte array (Uint8Array).
 *
 * @function b64dec
 * @param {String} s
 * @returns {Uint8Array}
 */
export const b64dec = isBrowser() ?
    (s) =>
        Uint8Array.from(atob(s).split(empty()).map(c => c.charCodeAt(0))) :
    (s) =>
        Uint8Array.from(Buffer.from(s, "base64"))




/**
 * Base64-encode given byte array (Uint8Array).
 *
 * @function b64enc
 * @param {Uint8Array} bytes
 * @returns {String}
 */
export const b64enc = isBrowser() ?
    (bytes) =>
        btoa([...bytes].map((b) => String.fromCharCode(b)).join(empty())) :
    (bytes) =>
        Buffer.from(bytes).toString("base64")




/**
 * Base64 decoding for strings (b64-string to utf8-string).
 *
 * @function b64ToString
 * @param {String} s
 * @returns {String}
 */
export const b64ToString = compose(bytesToString, b64dec)




/**
 * Base64 encoding for strings (utf8-string to b64-string)
 *
 * @function stringToB64
 * @param {String} s
 * @returns {String}
 */
export const stringToB64 = compose(b64enc, stringToBytes)




/**
 * Covert a given b64-encoded string to a hex-encoded string.
 *
 * @function b64ToHex
 * @param {String} input
 * @returns {String}
 */
export const b64ToHex = compose(bytesToHex, b64dec)




/**
 * Covert a given hex-encoded string to a b64-encoded string.
 *
 * @function hexToB64
 * @param {String} input
 * @returns {String}
 */
export const hexToB64 = compose(b64enc, hexToBytes)
