/**
 * Redux reducer tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type {
    AnyKey,
    Fun,
} from "../type/defs";
import type {
    ActionCreator,
    EmptyActionCreator,
    PayloadAction,
    PayloadActionCreator,
    ReduxCompatAction,
    ReduxCompatAnyAction,
} from "./action";
import { choose } from "../func/choice";




/**
 * redux-compatible Reducer type.
 */
export type ReduxCompatReducer<
    StateType = any,
    Action extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: StateType | undefined,
    action: Action
) => StateType;




/**
 * js-toolbox own Reducer type.
 */
export type Reducer<
    StateType = any,
    Action extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: StateType,
    action: Action
) => StateType;




/**
 * js-toolbox own ReducersMap type.
 */
export type ReducersMap<
    StateType,
    Action extends ReduxCompatAction = ReduxCompatAction
> = {
    [actionType: string]: Reducer<StateType, Action>,
};




/**
 * createReducer() return type.
 */
export type ReduxBoundReducer<
    StateType,
    Action extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    reducers: ReducersMap<StateType, Action>,
    defaultReducer?: ReduxCompatReducer<StateType, Action>
) => ReduxCompatReducer<StateType, Action>;




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




/**
 * ...
 */
interface SliceBuilderAPI<StateType> {
    handle<ActionType extends AnyKey> (
        actionCreator: EmptyActionCreator<ActionType>,
        reducer: (state: StateType) => StateType
    ): void;
    handle<ActionType extends AnyKey, PayloadType> (
        actionCreator: PayloadActionCreator<ActionType, PayloadType>,
        reducer: (state: StateType, payload: PayloadType) => StateType
    ): void;
}




/**
 * Statically typed reducer for a "slice" of state.
 *
 * @function sliceReducer
 * @param initState
 * @param builder (slice: SliceBuilderAPI) => void
 * @returns {ReduxCompatReducer}
 */
export function sliceReducer<StateType> (
    initState: StateType,
    builder: (slice: SliceBuilderAPI<StateType>) => void
): ReduxCompatReducer<StateType, ReduxCompatAction> {
    let reducers = {} as Record<AnyKey, Fun>;
    builder({
        handle: <ActionType extends AnyKey, PayloadType> (
            actionCreator: ActionCreator<ActionType, PayloadType>,
            reducer: (state: StateType, payload?: PayloadType) => StateType
        ): void => {
            if (reducer.length === 2) {
                reducers[actionCreator.type] = (
                    state: StateType,
                    action: PayloadAction<ActionType, PayloadType>
                ) => reducer(state, action.payload);
            } else {
                reducers[actionCreator.type] = (
                    state: StateType
                ) => reducer(state);
            }
        },
    });
    return createReducer(initState) (reducers);
}
