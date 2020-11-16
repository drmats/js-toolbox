/**
 * Redux - type declarations.
 *
 * @module @xcmats/js-toolbox/redux
 * @license Apache-2.0
 * @author drmats
 */




// ...
export type ReduxAction = <T>(s: T, a:? string) => T;




/**
 * Create clean and readable reducers for redux.
 */
export declare function createReducer<T> (initState?: T): (
    actions: Record<string, ReduxAction<T>>,
    defAct?: ReduxAction<T>
) => ReduxAction<T>;
