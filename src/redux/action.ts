/**
 * Redux action tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type {
    AllowSubset,
    NonConstEnum,
    Override,
} from "../type/utils";
import type {
    Arr,
    Fun,
    SafeKey,
} from "../type/defs";
import { objectMap } from "../struct/object";




/**
 * redux-compatible Action interface.
 */
export interface ReduxCompatAction<ActionType = any> {
    type: ActionType;
}




/**
 * redux-compatible AnyAction interface.
 */
export interface ReduxCompatAnyAction<
    ActionType = any,
> extends ReduxCompatAction<ActionType> {
    [key: string]: any;
}




/**
 * Unique, private identifier distinguishing
 * between EmptyAction and PayloadAction (statically and in runtime).
 */
const payload = Symbol("payload");




/**
 * Empty action consists just of { type: ActionType } field.
 */
export interface EmptyAction<
    ActionType extends SafeKey = SafeKey,
> extends ReduxCompatAction<ActionType> {
    [payload]: false;
}




/**
 * Action with payload: { type: ActionType, payload: PayloadType }
 */
export interface PayloadAction<
    PayloadType = any,
    ActionType extends SafeKey = SafeKey,
> extends ReduxCompatAction<ActionType> {
    [payload]: true;
    payload: PayloadType;
}




/**
 * Empty action or action carrying payload.
 */
export type Action<
    PayloadType = any,
    ActionType extends SafeKey = SafeKey,
> =
    | EmptyAction<ActionType>
    | PayloadAction<PayloadType, ActionType>;




/**
 * Type predicate - does a given action carry payload?
 */
export function isWithPayload<PayloadType, ActionType extends SafeKey> (
    a: Action<PayloadType, ActionType>,
): a is PayloadAction<PayloadType, ActionType> {
    return a[payload];
}




/**
 * Type predicate - is a given action of string type?
 */
export function isStringActionType<PayloadType> (
    a: Action<PayloadType>,
): a is Action<PayloadType, string> {
    return typeof a.type === "string";
}




/**
 * Type predicate - is a given action of number type?
 */
export function isNumberActionType<PayloadType> (
    a: Action<PayloadType>,
): a is Action<PayloadType, number> {
    return typeof a.type === "number";
}




/**
 * Action creator not carrying anything else than just `type` field.
 */
export interface EmptyActionCreator<
    ActionType extends SafeKey,
> extends EmptyAction<ActionType> {
    (): EmptyAction<ActionType>;
}




/**
 * Action creator carrying payload (more than just `type`).
 */
export interface PayloadActionCreator<
    PayloadType = any,
    ActionType extends SafeKey = SafeKey,
    Args extends Arr = Arr,
> extends EmptyAction<ActionType> {
    (...args: Args): PayloadAction<PayloadType, ActionType>;
}




/**
 * Any action creator (carrying just `type` or `type` and `payload`).
 */
export interface ActionCreator<
    PayloadType = any,
    ActionType extends SafeKey = SafeKey,
    Args extends Arr = Arr,
> extends EmptyAction<ActionType> {
    (...args: Args): Action<PayloadType, ActionType>;
}




/**
 * Redux action creator definer.
 *
 * @function defineActionCreator
 * @param actionType Action type
 * @param creator Optional custom function returning payload.
 * @returns Action creator function.
 */
export function defineActionCreator<
    ActionType extends SafeKey,
> (actionType: ActionType):
    EmptyActionCreator<ActionType>;
export function defineActionCreator<
    ActionType extends SafeKey,
    PayloadType,
    Args extends Arr,
> (actionType: ActionType, creator?: Fun<Args, PayloadType>):
    PayloadActionCreator<PayloadType, ActionType, Args>;
export function defineActionCreator<
    ActionType extends SafeKey,
    PayloadType,
    Args extends Arr,
> (actionType: ActionType, creator?: Fun<Args, PayloadType>):
    ActionCreator<PayloadType, ActionType, Args> {
    let actionCreator: any = !creator ?
        () => ({
            type: actionType,
            [payload]: false,
        }) :
        (...args: Args) => ({
            type: actionType,
            [payload]: true,
            payload: creator(...args),
        });
    actionCreator.type = actionType;
    return actionCreator;
}




/**
 * Construct interface based on `ActionEnum`. Consist of empty action
 * creators (action creators without payload - just `type` field).
 */
export type EmptyActionCreators<ActionEnum extends NonConstEnum> = {
    [K in keyof ActionEnum]: EmptyActionCreator<ActionEnum[K]>;
};




/**
 * Construct object whose keys correspond to `actionEnum` keys and
 * values consists of empty action creators for each type. Conforms to
 * `EmptyActionCreators<ActionEnum>` interface.
 *
 * @function emptyActionCreators
 * @param actionEnum Enum upon which an EmptyActionCreators object is built.
 * @returns EmptyActionCreators object.
 */
export function emptyActionCreators<ActionEnum extends NonConstEnum> (
    actionEnum: ActionEnum,
): EmptyActionCreators<ActionEnum> {
    let actions = {} as EmptyActionCreators<ActionEnum>;
    for (const actionType in actionEnum) {
        actions[actionType] = defineActionCreator(actionEnum[actionType]);
    }
    return actions;
}




/**
 * Take `ActionEnum` type with `PayloadCreators` object type and construct
 * `PayloadActionCreators` on its basis.
 *
 * Constructed `PayloadActionCreators` object type consists only of keys
 * that are also present in `ActionEnum` type (all other keys are dropped).
 */
export type PayloadActionCreators<
    ActionEnum extends NonConstEnum,
    PayloadCreators,
> = {
    [K in Extract<keyof PayloadCreators, keyof ActionEnum>]:
        PayloadCreators[K] extends Fun<infer Args, infer PayloadType> ?
            PayloadActionCreator<PayloadType, ActionEnum[K], Args> : never;
};




/**
 * Take empty action creators object based on `ActionEnum` type
 * (an object with all action creators not carrying anything besides
 * `type` property) and `PayloadCreators` object consisting of plain
 * javascript functions taking arguments and returning values.
 *
 * `PayloadCreators` object type is constrained to be a subset of `ActionEnum`
 * type (in the sense of `AllowSubset` type defined in `type/utils.ts`).
 *
 * Create fully typed action creators object with all action creators
 * defined as `EmptyActionCreator` or `PayloadActionCreator`.
 *
 * @function payloadActionCreators
 * @param emptyActionCreators EmptyActionCreators object
 * @param payloadCreators Object with payload creators.
 * @returns ActionCreators object.
 */
export function payloadActionCreators<
    ActionEnum extends NonConstEnum,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>,
> (
    emptyActionCreators: EmptyActionCreators<ActionEnum>,
    payloadCreators: PayloadCreators,
):
    Override<
        typeof emptyActionCreators,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >
{
    return Object.assign(
        emptyActionCreators,
        objectMap(payloadCreators) <keyof ActionEnum>(([key, creator]) => [
            key, defineActionCreator(emptyActionCreators[key].type, creator),
        ]),
    );
}




/**
 * Construct action slice for provided action enum. Optionally
 * define action creators with payload. Statically typed.
 *
 * @function actionCreators
 * @param actionEnum Enum upon which an ActionCreators object is built.
 * @param payloadCreators Optional object with payload creators.
 * @returns ActionCreators object.
 */
export function actionCreators<
    ActionEnum extends NonConstEnum,
> (actionEnum: ActionEnum): EmptyActionCreators<ActionEnum>;
export function actionCreators<
    ActionEnum extends NonConstEnum,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>,
> (
    actionEnum: ActionEnum,
    payloadCreators?: PayloadCreators,
):
    Override<
        EmptyActionCreators<ActionEnum>,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >;
export function actionCreators<
    ActionEnum extends NonConstEnum,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>,
> (
    actionEnum: ActionEnum,
    payloadCreators?: PayloadCreators,
):
    | EmptyActionCreators<ActionEnum>
    | Override<
        EmptyActionCreators<ActionEnum>,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >
{
    const eac = emptyActionCreators(actionEnum);
    if (payloadCreators) {
        return payloadActionCreators(eac, payloadCreators);
    } else {
        return eac;
    }
}




/**
 * Binds given action creator with chosen store's dispatch.
 *
 * @function bindActionCreator
 * @param actionCreator any action creator
 * @param dispatch redux store's `dispatch` function
 * @returns bound action creator
 */
export function bindActionCreator<
    ActionCreatorType extends Fun,
    ReduxDispatch extends Fun<[Action]>,
> (
    actionCreator: ActionCreatorType | ActionCreator,
    dispatch: ReduxDispatch,
): typeof actionCreator {
    let boundActionCreator = (
        ...args: Parameters<ActionCreatorType>
    ) => dispatch(actionCreator(...args));
    if ((actionCreator as ActionCreator).type) {
        (boundActionCreator as ActionCreator).type =
            (actionCreator as ActionCreator).type;
    }
    return boundActionCreator as ActionCreatorType;
}




/**
 * Redux's original `bindActionCreators` clone with extended `Action`
 * support (original function assumes dispatch parametrized with redux's
 * `AnyAction` which is not compatible with `Action`).
 *
 * Turns an object with action creators into an object with every
 * action creator wrapped into a `dispatch` call.
 *
 * @function bindActionCreators
 * @param actionCreators Object with action creator functions
 * @param dispatch redux store's `dispatch` function
 * @returns Object with wrapped action creators
 */
export function bindActionCreators<
    ActionCreatorType extends Fun,
    ReduxDispatch extends Fun<[Action]>,
    ActionCreators extends Record<SafeKey, ActionCreatorType | ActionCreator>,
> (
    actionCreators: ActionCreators,
    dispatch: ReduxDispatch,
): typeof actionCreators {
    return (
        objectMap(actionCreators) (
            ([k, a]) => [k, bindActionCreator(a, dispatch)],
        )
    ) as unknown as ActionCreators;
}




/**
 * Bind whole tree of action creators to the redux's dispatch function.
 *
 * @function bindActionCreatorsTree
 * @param acTree Object with `actionCreators` objects
 * @param dispatch redux store's `dispatch` function
 * @returns Object with wrapped action creators
 */
export function bindActionCreatorsTree<
    ActionCreatorType extends Fun,
    ReduxDispatch extends Fun<[Action]>,
    ActionCreators extends Record<SafeKey, ActionCreatorType | ActionCreator>,
    ACTree extends Record<keyof ACTree, ActionCreators>,
> (
    acTree: ACTree,
    dispatch: ReduxDispatch,
): ACTree {
    return objectMap(acTree) (
        ([k, a]) => [k, bindActionCreators(a, dispatch)],
    ) as ACTree;
}
