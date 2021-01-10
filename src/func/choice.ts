/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import type {
    Arr,
    JSAnyFun,
    SafeKey,
} from "../type/defs";




/**
 * Functional replacement of a `switch` statement.
 *
 * @function choose
 * @param key
 * @param [actions]
 * @param [defaultAction]
 * @param [args]
 * @returns {T}
 */
export function choose<T, Key extends SafeKey> (
    key: Key,
    actions = {} as Record<Key, JSAnyFun<T>>,
    defaultAction: JSAnyFun = () => null,
    args = [] as Arr
): T {
    return key in actions ?
        actions[key](...args) :
        defaultAction(...args);
}
