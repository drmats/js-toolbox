/**
 * Codec - type declarations.
 *
 * @module @xcmats/js-toolbox/codec
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Get random bytes.
 * Uses Web Crypto API when in browser
 * and `crypto` module when in node.js.
 */
export function random (size?: number): Promise<Uint8Array>;




/**
 * Generate 48 bits (6 bytes) timestamp - milliseconds since epoch.
 */
export function timestamp (): Uint8Array;
