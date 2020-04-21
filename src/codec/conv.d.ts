/**
 * Codec - type declarations.
 *
 * @module @xcmats/js-toolbox/codec
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Convert given a utf8-encoded string to byte array (Uint8Array).
 */
export function stringToBytes (s: string): Uint8Array;




/**
 * Convert a given byte array (Uint8Array) to an utf8-encoded string.
 */
export function bytesToString (bytes: Uint8Array): string;




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
 */
export function hexToBytes (hexInput: string): Uint8Array;




/**
 * Convert a given byte array (Uint8Array) to a hex-encoded string.
 * Each byte is encoded on the two hexadecimal digits.
 */
export function bytesToHex (bytes: Uint8Array): string;




/**
 * Decode given Base64-encoded string into byte array (Uint8Array).
 */
export function b64dec (s: string): Uint8Array;




/**
 * Base64-encode given byte array (Uint8Array).
 */
export function b64enc (bytes: Uint8Array): string;




/**
 * Base64 decoding for strings (b64-string to utf8-string).
 */
export function b64ToString (s: string): string;




/**
 * Base64 encoding for strings (utf8-string to b64-string)
 */
export function stringToB64 (s: string): string;




/**
 * Covert a given b64-encoded string to a hex-encoded string.
 */
export function b64ToHex (s: string): string;




/**
 * Covert a given hex-encoded string to a b64-encoded string.
 */
export function hexToB64 (s: string): string;
