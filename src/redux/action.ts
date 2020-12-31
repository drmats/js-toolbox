/**
 * Redux action tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type { AllowSubset, Override } from "../type/utils";
import type { Fun } from "../type/defs";




/**
 * redux-compatible Action interface.
 */
export interface ReduxCompatAction<ActionType = any> {
    type: ActionType;
}




/**
 * redux-compatible AnyAction interface.
 */
export interface ReduxCompatAnyAction extends ReduxCompatAction {
    [key: string]: any;
}




/**
 * Empty action consists just of { type: A } field.
 */
export type EmptyAction<ActionType> = ReduxCompatAction<ActionType>;




/**
 * Payload shape.
 */
export interface Payload<PayloadType = any> {
    payload: PayloadType;
}




/**
 * Action shape: { type: A, payload: T }
 */
export type PayloadAction<A, P> = EmptyAction<A> & Payload<P>;




/**
 * Action creator not carrying anything else than just `type` field.
 */
export interface EmptyActionCreator<
    ActionType
> extends EmptyAction<ActionType> {
    (): EmptyAction<ActionType>;
}




/**
 * Action creator carrying payload (more fields than just `type`).
 */
export interface PayloadActionCreator<
    ActionType,
    Args extends unknown[],
    PayloadType
> extends EmptyAction<ActionType> {
    (...args: Args): PayloadAction<ActionType, PayloadType>;
}




/**
 * Any action creator (carrying just `type` or having more fields).
 */
export interface ActionCreator<
    ActionType,
    Args extends unknown[],
    PayloadType
> extends EmptyAction<ActionType> {
    (...args: Args):
        PayloadAction<ActionType, PayloadType> | EmptyAction<ActionType>;
}




/**
 * Redux action creator definer.
 *
 * @param type Action type
 * @param creator Custom function returning object.
 * @returns Action creator function.
 */
export function defineActionCreator<
    ActionType
> (type: ActionType):
    EmptyActionCreator<ActionType>;
export function defineActionCreator<
    ActionType,
    Args extends unknown[],
    PayloadType
> (type: ActionType, creator: (...args: Args) => PayloadType):
    PayloadActionCreator<ActionType, Args, PayloadType>;
export function defineActionCreator<
    ActionType,
    Args extends unknown[],
    PayloadType
> (type: ActionType, creator?: (...args: Args) => PayloadType):
    ActionCreator<ActionType, Args, PayloadType> {
    let actionCreator: any = !creator ?
        () => ({ type }) :
        (...args: Args) => ({ type, payload: creator(...args) });
    actionCreator.type = type;
    return actionCreator;
}




/**
 * Construct interface based on `ActionEnum`. Consist of empty action
 * creators (action creators without payload - just `type` field).
 */
export type EmptyActionCreators<ActionEnum> = {
    [K in keyof ActionEnum]: EmptyActionCreator<ActionEnum[K]>;
};




/**
 * Construct object whose keys correspond to `actionEnum` keys and
 * values consists of empty action creators for each type. Conforms to
 * `EmptyActionCreators<ActionEnum>` interface.
 */
export function emptyActionCreators<ActionEnum> (
    actionEnum: ActionEnum
): EmptyActionCreators<ActionEnum> {
    let actions: EmptyActionCreators<ActionEnum> =
        {} as EmptyActionCreators<ActionEnum>;
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
export type PayloadActionCreators<ActionEnum, PayloadCreators> = {
    [K in Extract<keyof PayloadCreators, keyof ActionEnum>]:
        PayloadCreators[K] extends Fun<infer Args, infer P> ?
            PayloadActionCreator<ActionEnum[K], Args, P> : never
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
 */
export function payloadActionCreators<
    ActionEnum,
    PayloadCreators extends AllowSubset<ActionEnum, PayloadCreators>
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
        Object.fromEntries(
            (Object.entries(payloadCreators) as [keyof ActionEnum, Fun][])
                .map(([key, creator]) => [
                    key, defineActionCreator(
                        emptyActionCreators[key].type, creator
                    ),
                ]) as [any, any][]
        ));
}
