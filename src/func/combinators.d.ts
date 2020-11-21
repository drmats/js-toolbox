/**
 * Func - type declarations.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import type { JSAnyFun } from "../type/consts";




// Idea for the bright, unspecified future (on how to type `flow`).
//
// export type FunChain<In, Out, Intermediate = any> = []
//     | [(arg: In) => Out]
//     | [(arg: In) => Intermediate, ...FunChain<Intermediate, Out>];
//
// export type FunMultiChain<In extends any[], Out, Intermediate = any> = []
//     | [(...arg: In) => Out]
//     | [(...arg: In) => Intermediate, ...FunChain<Intermediate, Out>];




/**
 * Basic function application.
 */
export declare function app<T, S> (f: (a: T) => S): (a: T) => S;




/**
 * Function composition - read as "compose backward" or "but first".
 *
 * ```
 * let:
 * f: X -> Y,  g: Y -> Z
 *
 * then:
 * g(f(x))  <=>  (g . f) (x)  <=>  compose(g, f) (x)
 * ```
 */
export declare function compose (...fs: JSAnyFun[]): JSAnyFun;




/**
 * Function composition - read as "compose forward" or "and then".
 *
 * ```
 * let:
 * f: X -> Y,  g: Y -> Z
 *
 * then:
 * g(f(x))  <=>  (g . f) (x)  <=>  flow(f, g) (x)
 * ```
 *
 * Inspired by {@link https://github.com/tfausak/flow}.
 */
export declare function flow (...fs: JSAnyFun[]): JSAnyFun;




/**
 * Function composition - read as "compose forward" or "and then".
 * Version of `flow` taking _arguments_ (`args`) first
 * and then _functions_ (`fs`).
 *
 * ```
 * let:
 * f: X -> Y,  g: Y -> Z
 *
 * then:
 * g(f(x))  <=>  (g . f) (x)  <=>  pipe(x) (f, g)
 * ```
 */
export declare function pipe (...args: any[]): (...fs: JSAnyFun[]) => any;




/**
 * Y-combinator (returns fixed point of a higher-order function
 * passed as `f`).
 */
type R<In extends any[], Out> = (...args: In) => Out;
type F<In extends any[], Out> = (f: R<In, Out>) => (...args: In) => Out;
export declare function Y<In extends any[], Out> (f: F<In, Out>): R<In, Out>;
