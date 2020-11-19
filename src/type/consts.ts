/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyObj = Record<string, any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyArr = any[]

// ...
export type JSAnyArrObj = JSAnyArr | JSAnyObj

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type JSAnyFun<T = any> = (...args: any[]) => T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CurryFun<T = any> = (...args: any[]) => CurryFun<T> | T

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ThunkFun<T = any> = (arg: any) => ThunkFun<T> | (() => T)




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
