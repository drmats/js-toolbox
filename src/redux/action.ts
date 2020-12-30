/**
 * Redux action tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




/**
 * redux-compatible Action interface.
 */
export interface ReduxCompatAction<A = any> {
    type: A;
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
export type EmptyAction<A> = ReduxCompatAction<A>;




/**
 * Payload shape.
 */
export interface Payload<T = any> {
    payload: T;
}




/**
 * Action shape: { type: A, payload: T }
 */
export type PayloadAction<A, T> = EmptyAction<A> & Payload<T>;




/**
 * Action creator not carrying anything else than just `type` field.
 */
export interface EmptyActionCreator<
    ActionEnum
> extends EmptyAction<ActionEnum> {
    (): EmptyAction<ActionEnum>;
}




/**
 * Action creator carrying payload (more fields than just `type`).
 */
export interface PayloadActionCreator<
    ActionEnum,
    Args extends unknown[],
    R
> extends EmptyAction<ActionEnum> {
    (...args: Args): PayloadAction<ActionEnum, R>;
}




/**
 * Any action creator (carrying just `type` or having more fields).
 */
export interface ActionCreator<
    ActionEnum,
    Args extends unknown[],
    R
> extends EmptyAction<ActionEnum> {
    (...args: Args):
        PayloadAction<ActionEnum, R> | EmptyAction<ActionEnum>;
}




/**
 * Redux action creator definer.
 *
 * @param type Action type
 * @param creator Custom function returning object.
 * @returns Action creator function.
 */
export function defineActionCreator<
    ActionEnum
> (type: ActionEnum):
    EmptyActionCreator<ActionEnum>;
export function defineActionCreator<
    ActionEnum,
    Args extends unknown[],
    R extends Record<string, never> | Record<string, unknown>
> (type: ActionEnum, creator: (...args: Args) => R):
    PayloadActionCreator<ActionEnum, Args, R>;
export function defineActionCreator<
    ActionEnum,
    Args extends unknown[],
    R extends Record<string, never> | Record<string, unknown>
> (type: ActionEnum, creator?: (...args: Args) => R):
    ActionCreator<ActionEnum, Args, R> {
    let actionCreator: any = !creator ?
        () => ({ type }) :
        (...args: Args) => ({ type, payload: creator(...args) });
    actionCreator.type = type;
    return actionCreator;
}
