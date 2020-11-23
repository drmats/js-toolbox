/**
 * Data structure manipulation tools.
 *
 * @module struct
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import { handleException } from "../func/tools";




/**
 * Apply `path` to an object `o`. Return element reachable through
 * that `path` or `def` value.
 *
 * Example:
 *
 * ```
 * access({ a: { b: [10, { c: 42 }] } }, ["a", "b", 1, "c"])  ===  42
 * ```
 *
 * @function access
 * @param {Object} [o={}]
 * @param {Array.<String|Number>} [path=[]]
 * @param {unknown} [def]
 * @returns {any}
 */
export function access (
    o: any = {},
    path: (string | number)[] = [],
    def?: unknown
): any {
    return handleException(
        () => path.reduce((acc, p) => acc[p], o) || def,
        () => def
    );
}
