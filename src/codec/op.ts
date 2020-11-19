/**
 * String, TypedArray and Base64 encoders/decoders.
 *
 * @module codec
 * @license Apache-2.0
 * @author drmats
 */




import { curry } from "../func/curry";
import { inc } from "../math/arithmetic";
import { sum } from "../math/series";
import { isNumber } from "../type/check";




/**
 * Concatenate contents of a given byte arrays (Uint8Array)
 * into a new byte array (Uint8Array).
 *
 * @function concatBytes
 * @param {...Uint8Array} u8as
 * @returns {Uint8Array}
 */
export const concatBytes = (...u8as: Uint8Array[]): Uint8Array => {
    if (u8as.length === 0) return new Uint8Array();
    if (
        u8as.some(u8a => !isNumber(u8a.BYTES_PER_ELEMENT))
    ) throw new TypeError("Arguments must be of [TypedArray] type.");
    let result = new Uint8Array(sum(u8as.map(u8a => u8a.length)));
    u8as.reduce((pointer, u8a) => {
        result.set(u8a, pointer);
        return pointer + u8a.length;
    }, 0);
    return result;
};




/**
 * Compare two byte arrays.
 *
 * @function compareBytes
 * @param {Uint8Array} u8a1
 * @param {Uint8Array} u8a2
 * @returns {Boolean}
 */
export const compareBytes = curry(
    (u8a1: Uint8Array, u8a2: Uint8Array): boolean => {
        if (
            !isNumber(u8a1.BYTES_PER_ELEMENT)  ||
            !isNumber(u8a2.BYTES_PER_ELEMENT)
        ) throw new TypeError("Arguments must be of [TypedArray] type.");
        if (
            u8a1.BYTES_PER_ELEMENT !== u8a2.BYTES_PER_ELEMENT  ||
            u8a1.length !== u8a2.length
        ) return false;
        for (let i = 0;  i < u8a1.length;  i = inc(i))
            if (u8a1[i] !== u8a2[i]) return false;
        return true;
    }
) as (u8a1: Uint8Array, u8a2: Uint8Array) => boolean;
