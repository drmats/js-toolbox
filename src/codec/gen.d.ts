/**
 * Codec - type declarations.
 *
 * @module codec
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




/**
 * Get random bytes.
 * Uses Web Crypto API when in browser
 * and `crypto` module when in node.js.
 */
export declare function random (): Promise<Uint8Array>;
export declare function random (size: number): Promise<Uint8Array>;




/**
 * Generate 48 bits (6 bytes) timestamp - milliseconds since epoch.
 */
export declare function timestamp (): Uint8Array;
