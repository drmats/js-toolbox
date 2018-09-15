/**
 * String, TypedArray and Base64 encoders/decoders.
 *
 * @module codec
 * @license Apache-2.0
 * @author drmats
 */




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
