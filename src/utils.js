// helper - handle exceptions in expressions
export const handleException = (fn, handler) => {
    try { return fn() }
    catch (ex) { return typeof handler === "function" ? handler(ex) : ex }
}




// simple array flattener
// [[1, 2,], ..., [3, 4,],]  ->  [1, 2, ..., 3, 4,]
export const flatten = (arr) => arr.reduce((acc, el) => acc.concat(el), [])




// functional replacement of a "switch" statement
export const choose = (
    key,
    actions = {},
    defaultAction = () => null,
    args = []
) =>
    key in actions ?
        actions[key](...args) :
        defaultAction(...args)




// create clean and readable reducers for redux
export const createReducer = (initState = {}) =>
    (actions, defaultAction = (s, _a) => s) =>
        (state = initState, action) =>
            choose(
                action.type,
                actions,
                defaultAction,
                [state, action,]
            )
