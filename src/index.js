/**
 * Javascript toolbox.
 *
 * @module @xcmats/js-toolbox
 * @license Apache-2.0
 */




/**
 * @name array
 * @see {@link array.js}
 */
export {
    draw,
    flatten,
    head,
    init,
    last,
    range,
    shuffle,
    sparse,
    tail,
} from "./array"




/**
 * @name async
 * @see {@link async.js}
 */
export {
    delay,
    interval,
    timeout,
} from "./async"




/**
 * @name func
 * @see {@link func.js}
 */
export {
    curry,
    partial,
    Y,
} from "./func"




/**
 * @name math
 * @see {@link math.js}
 */
export {
    average,
    log10,
    log2,
    roundIfClose,
    sum,
} from "./math"




/**
 * @name redux
 * @see {@link redux.js}
 */
export {
    createReducer,
} from "./redux"




/**
 * @name string
 * @see {@link string.js}
 */
export {
    asciiLetters,
    asciiLowercase,
    asciiUppercase,
    big as bigString,
    camelToPascal,
    camelToSnake,
    capitalize,
    digits,
    empty as emptyString,
    pascalToCamel,
    pascalToSnake,
    quote,
    random as randomString,
    snakeToCamel,
    snakeToPascal,
} from "./string"




/**
 * @name type
 * @see {@link type.js}
 */
export {
    isFunction,
    isNumber,
    isObject,
    nullToUndefined,
} from "./type"




/**
 * @name utils
 * @see {@link utils.js}
 */
export {
    access,
    choose,
    dict,
    handleException,
    objectMap,
    objectReduce,
    swap,
} from "./utils"
