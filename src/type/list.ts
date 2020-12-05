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




/**
 * Get head of list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Hd = Head<List>;    // type Hd = 1;
 * ```
 */
export type Head<XSS> =
    XSS extends [infer HEAD, ...any[]] ?
        HEAD :
        never;




/**
 * Get tail of list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Tl = Tail<List>;    // type Tl = [2, 3, 4];
 * ```
 */
export type Tail<XSS> =
    XSS extends [any, ...infer TAIL] ?
        TAIL :
        never;




/**
 * Construct list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Cs = Cons<0, List>;    // type Cs = [0, 1, 2, 3, 4];
 * ```
 */
export type Cons<CAR, CDR extends any[] = []> = [CAR, ...CDR];




/**
 * Append two lists.
 *
 * ```
 * type List1 = [1, 2];
 * type List2 = [7, 8];
 * type Ap = Append<List1, List2>;    // type Ap = [1, 2, 7, 8];
 * ```
 */
export type Append<XSS extends any[], YSS extends any[]> =
    XSS extends [infer HEAD, ...infer TAIL] ?
        Cons<HEAD, Append<TAIL, YSS>> :
        YSS;




/**
 * Reverse list.
 *
 * ```
 * type List = [1, 2, 3, 4];
 * type Rev = Reverse<List>;    // type Rev = [4, 3, 2, 1];
 * ```
 */
export type Reverse<XSS extends any[], RESULT extends any[] = []> =
    XSS extends [infer HEAD, ...infer TAIL] ?
        Reverse<TAIL, Cons<HEAD, RESULT>> :
        RESULT;
