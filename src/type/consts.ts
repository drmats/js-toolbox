/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




// "cheat" types
export type JSAnyArr = any[];
export type JSAnyObj = Record<string, any>;
export type JSAnyArrObj = JSAnyArr | JSAnyObj;
export type JSAnyFun<T = any> = (...args: any[]) => T;
export type JSOneArgFun<T = any> = (arg: any) => T;




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
