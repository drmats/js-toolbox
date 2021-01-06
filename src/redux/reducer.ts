/**
 * Redux reducer tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type {
    ReduxCompatAction,
    ReduxCompatAnyAction,
} from "./action";
import { choose } from "../func/choice";




/**
 * redux-compatible Reducer type.
 */
export type ReduxCompatReducer<
    StateType = any,
    ActionType extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: StateType | undefined,
    action: ActionType
) => StateType;




/**
 * js-toolbox own Reducer type.
 */
export type Reducer<
    StateType = any,
    ActionType extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: StateType,
    action: ActionType
) => StateType;




/**
 * js-toolbox own ReducersMap type.
 */
export type ReducersMap<
    StateType,
    ActionType extends ReduxCompatAction = ReduxCompatAction
> = {
    [actionType: string]: Reducer<StateType, ActionType>,
};




/**
 * createReducer() return type.
 */
export type ReduxBoundReducer<
    StateType,
    ActionType extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    reducers: ReducersMap<StateType, ActionType>,
    defaultReducer?: ReduxCompatReducer<StateType, ActionType>
) => ReduxCompatReducer<StateType, ActionType>;




/**
 * Create clean and readable reducers for redux.
 *
 * @function createReducer
 * @param initState
 * @returns {ReduxBoundReducer}
 */
export function createReducer<StateType> (
    initState: StateType
): ReduxBoundReducer<StateType> {
    return (reducers, defaultReducer = (s, _a) => s ? s : initState) =>
        (state = initState, action) =>
            choose(
                action.type,
                reducers,
                defaultReducer,
                [state, action]
            );
}
