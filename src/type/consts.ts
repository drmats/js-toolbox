/**
 * Type tools.
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




/**
 * js-toolbox utility type.
 *
 * Infers one: `U` or `string` from `U[] | string` union type.
 * If `U` nor `string` can be inferred then it's `never`.
 */
export type ChooseArrElOrStr<T = ArrStr> = T extends (infer U)[]
    ? U
    : T extends string
    ? string
    : never;




/**
 * js-toolbox utility type.
 *
 * Infers one: `U[]` or `string` from `U[] | string` union type.
 * If `U[]` nor `string` can be inferred then it's `never`.
 */
export type ChooseArrOrStr<T = ArrStr> = T extends (infer U)[]
    ? U[]
    : T extends string
    ? string
    : never;




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
