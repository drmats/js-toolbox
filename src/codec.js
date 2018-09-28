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
import { compose } from "./func"
import { empty } from "./string"
import { isBrowser } from "./utils"




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
        btoa([...bytes,].map((b) => String.fromCharCode(b)).join(empty())) :
    (bytes) =>
        Buffer.from(bytes).toString("base64")




/**
 * Convert given byte array (Uint8Array) to UTF-8-encoded string.
 *
 * @function bytesToString
 * @param {Uint8Array} bytes
 * @returns {String}
 */
export const bytesToString = isBrowser() ?
    (bytes) => (new TextDecoder("utf-8")).decode(bytes) :
    (bytes) => Buffer.from(bytes).toString()




/**
 * Convert hex-encoded string to byte array (Uint8Array).
 *
 * If given `hexInput` is of odd length (hexInput.length % 2 !== 0)
 * then the last hex-digit is treated as full byte representation,
 * i.e.:
 *
 * ```
 *     hexToBytes("fa6") <=> hexToBytes("fa06") <=> Uint8Array [ 250, 6 ]
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
                        [el,].concat(acc)  :
                        [el + head(acc),].concat(tail(acc)),
                []
            )
            .map((hexByte) => parseInt(hexByte, 16))
    )
)(hexInput.replace(/(\s)|(^0x)/g, empty())))




/**
 * Convert given string to byte array (Uint8Array).
 * String is assumed to be encoded in UTF-8.
 *
 * @function stringToBytes
 * @param {String} s
 * @returns {Uint8Array}
 */
export const stringToBytes = isBrowser() ?
    (s) => (new TextEncoder("utf-8")).encode(s) :
    (s) => Uint8Array.from(Buffer.from(s))




/**
 * Base64 decoding for strings.
 *
 * @function stringB64dec
 * @param {String} s
 * @returns {String}
 */
export const stringB64dec = compose(bytesToString, b64dec)




/**
 * Base64 encoding for strings.
 *
 * @function stringB64enc
 * @param {String} s
 * @returns {String}
 */
export const stringB64enc = compose(b64enc, stringToBytes)
