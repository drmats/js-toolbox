/**
 * Functional programming tools.
 *
 * @module func
 * @license Apache-2.0
 * @author drmats
 */




import { head } from "../array/list"




/**
 * Basic function application.
 *
 * @function app
 * @param {Funcion} f
 * @returns {Function} x => f(x)
 */
export const app = f => x => f(x)




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
 *
 * @function compose
 * @param {...Function} fs
 * @returns {Function}
 */
export const compose = (...fs) => (...args) =>
    head(fs.reduceRight((result, f) => [f(...result)], args))




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
 *
 * @function flow
 * @param {...Function} fs
 * @returns {Function}
 */
export const flow = (...fs) => compose(...fs.reverse())




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
 *
 * @function pipe
 * @param {...Function} args
 * @returns {Function}
 */
export const pipe = (...args) => (...fs) => flow(...fs) (...args)




/**
 * Y-combinator (fixed point of `f`).
 *
 * @function Y
 * @param {Function} f f: recf => (...args) => { ... recf(...args) ... }
 * @returns {Function}
 */
export const Y = f => (...args) => f(Y(f)) (...args)
