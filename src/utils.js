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




// construct object from result of Object.entries() call
// entries = [[k1, v1], ... [kn, vn]]
//
// imitates Python's dict()
export const dict = (entries) => entries.reduce(
    (acc, [k, v,]) => ({ ...acc, [k]: v, }), {}
)




// helper - handle exceptions in expressions
export const handleException = (fn, handler) => {
    try { return fn() }
    catch (ex) { return typeof handler === "function" ? handler(ex) : ex }
}




// simple array flattener
// [[1, 2,], ..., [3, 4,],]  ->  [1, 2, ..., 3, 4,]
export const flatten = (arr) => arr.reduce((acc, el) => acc.concat(el), [])




// when o = { a: "b", c: "d" }
// then swap(o) = { b: "a", d: "c" }
export const swap = (o) => dict(
    Object
        .entries(o)
        .map((kv) => [].concat(kv).reverse())
)




// range(stop) -> array of integers
// range(start, stop[, step]) -> array of integers
//
// Return a list containing an arithmetic progression of integers.
// range(i, j) returns [i, i+1, i+2, ..., j-1]; start defaults to 0.
// When step is given, it specifies the increment (or decrement).
// For example, range(4) returns [0, 1, 2, 3].
//
// imitates Python's range()
export const range = (...args) => {
    let start = 0, stop = 0, step = 1, arr = []

    if (args.length === 1) { [stop,] = args }
    else if (args.length === 2) { [start, stop,] = args }
    else if (args.length === 3) {
        [start, stop, step,] = args
        if (step === 0) throw new RangeError(
            "range() 'step' argument must not be zero"
        )
    } else throw new TypeError(
        `range() expected at most 3 arguments, got ${args.length}`
    )

    while (
        (start < stop  &&  step > 0)  ||
        (start > stop  &&  step < 0)
    ) {
        arr[arr.length] = start
        start += step
    }

    return arr
}
