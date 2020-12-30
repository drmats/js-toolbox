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
 * Action creator not carrying anything else than just `type` field.
 */
export interface EmptyActionCreator<
    ActionEnum
> extends ReduxCompatAction<ActionEnum> {
    (): ReduxCompatAction<ActionEnum>;
}




/**
 * Action creator carrying payload (more fields than just `type`).
 */
export interface PayloadActionCreator<
    ActionEnum,
    Args extends unknown[],
    R
> extends ReduxCompatAction<ActionEnum> {
    (...args: Args): ReduxCompatAction<ActionEnum> & R;
}




/**
 * Any action creator (carrying just `type` or having more fields).
 */
export interface ActionCreator<
    ActionEnum,
    Args extends unknown[],
    R
> extends ReduxCompatAction<ActionEnum> {
    (...args: Args):
        ReduxCompatAction<ActionEnum> & R | ReduxCompatAction<ActionEnum>;
}




/**
 * Redux action creator definer.
 *
 * @param type Action type
 * @param creator Custom function returning payload object.
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
        (...args: Args) => ({ ...creator(...args), type });
    actionCreator.type = type;
    return actionCreator;
}
