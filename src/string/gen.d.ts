/**
 * String - type declarations.
 *
 * @module @xcmats/js-toolbox/string
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Allocate a big string (of size 2^n). Use with caution!
 *
 * - `big(16)` makes `2^16 = 65536` string size.
 * - `big(23)` makes `2^23 = 8M` string size,
 * - `big(24)` makes `16M` and so on.
 *
 * `c = "x"` - Character used during string generation.
 *
 * Example:
 *
 * ```
 * big(2) === "xxxx"
 * big(3, "a") === "aaaaaaaa"
 * ```
 */
export declare function big (n: number, c?: string): string;




/**
 * Construct random string of desired length.
 */
export declare function random (
    size?: number,
    letters?: string
): string;
