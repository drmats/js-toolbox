/**
 * Javascript toolbox - type declarations.
 *
 * @module @xcmats/js-toolbox
 * @license Apache-2.0
 * @author drmats
 */




import * as arrayModule from "./array";
export const array = arrayModule;

export const append: typeof array.append;
export const countBy: typeof array.countBy;
export const arrayDifference: typeof array.difference;
export const draw: typeof array.draw;
export const drop: typeof array.drop;
export const dropLast: typeof array.dropLast;
export const findDuplicates: typeof array.findDuplicates;
export const flatten: typeof array.flatten;
export const head: typeof array.head;
export const init: typeof array.init;
export const arrayIntersection: typeof array.intersection;
export const isContinuous: typeof array.isContinuous;
export const isSorted: typeof array.isSorted;
export const arrayIsSubset: typeof array.isSubset;
export const last: typeof array.last;
export const range: typeof array.range;
export const removeDuplicates: typeof array.removeDuplicates;
export const arraySetEqual: typeof array.setEqual;
export const shuffle: typeof array.shuffle;
export const sparse: typeof array.sparse;
export const tail: typeof array.tail;
export const take: typeof array.take;
export const takeEvery: typeof array.takeEvery;
export const takeLast: typeof array.takeLast;
export const zipWith: typeof array.zipWith;
export const zip: typeof array.zip;




import * as asyncModule from "./async";
export const async = asyncModule;

export const cancellable: typeof async.cancellable;
export const createMutex: typeof async.createMutex;
export const delay: typeof async.delay;
export const interval: typeof async.interval;
export const asyncMap: typeof async.map;
export const parMap: typeof async.parMap;
export const asyncRace: typeof async.race;
export const asyncReduce: typeof async.reduce;
export const asyncRepeat: typeof async.repeat;
export const timeout: typeof async.timeout;




import * as codecModule from "./codec";
export const codec = codecModule;

export const concatBytes: typeof codec.concatBytes;
export const compareBytes: typeof codec.compareBytes;
export const stringToBytes: typeof codec.stringToBytes;
export const bytesToString: typeof codec.bytesToString;
export const hexToBytes: typeof codec.hexToBytes;
export const bytesToHex: typeof codec.bytesToHex;
export const b64dec: typeof codec.b64dec;
export const b64enc: typeof codec.b64enc;
export const b64ToString: typeof codec.b64ToString;
export const stringToB64: typeof codec.stringToB64;
export const b64ToHex: typeof codec.b64ToHex;
export const hexToB64: typeof codec.hexToB64;
export const randomBytes: typeof codec.random;
export const timestampBytes: typeof codec.timestamp;




import * as funcModule from "./func";
export const func = funcModule;

export const choose: typeof func.choose;
export const compose: typeof func.compose;
export const curry: typeof func.curry;
export const curryN: typeof func.curryN;
export const curryThunk: typeof func.curryThunk;
export const flow: typeof func.flow;
export const identity: typeof func.identity;
export const locker: typeof func.locker;
export const partial: typeof func.partial;
export const pipe: typeof func.pipe;
export const rearg: typeof func.rearg;
export const Y: typeof func.Y;




import * as mathModule from "./math";
export const math = mathModule;

export const add: typeof math.add;
export const average: typeof math.average;
export const clamp: typeof math.clamp;
export const dec: typeof math.dec;
export const div: typeof math.div;
export const inc: typeof math.inc;
export const inv: typeof math.inv;
export const log10: typeof math.log10;
export const log2: typeof math.log2;
export const mod: typeof math.mod;
export const mul: typeof math.mul;
export const neg: typeof math.neg;
export const pow: typeof math.pow;
export const product: typeof math.product;
export const randomInt: typeof math.randomInt;
export const roundIfClose: typeof math.roundIfClose;
export const sub: typeof math.sub;
export const sum: typeof math.sum;




import * as reduxModule from "./redux";
export const redux = reduxModule;

export const createReducer: typeof redux.createReducer;




import * as stringModule from "./string";
export const string = stringModule;

export const asciiLetters: typeof string.asciiLetters;
export const asciiLowercase: typeof string.asciiLowercase;
export const asciiUppercase: typeof string.asciiUppercase;
export const bigString: typeof string.big;
export const camelToPascal: typeof string.camelToPascal;
export const camelToSnake: typeof string.camelToSnake;
export const capitalize: typeof string.capitalize;
export const digits: typeof string.digits;
export const ellipsis: typeof string.ellipsis;
export const emptyString: typeof string.empty;
export const spaceString: typeof string.space;
export const nlString: typeof string.nl;
export const padLeft: typeof string.padLeft;
export const padRight: typeof string.padRight;
export const pascalToCamel: typeof string.pascalToCamel;
export const pascalToSnake: typeof string.pascalToSnake;
export const quote: typeof string.quote;
export const randomString: typeof string.random;
export const shorten: typeof string.shorten;
export const snakeToCamel: typeof string.snakeToCamel;
export const snakeToPascal: typeof string.snakeToPascal;
export const wrap: typeof string.wrap;




import * as structModule from "./struct";
export const struct = structModule;

export const access: typeof struct.access;
export const clone: typeof struct.clone;
export const dict: typeof struct.dict;
export const objectMap: typeof struct.objectMap;
export const objectReduce: typeof struct.objectReduce;
export const swap: typeof struct.swap;




import * as typeModule from "./type";
export const type = typeModule;

export const isArray: typeof type.isArray;
export const isFunction: typeof type.isFunction;
export const isNumber: typeof type.isNumber;
export const isObject: typeof type.isObject;
export const isString: typeof type.isString;
export const maxInt: typeof type.maxInt;
export const minInt: typeof type.minInt;
export const nullToUndefined: typeof type.nullToUndefined;
export const toBool: typeof type.toBool;




import * as utilsModule from "./utils";
export const utils = utilsModule;

export const devEnv: typeof utils.devEnv;
export const getLibConfig: typeof utils.getLibConfig;
export const getProcess: typeof utils.getProcess;
export const handleException: typeof utils.handleException;
export const handleRejection: typeof utils.handleRejection;
export const isBrowser: typeof utils.isBrowser;
export const rgb: typeof utils.rgb;
export const rgba: typeof utils.rgba;
export const run: typeof utils.run;
export const timeUnit: typeof utils.timeUnit;
export const to_: typeof utils.to_;
export const url: typeof utils.url;
