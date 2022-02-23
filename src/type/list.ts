/**
 * Type tools.
 *
 * Typescript ^4.1.x tuple fun.
 *
 * @module type
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { Arr } from "./defs";




/**
 * Trivial type.
 *
 * ```
 * type Something = [1, 2];
 * type Sg = Id<Something>;
 * // type Sg = [1, 2];
 * ```
 */
export type Id<T> = T;




/**
 * Get head of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Hd = Head<List>;
 * // type Hd = 1;
 * ```
 */
export type Head<List extends Arr> =
    List extends [infer X, ...Arr] ?
        X :
        never;




/**
 * Get tail of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Tl = Tail<List>;
 * // type Tl = [2, 3, 4];
 * ```
 */
export type Tail<List extends Arr> =
    List extends [any, ...infer Xs] ?
        Xs :
        never;




/**
 * Get length of the list.
 *
 * ```
 * type List = ["a", "b", "c", "d"];
 * type Len = Length<List>;
 * // type Len = 4;
 * ```
 */
export type Length<List extends Arr> = List["length"];




/**
 * Construct new list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Cs = Cons<0, List>;
 * // type Cs = [0, 1, 2, 3, 4];
 * ```
 */
export type Cons<Car, Cdr extends Arr = []> = [Car, ...Cdr];




/**
 * Get all elements of the list except the last one.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type It = Init<List>;
 * // type It = [1, 2, 3];
 * ```
 */
export type Init<List extends Arr> =
    List extends [any] ?
        [] :
        List extends [infer X, ...infer Xs] ?
            Cons<X, Init<Xs>> :
            never;




/**
 * Get last element of the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Lt = Last<List>;
 * // type Lt = 4;
 * ```
 */
export type Last<List extends Arr> =
    List extends [infer X] ?
        X :
        List extends [any, ...infer Xs] ?
            Last<Xs> :
            never;




/**
 * Append one list at the end of the other.
 *
 * ```
 * type List1 = [1, 2];
 * type List2 = [7, 8];
 * type Ap = Append<List1, List2>;
 * // type Ap = [1, 2, 7, 8];
 * ```
 */
export type Append<List1 extends Arr, List2 extends Arr> =
    List1 extends [infer X, ...infer Xs] ?
        Cons<X, Append<Xs, List2>> :
        List2;




/**
 * Reverse the list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Rev = Reverse<List>;
 * // type Rev = [4, 3, 2, 1];
 * ```
 */
export type Reverse<List extends Arr, Acc extends Arr = []> =
    List extends [infer X, ...infer Xs] ?
        Reverse<Xs, Cons<X, Acc>> :
        Acc;




/**
 * Zip two lists together.
 *
 * ```
 * type List1 = [1, 2, 3];
 * type List2 = ["a", "b", "c"];
 * type Zz = Zip<List1, List2>;
 * // type Zz = [[1, "a"], [2, "b"], [3, "c"]];
 * ```
 */
export type Zip<List1 extends Arr, List2 extends Arr> =
    List1 extends [infer X, ...infer Xs] ?
        List2 extends [infer Y, ...infer Ys] ?
            Cons<[X, Y], Zip<Xs, Ys>> :
            Cons<[X], Zip<Xs, List2>> :
        List2 extends [infer Y, ...infer Ys] ?
            Cons<[Y], Zip<List1, Ys>> :
            [];




/**
 * Generate the list of all list prefixes.
 *
 * ```
 * type List = [1, 2, 3];
 * type Ps = Prefixes<List>;
 * // type Ps = [[], [1], [1, 2], [1, 2, 3]];
 * ```
 */
export type Prefixes<List extends Arr, Prefix extends Arr = []> =
    List extends [infer X, ...infer Xs] ?
        Cons<
            Reverse<Prefix>,
            Prefixes<Xs, Cons<X, Prefix>>
        > :
        Cons<Reverse<Prefix>>;




/**
 * Generate the list of all list suffixes.
 *
 * ```
 * type List = [1, 2, 3];
 * type Ss = Suffixes<List>;
 * // type Ss = [[1, 2, 3], [2, 3], [3], []];
 * ```
 */
export type Suffixes<List extends Arr, Suffix extends Arr = List> =
    List extends [any, ...infer Xs] ?
        Cons<
            Suffix,
            Suffixes<Xs, Tail<Suffix>>
        > :
        Cons<Suffix>;




/**
 * Compose type union from all types in the list.
 */
export type Union<List extends Arr> =
    List extends [infer X, ...infer Xs] ?
        X | Union<Xs> :
        never;




/**
 * Compose type intersection from all types in the list.
 */
export type Intersection<List extends Arr> =
    List extends [infer X, ...infer Xs] ?
        X & Intersection<Xs> :
        unknown;
