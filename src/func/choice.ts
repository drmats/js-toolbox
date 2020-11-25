/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import type {
    JSAnyFun,
    JSAnyArr,
} from "../type/consts";




/**
 * Functional replacement of a `switch` statement.
 *
 * @function choose
 * @param {String} key
 * @param {Record<string, JSAnyFun<T>>} [actions]
 * @param {Function} [defaultAction]
 * @param {Array} [args]
 * @returns {T}
 */
export function choose<T> (
    key: string,
    actions: Record<string, JSAnyFun<T>> = {},
    defaultAction: JSAnyFun = () => null,
    args: JSAnyArr = []
): T {
    return key in actions ?
        actions[key](...args) :
        defaultAction(...args);
}
