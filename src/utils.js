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
// entries = [[k1,v1], ... [kn, vn]]
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




// setTimeout in promise/async skin
// example usage:
//
// sf.utils.timeout(
//     () => { console.log("Hey!"); return 42 }, 1000,
//     (c) => sf.utils.timeout(() => c("Cancelled!"), 800)
// )
// .then((x) => console.log("Success:", x))
// .catch((c) => console.log("Error or cancel:", c))
//
export const timeout = (f, time = 1000, cancel = (_reason) => null) => {
    let
        handle = null, reject = null,
        promise = new Promise((res, rej) => {
            reject = rej
            handle = setTimeout(() => {
                try { res(f()) }
                catch (ex) { rej(ex) }
            }, time)
        })
    cancel((reason) => {
        clearTimeout(handle)
        reject(reason)
    })
    return promise
}




// convenience shortcut of "timeout"
export const delay = (time = 1000, cancel = (_reason) => null) =>
    timeout(() => time, time, cancel)
