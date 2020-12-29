/**
 * Type utilities.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




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
