/**
 * Redux tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */




import type { JSAnyObj } from "../type/consts";
import { choose } from "../func/tools";




// ...
export interface ReduxAnyAction<A = string> {
    type: A;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

// ...
export type ReduxReducer<S = JSAnyObj, A = string> = (
    s: S,
    a: ReduxAnyAction<A>
) => S;

// ...
export type ReduxBoundReducer<S = JSAnyObj, A = string> = (
    reducers: Record<string, ReduxReducer<S, A>>,
    defaultReducer?: ReduxReducer<S, A>
) => ReduxReducer<S, A>;




// overload for generic state
export function createReducer<S> (
    initState: S
): ReduxBoundReducer<S, string>;

/**
 * Create clean and readable reducers for redux.
 *
 * @function createReducer
 * @param {Object} [initState={}]
 * @returns {ReduxBoundReducer}
 */
export function createReducer (
    initState: JSAnyObj = {}
): ReduxBoundReducer<JSAnyObj, string> {
    return (reducers, defaultReducer = (s, _a) => s) =>
        (state = initState, action) =>
            choose(
                action.type,
                reducers,
                defaultReducer,
                [state, action]
            );
}
