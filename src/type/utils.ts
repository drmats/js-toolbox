/**
 * Type utilities.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */




import type { ArrStr } from "./defs";




/**
 * Infers array element type.
 */
export type ElementType<T> = T extends (infer U)[] ? U : never;




/**
 * Infers one: `U` or `string` from `U[] | string` union type.
 * If `U` nor `string` can be inferred then it's `never`.
 */
export type ChooseArrElOrStr<
    T = ArrStr
> = T extends (infer U)[]
    ? U : T extends string
        ? string : never;




/**
 * Infers one: `U[]` or `string` from `U[] | string` union type.
 * If `U[]` nor `string` can be inferred then it's `never`.
 */
export type ChooseArrOrStr<
    T = ArrStr
> = T extends (infer U)[]
    ? U[] : T extends string
        ? string : never;




/**
 * Override `Base` type properties with `Derived` type properties.
 * (mimics field/method overriding in a class-based inheritance model).
 */
export type Override<Base, Derived> = Omit<Base, keyof Derived> & Derived;




/**
 * Parameter type guard - allow construction of `Subset` type
 * whose properties exists in `Base` type (no properties outside of `Base`
 * type are allowed).
 */
export type AllowSubset<Base, Subset> = {
    [K in keyof Subset]:
        K extends keyof Base ?
            Subset[K] : never
};
