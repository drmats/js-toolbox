/**
 * Type tools.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type { ArrStr } from "./defs";




/**
 * js-toolbox utility type.
 *
 * Infers array element type.
 */
export type ElementType<T> = T extends (infer U)[] ? U : never;




/**
 * js-toolbox utility type.
 *
 * Infers one: `U` or `string` from `U[] | string` union type.
 * If `U` nor `string` can be inferred then it's `never`.
 */
export type ChooseArrElOrStr<
    T = ArrStr
> = T extends (infer U)[]
    ? U : T extends string
        ? string : never;




/**
 * js-toolbox utility type.
 *
 * Infers one: `U[]` or `string` from `U[] | string` union type.
 * If `U[]` nor `string` can be inferred then it's `never`.
 */
export type ChooseArrOrStr<
    T = ArrStr
> = T extends (infer U)[]
    ? U[] : T extends string
        ? string : never;




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
