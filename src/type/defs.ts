/**
 * Type definitions.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




/**
 * js-toolbox types.
 */
export type ArrStr<T = any> = T[] | string;
export type Fun<In extends any[] = any[], Out = any> = (...args: In) => Out;
export type OneArgFun<In = any, Out = any> = (arg: In) => Out;
export type NoArgFun<Out = any> = () => Out;




/**
 * js-toolbox "cheat" types.
 */
export type JSAnyArr<T = any> = T[];
export type JSAnyObj<T = any> = { [K in keyof T]?: T[K]; };
export type JSAnyArrObj<T = any> = JSAnyArr<T> | JSAnyObj<T>;
export type JSAnyFun<T = any> = Fun<any[], T>;
