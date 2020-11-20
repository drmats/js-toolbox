/**
 * Redux tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import { choose } from "../func/tools";




// redux-compatible Action interface
export interface ReduxCompatAction<A = any> {
    type: A;
}

// redux-compatible AnyAction interface
export interface ReduxCompatAnyAction extends ReduxCompatAction {
    [key: string]: any;
}

// redux-compatible Reducer type
export type ReduxCompatReducer<
    S = any,
    A extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: S | undefined,
    action: A
) => S;

// js-toolbox own Reducer type
export type Reducer<
    S = any,
    A extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: S,
    action: A
) => S;

// js-toolbox own ReducersMap type
export type ReducersMap<
    S,
    A extends ReduxCompatAction = ReduxCompatAction
> = {
    [actionType: string]: Reducer<S, A>
};

// js-toolbox createReducer() return type
export type ReduxBoundReducer<
    S,
    A extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    reducers: ReducersMap<S, A>,
    defaultReducer?: ReduxCompatReducer<S, A>
) => ReduxCompatReducer<S, A>;




/**
 * Create clean and readable reducers for redux.
 *
 * @function createReducer
 * @param initState
 * @returns {ReduxBoundReducer}
 */
export function createReducer<S> (
    initState: S
): ReduxBoundReducer<S> {
    return (reducers, defaultReducer = (s, _a) => s ? s : initState) =>
        (state = initState, action) =>
            choose(
                action.type,
                reducers,
                defaultReducer,
                [state, action]
            );
}
