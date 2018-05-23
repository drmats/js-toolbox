//
// Determine if given value is a function.
//
export const isFunction = (f) =>
    f != null  &&  typeof f === "function"




//
// Determine if given value is a proper number
// (not NaN and not Infinity).
//
export const isNumber = (n) =>
    n != null  &&  typeof n === "number"  &&
    !Number.isNaN(n)  && Number.isFinite(n)




//
// Determine if given value is an object.
//
export const isObject = (o) =>
    o != null  &&  typeof o === "object"  &&  !Array.isArray(o)




//
// If val is null then return undefined, else return val.
//
export const nullToUndefined = (val) => val === null  ?  undefined  :  val
