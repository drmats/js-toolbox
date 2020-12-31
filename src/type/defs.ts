/**
 * Type definitions.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




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
export type JSAnyFun<T = any> = Fun<any[], T>;
