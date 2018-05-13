//
// Base 10 logarithm.
//
export const log10 = (x) => roundIfClose(Math.log(x) / Math.LN10)




//
// Base 2 logarithm.
//
export const log2 = (x) => roundIfClose(Math.log(x) / Math.LN2)




//
// Round to the nearest integer if the given value is within
// epsilon range of that integer. Default epsilon is 1e-9,
// which can be changed through 'precision' parameter.
//
export const roundIfClose = (x, precision = 9) => (
    (rounded) =>
        Math.abs(rounded - x) <= 10**(-precision)  ?  rounded  :  x
)(Math.round(x))
