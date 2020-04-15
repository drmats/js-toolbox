/**
 * Javascript toolbox - type declarations.
 *
 * @module @xcmats/js-toolbox
 * @license Apache-2.0
 * @author drmats
 */




export {
    append,
    countBy,
    difference as arrayDifference,
    draw,
    drop,
    dropLast,
    findDuplicates,
    flatten,
    head,
    init,
    intersection as arrayIntersection,
    isContinuous,
    isSorted,
    isSubset as arrayIsSubset,
    last,
    range,
    removeDuplicates,
    setEqual as arraySetEqual,
    shuffle,
    sparse,
    tail,
    take,
    takeEvery,
    takeLast,
    zipWith,
    zip,
} from "./array"
export * as array from "./array"




export {
    cancellable,
    createMutex,
    delay,
    interval,
    map as asyncMap,
    parMap,
    race as asyncRace,
    reduce as asyncReduce,
    repeat as asyncRepeat,
    timeout,
} from "./async"
export * as async from "./async"




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
    random as randomBytes,
    stringToB64,
    stringToBytes,
    timestamp as timestampBytes,
} from "./codec"
export * as codec from "./codec"




export {
    choose,
    compose,
    curry,
    curryN,
    curryThunk,
    flow,
    identity,
    lazyish,
    locker,
    partial,
    pipe,
    rearg,
    Y,
} from "./func"
export * as func from "./func"




export {
    add,
    average,
    dec,
    div,
    inc,
    inv,
    clamp,
    log10,
    log2,
    mod,
    mul,
    neg,
    pow,
    product,
    randomInt,
    roundIfClose,
    sub,
    sum,
} from "./math"
export * as math from "./math"




export {
    createReducer,
} from "./redux"
export * as redux from "./redux"




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
    space as spaceString,
    nl as nlString,
    tab as tabString,
    padLeft,
    padRight,
    pascalToCamel,
    pascalToSnake,
    quote,
    random as randomString,
    shorten,
    snakeToCamel,
    snakeToPascal,
    wrap,
} from "./string"
export * as string from "./string"




export {
    access,
    clone,
    hashAccessor,
    keyAccessor,
    dfs,
    dict,
    objectMap,
    objectReduce,
    swap,
} from "./struct"
export * as struct from "./struct"




export {
    isArray,
    isFunction,
    isNumber,
    isObject,
    isString,
    maxInt,
    minInt,
    nullToUndefined,
    toBool,
} from "./type"
export * as type from "./type"




export {
    devEnv,
    getLibConfig,
    getProcess,
    handleException,
    handleRejection,
    isBrowser,
    rgb,
    rgba,
    run,
    timeUnit,
    to_,
    url,
} from "./utils"
export * as utils from "./utils"
