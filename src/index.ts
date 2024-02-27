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
    hexToB64,
    hexToBytes,
    stringToB64,
    stringToBytes,
} from "./codec/conv";
export {
    csv,
} from "./codec/csv";
export {
    random as randomBytes,
    timestamp as timestampBytes,
} from "./codec/gen";
export {
    compareBytes,
    concatBytes,
} from "./codec/op";
export * as codec from "./codec";




/**
 * @see {@link module:func}
 */
export {
    choose,
} from "./func/choice";
export {
    app,
    compose,
    flow,
    pipe,
    Y,
} from "./func/combinators";
export {
    type CurryFun,
    type ThunkFun,
    curry,
    curryN,
    curryThunk,
    partial,
} from "./func/curry";
export {
    bind as optionBind,
    hasValue,
    JUST,
    NOTHING,
    optionalize,
    rbind as optionRbind,
    type Just,
    type Maybe,
    type Nothing,
} from "./func/option";
export {
    handleException,
    identity,
    lazyish,
    local,
    locker,
    rearg,
} from "./func/tools";
export * as func from "./func";




/**
 * @see {@link module:math}
 */
export {
    add,
    dec,
    div,
    inc,
    inv,
    log10,
    log2,
    mod,
    mul,
    neg,
    pow,
    remainder,
    sub,
} from "./math/arithmetic";
export {
    degrees,
    radians,
} from "./math/geom";
export {
    interpolate,
} from "./math/interpolation";
export {
    randomInt,
} from "./math/random";
export {
    clamp,
    roundIfClose,
} from "./math/rounding";
export {
    average,
    product,
    sum,
} from "./math/series";
export * as math from "./math";




/**
 * @see {@link module:string}
 */
export {
    asciiLetters,
    asciiLowercase,
    asciiUppercase,
    digits,
    empty as emptyString,
    nl as nlString,
    space as spaceString,
    tab as tabString,
} from "./string/consts";
export {
    big as bigString,
    random as randomString,
} from "./string/gen";
export {
    camelToPascal,
    camelToSnake,
    capitalize,
    ellipsis,
    padLeft,
    padRight,
    pascalToCamel,
    pascalToSnake,
    quote,
    shorten,
    snakeToCamel,
    snakeToPascal,
    wrap,
} from "./string/transform";
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
export {
    devEnv,
    getLibConfig,
    getProcess,
    isBrowser,
    to_,
} from "./utils/dev";
export {
    rgb,
    rgba,
    url,
} from "./utils/jss";
export {
    run,
    timeUnit,
    timing,
    type TimeUnit,
} from "./utils/misc";
export * as utils from "./utils";
