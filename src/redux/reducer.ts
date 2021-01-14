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
import { isWithPayload } from "./action";
import { choose } from "../func/choice";
import { identity } from "../func/tools";




/**
 * redux-compatible Reducer type.
 */
export type ReduxCompatReducer<
    StateType = any,
    ActionShape extends ReduxCompatAction = ReduxCompatAnyAction,
> = (
    state: StateType | undefined,
    action: ActionShape,
) => StateType;




/**
 * Reducer - function taking state and action and returning a new state.
 */
export type Reducer<
    StateType = any,
    PayloadType = any,
    ActionType extends SafeKey = SafeKey,
> = (
    state: StateType,
    action: Action<PayloadType, ActionType>,
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
    defaultReducer?: Reducer<StateType>,
) => ReduxCompatReducer<StateType, Action> {
    return (reducers, defaultReducer = identity) =>
        (state = initState, action) =>
            choose(
                action.type,
                reducers,
                defaultReducer,
                [state, action],
            );
}




/**
 * Chainable API for building reducer handling a slice of state.
 */
interface SliceBuildAPI<StateType> {
    // handle empty action (overload)
    handle<ActionType extends SafeKey> (
        actionCreator: EmptyActionCreator<ActionType>,
        reducer: (state: Readonly<StateType>) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // handle action with payload (overload)
    handle<ActionType extends SafeKey, PayloadType> (
        actionCreator: PayloadActionCreator<PayloadType, ActionType>,
        reducer: (
            state: Readonly<StateType>,
            payload: PayloadType,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // handle unmatched actions
    default (
        reducer: (
            state: Readonly<StateType>,
            action: Action,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // match actions using type predicate - useful for matching actions
    // by payload content (overload)
    match <PayloadType>(
        predicate: (action: Action) => action is Action<PayloadType>,
        reducer: (
            state: Readonly<StateType>,
            payload: PayloadType,
        ) => Readonly<StateType>,
    ): SliceBuildAPI<StateType>;
    // match action using boolean predicate - useful for matching actions
    // using string operations on their type (overload)
    match (
        predicate: (action: Action) => boolean,
        reducer: (state: Readonly<StateType>) => Readonly<StateType>,
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
    builder: (slice: SliceBuildAPI<StateType>) => void,
) => ReduxCompatReducer<Readonly<StateType>, Action> {

    let
        reducers = {} as Record<SafeKey, Fun>,
        matchers = [] as ReduxCompatReducer<Readonly<StateType>, Action>[],
        defaultReducer: (
            state: Readonly<StateType>,
            action: Action,
        ) => Readonly<StateType>;

    const
        create = createReducer(initState),
        slice: SliceBuildAPI<StateType> = {
            // handle concrete type of action
            handle: <ActionType extends SafeKey, PayloadType>(
                actionCreator: ActionCreator<PayloadType, ActionType>,
                reducer: (
                    state: Readonly<StateType>,
                    payload?: PayloadType,
                ) => Readonly<StateType>,
            ): typeof slice => {
                if (reducer.length === 2) {
                    reducers[actionCreator.type] = (
                        state: Readonly<StateType>,
                        action: PayloadAction<PayloadType, ActionType>,
                    ) => reducer(state, action.payload);
                } else {
                    reducers[actionCreator.type] = (
                        state: Readonly<StateType>,
                    ) => reducer(state);
                }
                return slice;
            },
            // handle unmatched actions (state identity by default)
            default: (reducer) => {
                defaultReducer = reducer;
                return slice;
            },
            // additionally match actions using predicate (matcher is run
            // against all actions - handled and unhandled earlier)
            match: <PayloadType>(
                predicate: (action: Action) => boolean,
                reducer: (
                    state: Readonly<StateType>,
                    payload?: PayloadType,
                ) => Readonly<StateType>,
            ): typeof slice => {
                matchers.push(
                    (state, action) =>
                        predicate(action) ?
                            isWithPayload(action) ?
                                reducer(state || initState, action.payload) :
                                reducer(state || initState) :
                            state || initState,

                );
                return slice;
            },
        };

    // function building actual reducer based on provided builder function
    return (builder) => {

        // build `reducers` object and `matchers` array
        builder(slice);

        // create main (slice) reducer
        const reducer = defaultReducer ?
            create(reducers, defaultReducer) :
            create(reducers);

        // return reducer that is also applying all defined matchers
        return (state, action) => {
            let localState = reducer(state, action);
            for (const match of matchers) {
                localState = match(localState, action);
            }
            return localState;
        };

    };

}
