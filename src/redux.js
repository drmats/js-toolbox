/**
 * Redux tools.
 *
 * @module redux
 * @license Apache-2.0
 * @author drmats
 */




import { choose } from "./utils"




/**
 * Create clean and readable reducers for redux.
 *
 * @function createReducer
 * @param {Object} [initState={}]
 * @returns {Function}
 */
export const createReducer = (initState = {}) =>
    (actions, defaultAction = (s, _a) => s) =>
        (state = initState, action) =>
            choose(
                action.type,
                actions,
                defaultAction,
                [state, action]
            )
