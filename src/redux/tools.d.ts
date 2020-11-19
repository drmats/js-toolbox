/**
 * Redux - type declarations.
 *
 * @module @xcmats/js-toolbox/redux
 * @license Apache-2.0
 * @author drmats
 */




// ...
export interface ReduxActionObject {
    type: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}




// ...
export type ReduxAction<T> = (s: T, a?: ReduxActionObject) => T;




/**
 * Create clean and readable reducers for redux.
 */
export declare function createReducer<T> (initState?: T): (
    actions: Record<string, ReduxAction<T>>,
    defAct?: ReduxAction<T>
) => ReduxAction<T>;
