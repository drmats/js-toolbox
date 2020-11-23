/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




/**
 * js-toolbox "cheat" types.
 */
export type JSAnyArr<T = any> = T[];
export type JSAnyObj<T = any> = { [P in keyof any]: T };
export type JSAnyArrObj<T = any> = JSAnyArr<T> | JSAnyObj<T>;
export type JSArrStr<T = any> = T[] | string;
export type JSFun<In extends any[] = any[], Out = any> = (...args: In) => Out;
export type JSAnyFun<T = any> = JSFun<any[], T>;
export type JSOneArgFun<In = any, Out = any> = (arg: In) => Out;




/**
 * Maximum representable safe integer in JavaScript.
 *
 * @name maxInt
 */
export const maxInt = Number.MAX_SAFE_INTEGER  ||  2 ** 53 - 1;




/**
 * Minimum representable safe integer in JavaScript.
 *
 * @name minInt
 */
export const minInt = Number.MIN_SAFE_INTEGER  ||  -(2 ** 53) + 1;
