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
 */
export type Head<XSS> =
    XSS extends [infer HEAD, ...any[]] ?
        HEAD :
        never;




/**
 * Get tail of list.
 */
export type Tail<XSS> =
    XSS extends [any, ...infer TAIL] ?
        TAIL :
        never;




/**
 * Construct list.
 */
export type Cons<CAR, CDR extends any[] = []> = [CAR, ...CDR];




/**
 * Append two lists.
 */
export type Append<XSS extends any[], YSS extends any[]> =
    XSS extends [infer HEAD, ...infer TAIL] ?
        Cons<HEAD, Append<TAIL, YSS>> :
        YSS;




/**
 * Reverse list.
 */
export type Reverse<XSS extends any[], RESULT extends any[] = []> =
    XSS extends [infer HEAD, ...infer TAIL] ?
        Reverse<TAIL, Cons<HEAD, RESULT>> :
        RESULT;
