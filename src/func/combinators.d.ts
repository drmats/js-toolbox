/**
 * Func - type declarations.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Basic function application.
 */
export declare function app<T, S> (f: ((T) => S)): (T) => S;




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
export declare function compose (
    ...fs: Function[]
): (...args: unknown[]) => Function;




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
export declare function flow (
    ...fs: Function[]
): (...args: unknown[]) => Function;




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
export declare function pipe (
    ...args: unknown[]
): (...fs: Function[]) => Function;




/**
 * Y-combinator (returns fixed point of a higher-order function
 * passed as `f`).
 */
export declare function Y (f: Function): Function;
