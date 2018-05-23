//
// Determine if a given value is a Function.
//
export const isFunction = (f) =>
    f != null  &&  typeof f === "function"




//
// Determine if a given value is a proper Number
// (not NaN and not Infinity).
//
export const isNumber = (n) =>
    n != null  &&  typeof n === "number"  &&
    !Number.isNaN(n)  && Number.isFinite(n)




//
// Determine if a given value is an Object
// (not null, not undefined and not Array).
//
export const isObject = (o) =>
    o != null  &&  typeof o === "object"  &&  !Array.isArray(o)




//
// If val is null then return undefined, else return val.
//
export const nullToUndefined = (val) => val === null  ?  undefined  :  val
