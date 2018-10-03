/**
 * Javascript toolbox.
 *
 * @license Apache-2.0
 * @author drmats
 */




/**
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
import * as arrayModule from "./array"
export const array = arrayModule




/**
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
import * as asyncModule from "./async"
export const async = asyncModule




/**
 * @see {@link codec.js}
 */
export {
    b64dec,
    b64enc,
    b64ToHex,
    b64ToString,
    bytesToHex,
    bytesToString,
    concatBytes,
    compareBytes,
    hexToB64,
    hexToBytes,
    stringToB64,
    stringToBytes,
} from "./codec"
import * as codecModule from "./codec"
export const codec = codecModule




/**
 * @see {@link func.js}
 */
export {
    compose,
    curry,
    partial,
    Y,
} from "./func"
import * as funcModule from "./func"
export const func = funcModule




/**
 * @see {@link math.js}
 */
export {
    average,
    log10,
    log2,
    roundIfClose,
    sum,
} from "./math"
import * as mathModule from "./math"
export const math = mathModule




/**
 * @see {@link redux.js}
 */
export {
    createReducer,
} from "./redux"
import * as reduxModule from "./redux"
export const redux = reduxModule




/**
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
import * as stringModule from "./string"
export const string = stringModule




/**
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
import * as typeModule from "./type"
export const type = typeModule




/**
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
import * as utilsModule from "./utils"
export const utils = utilsModule
