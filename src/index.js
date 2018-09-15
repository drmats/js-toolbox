/**
 * Javascript toolbox.
 *
 * @module @xcmats/js-toolbox
 * @license Apache-2.0
 * @author drmats
 */




/**
 * @name array
 * @see {@link array.js}
 */
export {
    countBy,
    draw,
    findDuplicates,
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
    map as asyncMap,
    parMap,
    reduce as asyncReduce,
    repeat as asyncRepeat,
    timeout,
} from "./async"




/**
 * @name codec
 * @see {@link codec.js}
 */
export {
    b64dec,
    b64enc,
    bytesToString,
    stringToBytes,
} from "./codec"




/**
 * @name func
 * @see {@link func.js}
 */
export {
    compose,
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
    ellipsis,
    empty as emptyString,
    pascalToCamel,
    pascalToSnake,
    quote,
    random as randomString,
    shorten,
    snakeToCamel,
    snakeToPascal,
    wrap,
} from "./string"




/**
 * @name type
 * @see {@link type.js}
 */
export {
    isFunction,
    isNumber,
    isObject,
    isString,
    maxInt,
    minInt,
    nullToUndefined,
    toBool,
} from "./type"




/**
 * @name utils
 * @see {@link utils.js}
 */
export {
    access,
    choose,
    clone,
    dict,
    handleException,
    identity,
    isBrowser,
    objectMap,
    objectReduce,
    randomInt,
    swap,
    timeUnit,
} from "./utils"
