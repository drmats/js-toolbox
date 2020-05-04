/**
 * String - type declarations.
 *
 * @module @xcmats/js-toolbox/string
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Convert `thisKindOfText` to `ThisKindOfText`.
 */
export declare function camelToPascal (str: string): string;




/**
 * Convert `thisKindOfText` to `this_kind_of_text`.
 */
export declare function camelToSnake (str: string): string;




/**
 * Ensure given string is in form `Aaaaaaaa`.
 */
export declare function capitalize (str: string): string;




/**
 * Constructs new string with inserted `sep` (of default value `…`)
 * at the `ellipsis.BEGIN`, `ellipsis.MIDDLE` or `ellipsis.END`.
 * Returned string has the same length as input string
 * (thus some original characters are replaced with `sep` contents).
 */
export declare function ellipsis (
    str: string,
    placing?: number,
    sep?: string
): string;




/**
 * Prepend given `input` string with an appropriate amount of
 * `ch` characters so that returning string length is equal to `len`.
 * If `len` is smaller than length of `input` then `input` is being
 * returned untouched (padding doesn't shorten the `input`).
 */
export declare function padLeft (
    input: string,
    len: number,
    ch?: string
): string;




/**
 * Append an appropriate amount of `ch` characters to the given `input`
 * string so that returning string length is equal to `len`.
 * If `len` is smaller than length of `input` then `input` is being
 * returned untouched (padding doesn't shorten the `input`).
 */
export declare function padRight (
    input: string,
    len: number,
    ch?: string
): string;




/**
 * Convert `ThisKindOfText` to `thisKindOfText`.
 */
export declare function pascalToCamel (str: string): string;




/**
 * Convert `ThisKindOfText` to `this_kind_of_text`.
 */
export declare function pascalToSnake (str: string): string;




/**
 * Quote text.
 */
export declare function quote (str?: string, q?: string): string;




/**
 * Constructs new string not longer than `len`.
 */
export declare function shorten (
    str: string,
    len?: number,
    placing?: number,
    sep?: string
): string;




/**
 * Convert `this_kind_of_text` to `thisKindOfText`.
 */
export declare function snakeToCamel (str: string): string;




/**
 * Convert `this_kind_of_text` to `ThisKindOfText`.
 */
export declare function snakeToPascal (str: string): string;




/**
 * Wrap passed string with `prefix` and `suffix`.
 */
export declare function wrap (
    str?: string,
    prefix?: string,
    suffix?: string
): string;
