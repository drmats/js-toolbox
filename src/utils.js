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
    catch (ex) { return typeof handler === "function"  ?  handler(ex)  :  ex }
}




//
// If val is null then return undefined, else return val.
//
export const nullToUndefined = (val) => val === null  ?  undefined  :  val




//
// Map (iteration) on objects.
//
// o - Object to enumerate on.
// f - Function to call on each key, params:
//    this - bound to enumerated object
//    kv - current [key, value] array
//
// f should return [key, value] array.
//
export const objectMap = (o, f) => {
    if (typeof o !== "object"  ||  o === null  ||  typeof f !== "function") {
        throw new TypeError("objectMap() expected object and function")
    }
    return dict(Object.entries(o).map((kv) => f.call(o, kv)))
}




//
// when o = { a: "b", c: "d" }
// then swap(o) = { b: "a", d: "c" }
//
export const swap = (o) => objectMap(o, ([k, v,]) => [v, k,])




//
// Y-combinator (returns fixed point of higher-order function passed as "f")
//
export const Y = (f) => ((g) => g(g))((h) => (...args) => f(h(h))(...args))
