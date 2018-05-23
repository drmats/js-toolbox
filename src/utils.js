import {
    isFunction,
    isObject,
} from "./type"




//
// Apply path to an object "o".
// access({ a: { b: { c: 42 } } }, ["a", "b", "c"]) -> 42
//
export const access = (o, path) => handleException(
    () => path.reduce((acc, p) => acc[p], o),
    () => undefined
)




//
// Functional replacement of a "switch" statement.
//
export const choose = (
    key,
    actions = {},
    defaultAction = () => null,
    args = []
) =>
    key in actions ?
        actions[key](...args) :
        defaultAction(...args)




//
// Construct object from result of Object.entries() call.
// entries = [[k1, v1,], ... [kn, vn,]]
//
// imitates Python's dict()
//
export const dict = (entries) => entries.reduce(
    (acc, [k, v,]) => ({ ...acc, [k]: v, }), {}
)




//
// Handle exceptions in expressions.
//
export const handleException = (fn, handler) => {
    try { return fn() }
    catch (ex) { return isFunction(handler)  ?  handler(ex)  :  ex }
}




//
// Map (iteration) on objects - shallow.
//
// "o" - Object to enumerate on.
// "f" - Function to call on each key, params:
//     this - bound to enumerated object,
//     "kv" - current [key, value] array,
//
// "f" should return [key, value] array.
//
export const objectMap = (o, f) => {
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "objectMap() expected object and function"
    )
    return dict(Object.entries(o).map((kv) => f.call(o, kv)))
}




//
// Reduce (fold) on objects - shallow.
//
// "o" - Object to enumerate on.
// "f" - Function to call on each key, params:
//     this - bound to enumerated object,
//     "acc" - accumulated value
//     "kv" - current [key, value] array,
// "init" - accumulated value initializer
//
// "f" should return value of the same type as "init".
//
export const objectReduce = (o, f, init) => {
    if (!isObject(o) || !isFunction(f)) throw new TypeError(
        "objectReduce() expected object and function"
    )
    return Object.entries(o).reduce((acc, kv) => f.call(o, acc, kv), init)
}




//
// when o = { a: "b", c: "d" }
// then swap(o) = { b: "a", d: "c" }
//
export const swap = (o) => objectMap(o, ([k, v,]) => [v, k,])
