/**
 * Redux reducer tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type {
    Fun,
    SafeKey,
} from "../type/defs";
import type {
    Action,
    ActionCreator,
    EmptyActionCreator,
    PayloadAction,
    PayloadActionCreator,
    ReduxCompatAction,
    ReduxCompatAnyAction,
} from "./action";
import { choose } from "../func/choice";
import { identity } from "../func/tools";




/**
 * redux-compatible Reducer type.
 */
export type ReduxCompatReducer<
    StateType = any,
    ActionShape extends ReduxCompatAction = ReduxCompatAnyAction
> = (
    state: StateType | undefined,
    action: ActionShape
) => StateType;




/**
 * Reducer - function taking state and action and returning a new state.
 */
export type Reducer<
    StateType = any,
    PayloadType = any,
    ActionType extends SafeKey = SafeKey
> = (
    state: StateType,
    action: Action<PayloadType, ActionType>
) => StateType;




/**
 * Create clean and readable reducers for redux.
 *
 * @function createReducer
 * @param initState
 * @returns {ReduxBoundReducer}
 */
export function createReducer<StateType> (initState: StateType): (
    reducers: Record<SafeKey, Reducer<StateType>>,
    defaultReducer?: Reducer<StateType>
) => ReduxCompatReducer<StateType, Action> {
    return (reducers, defaultReducer = identity) =>
        (state = initState, action) =>
            choose(
                action.type,
                reducers,
                defaultReducer,
                [state, action]
            );
}




/**
 * Chainable API for building reducer handling a slice of state.
 */
interface SliceBuildAPI<StateType> {
    handle<ActionType extends SafeKey> (
        actionCreator: EmptyActionCreator<ActionType>,
        reducer: (state: StateType) => StateType
    ): SliceBuildAPI<StateType>;
    handle<ActionType extends SafeKey, PayloadType> (
        actionCreator: PayloadActionCreator<PayloadType, ActionType>,
        reducer: (state: StateType, payload: PayloadType) => StateType
    ): SliceBuildAPI<StateType>;
    default (
        reducer: (
            state: StateType,
            action: Action
        ) => StateType
    ): SliceBuildAPI<StateType>;
}




/**
 * Statically typed reducer for a slice of state.
 *
 * @function sliceReducer
 * @param initState
 * @returns (builder: (slice: SliceBuildAPI) => void) => ReduxCompatReducer
 */
export function sliceReducer<StateType> (initState: StateType): (
    builder: (slice: SliceBuildAPI<StateType>) => void
) => ReduxCompatReducer<StateType, Action> {

    let
        reducers = {} as Record<SafeKey, Fun>,
        defaultReducer: (
            state: StateType,
            action: Action
        ) => StateType;

    const
        create = createReducer(initState),
        slice: SliceBuildAPI<StateType> = {
            handle: <ActionType extends SafeKey, PayloadType>(
                actionCreator: ActionCreator<PayloadType, ActionType>,
                reducer: (state: StateType, payload?: PayloadType) => StateType
            ): typeof slice => {
                if (reducer.length === 2) {
                    reducers[actionCreator.type] = (
                        state: StateType,
                        action: PayloadAction<PayloadType, ActionType>
                    ) => reducer(state, action.payload);
                } else {
                    reducers[actionCreator.type] = (
                        state: StateType
                    ) => reducer(state);
                }
                return slice;
            },
            default: (reducer) => {
                defaultReducer = reducer;
                return slice;
            },
        };

    return (builder) => {

        builder(slice);

        return defaultReducer ?
            create(reducers, defaultReducer) :
            create(reducers);

    };

}
