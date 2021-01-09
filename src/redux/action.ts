/**
 * Redux action tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type { AllowSubset, NonConstEnum, Override } from "../type/utils";
import type { AnyKey, Arr, Fun } from "../type/defs";
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
    ActionType = any
> extends ReduxCompatAction<ActionType> {
    [key: string]: any;
}




/**
 * Empty action consists just of { type: ActionType } field.
 */
export type EmptyAction<
    ActionType extends AnyKey
> = ReduxCompatAction<ActionType>;




/**
 * Action with payload: { type: ActionType, payload: PayloadType }
 */
export interface PayloadAction<
    ActionType extends AnyKey,
    PayloadType
> extends EmptyAction<ActionType> {
    payload: PayloadType;
}




/**
 * Action creator not carrying anything else than just `type` field.
 */
export interface EmptyActionCreator<
    ActionType extends AnyKey
> extends EmptyAction<ActionType> {
    (): EmptyAction<ActionType>;
}




/**
 * Action creator carrying payload (more than just `type`).
 */
export interface PayloadActionCreator<
    ActionType extends AnyKey,
    PayloadType,
    Args extends Arr = Arr
> extends EmptyAction<ActionType> {
    (...args: Args): PayloadAction<ActionType, PayloadType>;
}




/**
 * Any action creator (carrying just `type` or `type` and `payload`).
 */
export interface ActionCreator<
    ActionType extends AnyKey,
    PayloadType,
    Args extends Arr = Arr
> extends EmptyAction<ActionType> {
    (...args: Args):
        | EmptyAction<ActionType>
        | PayloadAction<ActionType, PayloadType>;
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
    ActionType extends AnyKey
> (actionType: ActionType):
    EmptyActionCreator<ActionType>;
export function defineActionCreator<
    ActionType extends AnyKey,
    PayloadType,
    Args extends Arr
> (actionType: ActionType, creator?: Fun<Args, PayloadType>):
    PayloadActionCreator<ActionType, PayloadType, Args>;
export function defineActionCreator<
    ActionType extends AnyKey,
    PayloadType,
    Args extends Arr
> (actionType: ActionType, creator?: Fun<Args, PayloadType>):
    ActionCreator<ActionType, PayloadType, Args> {
    let actionCreator: any = !creator ?
        () => ({ type: actionType }) :
        (...args: Args) => ({ type: actionType, payload: creator(...args) });
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
    actionEnum: ActionEnum
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
    PayloadCreators
> = {
    [K in Extract<keyof PayloadCreators, keyof ActionEnum>]:
        PayloadCreators[K] extends Fun<infer Args, infer PayloadType> ?
            PayloadActionCreator<ActionEnum[K], PayloadType, Args> : never
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
    payloadCreators: PayloadCreators
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
        ])
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
    ActionEnum extends NonConstEnum
> (actionEnum: ActionEnum): EmptyActionCreators<ActionEnum>;
export function actionCreators<
    ActionEnum extends NonConstEnum,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>
> (
    actionEnum: ActionEnum,
    payloadCreators?: PayloadCreators
):
    Override<
        EmptyActionCreators<ActionEnum>,
        PayloadActionCreators<ActionEnum, PayloadCreators>
    >;
export function actionCreators<
    ActionEnum extends NonConstEnum,
    PayloadCreators extends
        & AllowSubset<ActionEnum, PayloadCreators>
        & Partial<Record<keyof ActionEnum, Fun>>
> (
    actionEnum: ActionEnum,
    payloadCreators?: PayloadCreators
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
