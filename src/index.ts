/**
 * JS toolbox.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
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
    zip,
    zipWith,
} from "./array";
export * as array from "./array";




/**
 * @see {@link module:async}
 */
export type {
    PromisePoolEmptyResult,
    PromisePoolFulfilledResult,
    PromisePoolProps,
    PromisePoolRejectedResult,
    PromisePoolResult,
} from "./async/concurrency";
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
    promisePool,
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
    compareBytes,
    concatBytes,
    csv,
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
    clamp,
    dec,
    degrees,
    div,
    inc,
    interpolate,
    inv,
    log10,
    log2,
    mod,
    mul,
    neg,
    pow,
    product,
    radians,
    randomInt,
    remainder,
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
    nl as nlString,
    padLeft,
    padRight,
    pascalToCamel,
    pascalToSnake,
    quote,
    random as randomString,
    shorten,
    snakeToCamel,
    snakeToPascal,
    space as spaceString,
    tab as tabString,
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
    DataIndex,
    DataObject,
} from "./struct/data";
export {
    access,
    assign,
    clone,
    dfs,
    dict,
    hashAccessor,
    keyAccessor,
    objectMap,
    objectReduce,
    rewrite,
    swap,
} from "./struct";
export * as struct from "./struct";




/**
 * @see {@link module:type}
 */
export {
    isArray,
    isBoolean,
    isFunction,
    isNumber,
    isObject,
    isString,
} from "./type/check";
export {
    maxInt,
    minInt,
} from "./type/consts";
export {
    lazyNullishCoalesce,
    nullToUndefined,
    toBool,
    undefinedToNull,
} from "./type/conv";
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
    Append,
    Cons,
    Head,
    Id,
    Init,
    Intersection,
    Last,
    Length,
    Prefixes,
    Reverse,
    Suffixes,
    Tail,
    Union,
    Zip,
} from "./type/list";
export type {
    AllowSubset,
    ChooseArrElOrStr,
    ChooseArrOrStr,
    ElementType,
    NonConstEnum,
    Nullable,
    NullToUndefined,
    Override,
    UndefinedToNull,
    Writable,
} from "./type/utils";
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
