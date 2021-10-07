/**
 * String, TypedArray and Base64 encoders/decoders.
 *
 * @module codec
 * @license Apache-2.0
 * @author drmats
 */




import { hexToBytes } from "./conv"
import { pipe } from "../func/combinators"
import { rearg } from "../func/tools"
import { padLeft } from "../string/transform"
import { isBrowser } from "../utils/dev"




/**
 * Get random bytes.
 * Uses Web Crypto API when in browser
 * and `crypto` module when in node.js.
 *
 * @async
 * @function random
 * @param {Number} [size=64]
 * @returns {Promise.<Uint8Array>}
 */
export const random = isBrowser() ?
    (size = 64) => new Promise((resolve, reject) => {
        try {
            let bytes = new Uint8Array(size)
            window.crypto.getRandomValues(bytes)
            resolve(bytes)
        } catch (ex) {
            reject(ex)
        }
    }) :
    (size = 64) => {
        const nodeRandomBytes = eval("require(\"crypto\")").randomBytes
        return new Promise((resolve, reject) => nodeRandomBytes(
            size,
            (err, buf) => err ? reject(err) : resolve(Uint8Array.from(buf)),
        ))
    }




/**
 * Generate 48 bits (6 bytes) timestamp - milliseconds since epoch.
 *
 * @function timestamp
 * @returns {Uint8Array}
 */
export const timestamp = () =>
    pipe(Date.now()) (
        d => d.toString(16),
        rearg(padLeft) (1, 2, 0) (6*2, "0"),
        hexToBytes,
    )
