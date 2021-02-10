/**
 * Type definitions.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




/**
 * Type whose values can be used to index objects.
 */
export type AnyKey = keyof any;




/**
 * Type whose values can be used to index objects in TS.
 *
 * @see https://github.com/microsoft/TypeScript/issues/1863
 * @see https://github.com/microsoft/TypeScript/pull/26797
 */
export type SafeKey = string | number;




/**
 * Array.
 */
export type Arr<T = any> = T[];




/**
 * Array or string.
 */
export type ArrStr<T = any> = Arr<T> | string;




/**
 * Function.
 */
export type Fun<In extends any[] = any[], Out = any> = (...args: In) => Out;




/**
 * One argument function.
 */
export type OneArgFun<In = any, Out = any> = (arg: In) => Out;




/**
 * Function with no arguments.
 */
export type NoArgFun<Out = any> = () => Out;




/**
 * js-toolbox "cheat" types.
 */
export type JSAnyObj<T = any> = { [K in keyof T]?: T[K]; };
export type JSAnyArrObj<T = any> = Arr<T> | JSAnyObj<T>;
