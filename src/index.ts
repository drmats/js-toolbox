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
    drop,
    dropLast,
    head,
    init,
    last,
    tail,
    take,
    takeLast,
} from "./array/list";
export {
    draw,
    shuffle,
    sparse,
} from "./array/random";
export {
    countBy,
    difference as arrayDifference,
    findDuplicates,
    intersection as arrayIntersection,
    isSubset as arrayIsSubset,
    removeDuplicates,
    setEqual as arraySetEqual,
} from "./array/set";
export {
    flatten,
    isContinuous,
    isSorted,
    range,
    takeEvery,
    zip,
    zipWith,
} from "./array/tools";
export * as array from "./array";




/**
 * @see {@link module:async}
 */
export {
    createMutex,
    createTimedBarrier,
    promisePool,
    type PromisePoolEmptyResult,
    type PromisePoolFulfilledResult,
    type PromisePoolProps,
    type PromisePoolRejectedResult,
    type PromisePoolResult,
} from "./async/concurrency";
export {
    map as asyncMap,
    parMap,
    reduce as asyncReduce,
} from "./async/iterators";
export {
    ap,
    bind,
    liftr,
    rbind,
    unit,
} from "./async/monad";
export {
    delay,
    interval,
    timeout,
} from "./async/timing";
export {
    cancellable,
    race as asyncRace,
    repeat as asyncRepeat,
} from "./async/tools";
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
export {
    access,
    assign,
    isBasicData,
    isBasicDataOrUndefined,
    rewrite,
    type Atom,
    type BasicData,
    type Data,
    type DataArray,
    type DataIndex,
    type DataObject,
} from "./struct/data";
export {
    clone,
    dict,
    objectMap,
    objectReduce,
    swap,
} from "./struct/object";
export {
    dfs,
    hashAccessor,
    keyAccessor,
} from "./struct/tree";
export * as struct from "./struct";




/**
 * @see {@link module:type}
 */
export {
    isArray,
    isBoolean,
    isDate,
    isFunction,
    isNumber,
    isObject,
    isRegExp,
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
