/**
 * Javascript toolbox.
 *
 * @license Apache-2.0
 * @author drmats
 */




/**
 * @see {@link module:array}
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
} from "./array";
export * as array from "./array";




/**
 * @see {@link module:async}
 */
export {
    ap,
    bind,
    cancellable,
    createMutex,
    delay,
    interval,
    liftr,
    map as asyncMap,
    parMap,
    race as asyncRace,
    rbind,
    reduce as asyncReduce,
    repeat as asyncRepeat,
    timeout,
    unit,
} from "./async";
export * as async from "./async";




/**
 * @see {@link module:codec}
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
    random as randomBytes,
    stringToB64,
    stringToBytes,
    timestamp as timestampBytes,
} from "./codec";
export * as codec from "./codec";




/**
 * @see {@link module:func}
 */
export type {
    CurryFun,
    ThunkFun,
} from "./func/curry";
export {
    app,
    choose,
    compose,
    curry,
    curryN,
    curryThunk,
    flow,
    handleException,
    identity,
    lazyish,
    local,
    locker,
    partial,
    pipe,
    rearg,
    Y,
} from "./func";
export * as func from "./func";




/**
 * @see {@link module:math}
 */
export {
    add,
    average,
    dec,
    div,
    inc,
    inv,
    clamp,
    degrees,
    log10,
    log2,
    mod,
    mul,
    neg,
    pow,
    product,
    radians,
    randomInt,
    roundIfClose,
    sub,
    sum,
} from "./math";
export * as math from "./math";




/**
 * @see {@link module:string}
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
} from "./string";
export * as string from "./string";




/**
 * @see {@link module:struct}
 */
export type {
    Atom,
    BasicData,
    Data,
    DataArray,
    DataObject,
    DataIndex,
} from "./struct/data";
export {
    access,
    assign,
    clone,
    hashAccessor,
    keyAccessor,
    dfs,
    dict,
    objectMap,
    objectReduce,
    rewrite,
    swap,
} from "./struct";
export * as struct from "./struct";




/**
 * @see {@link module:type}
 */
export type {
    AnyKey,
    Arr,
    ArrStr,
    Fun,
    JSAnyArrObj,
    JSAnyObj,
    NoArgFun,
    OneArgFun,
    SafeKey,
} from "./type/defs";
export type {
    AllowSubset,
    ElementType,
    ChooseArrElOrStr,
    ChooseArrOrStr,
    NonConstEnum,
    Override,
} from "./type/utils";
export {
    isArray,
    isFunction,
    isNumber,
    isObject,
    isString,
    lazyNullishCoalesce,
    maxInt,
    minInt,
    nullToUndefined,
    toBool,
} from "./type";
export * as type from "./type";




/**
 * @see {@link module:utils}
 */
export type {
    TimeUnit,
} from "./utils/misc";
export {
    devEnv,
    getLibConfig,
    getProcess,
    isBrowser,
    rgb,
    rgba,
    run,
    timeUnit,
    timing,
    to_,
    url,
} from "./utils";
export * as utils from "./utils";
