/**
 * Codec - type declarations.
 *
 * @module @xcmats/js-toolbox/codec
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Concatenate contents of a given byte arrays (Uint8Array)
 * into a new byte array (Uint8Array).
 */
export declare function concatBytes (
    ...u8as: Uint8Array[]
): Uint8Array;




/**
 * Compare two byte arrays.
 */
export declare function compareBytes (
    u8a1: Uint8Array,
    u8a2: Uint8Array
): boolean;
