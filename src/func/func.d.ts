/**
 * Func - type declarations.
 *
 * @module @xcmats/js-toolbox/func
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Functional replacement of a `switch` statement.
 */
export function choose (
    key: string,
    actions?: object,
    defaultAction?: Function,
    args?: any[]
): any;




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
export function compose (
    ...fs: Function[]
): (...args: any[]) => Function;




/**
 * Return curried form of a given function `f`.
 *
 * If funcion `f` has _arity_ 3, and `g = curry(f)` then
 * a following invocations have the same result:
 *
 * ```
 * g(a,  b,  c)
 * g(a,  b) (c)
 * g(a) (b,  c)
 * g(a) (b) (c)
 * ```
 *
 * Function `f` _arity_ is obtained by checking it's `.length`
 * property, so if function `f` is defined with a _rest parameter_
 * then this parameter is excluded. Also only parameters before
 * the first one with a default value are included.
 */
export function curry (f: Function): Function;




/**
 * Translate the evaluation of function `f` taking `n` arguments
 * into an evaluation of sequence of `n` functions, where each
 * next function is a result of previous function evaluation.
 *
 * ```
 * f(a, b, c, d, e)  <=>  curryN(5, f) (a) (b) (c) (d) (e)
 * ```
 */
export function curryN<T> (
    n: number,
    f: (...args: any[]) => T
): (...args: any[]) => Function | T;




/**
 * Translate the evaluation of function `f` taking multiple arguments
 * into an evaluation of sequence of functions,
 * each with a single argument.
 *
 * Because `curryThunk` doesn't assume anything on passed function
 * `f` _arity_, final invocation has to be done with no arguments.
 *
 * ```
 * f(a, b, c, d)  <=>  curryThunk(f) (a) (b) (c) (d) ()
 * ```
 */
export function curryThunk<T> (
    f: (...args: any[]) => T
): (...args: any[]) => Function | T;




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
export function flow (
    ...fs: Function[]
): (...args: any[]) => Function;




/**
 * Return value passed as a first argument.
 */
export function identity<T> (x: T): T;




/**
 * Put a given argument under function abstraction.
 */
export function lazyish<T> (x: T): () => T;




/**
 * Local binding.
 *
 * Inspired by {@link https://github.com/kongware/scriptum}
 */
export function local<T> (f?: () => T): T;




/**
 * Create function that can "lock the thing".
 *
 * During the first `n` invocations returned function acts as identity.
 * During the `n+1` invocation the argument `thing` is memoized
 * and on all subsequent invocations passed arguments are ignored
 * and memoized `thing` is returned.
 *
 * ```
 * let lock = func.locker()
 *
 * lock("I like you!")
 * 'I like you!'
 *
 * lock("I hate you.")
 * 'I like you!'
 *
 * let lock2 = func.locker(2)
 *
 * lock2("Repeat after me!")
 * 'Repeat after me!'
 *
 * lock2(42)
 * 42
 *
 * lock2("All right...")
 * 42
 * ```
 */
export function locker<T> (n?: number): (val: T) => T;




/**
 * Partial application.
 *
 * Bind `init` arguments to function `f` and construct
 * a function of smaller _arity_ which accept `rest` of the arguments.
 *
 * Example:
 *
 * ```
 * let f = (a, b) => a + b
 * f(3, 4)  ->  7
 * let g = partial(f) (3)  // note that `partial` is in *curried* form
 * g(4)  ->  7
 * ```
 */
export function partial<T> (
    f: (...args: any[]) => T
): (...init: any[]) => (...rest: any[]) => T;




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
export function pipe (
    ...args: any[]
): (...fs: Function[]) => Function;




/**
 * Function arguments rearrangement.
 *
 * Takes function `f` and `indices` and returns a new function,
 * which has it's arguments arranged according to `indices`.
 *
 * Returned function will expect the number of arguments to be
 * no less than the number of `indices`. If not all of the required
 * arguments will be passed, a new function will be returned
 * expecting _rest_ of the arguments.
 *
 * In other words - function returned by `rearg` is *curried*.
 *
 * Example:
 *
 * ```
 * string.padLeft("Foo", 10, ".")  ->  ".......Foo"
 *
 * let rePad = func.rearg(string.padLeft) (1, 2, 0)  // *curried* form
 * rePad(10, ".", "Bar")  ->  ".......Bar"
 *
 * console.log("a", "b", "c", "d", "e")
 * a b c d e
 *
 * let revConsole = func.rearg(console.log) (4, 3, 2, 1, 0)
 * revConsole("a", "b", "c", "d", "e")
 * e d c b a
 *
 * revConsole("f") ("g", "h") ("i") ("j")
 * j i h g f
 * ```
 */
export function rearg<T> (
    f: (...args: any[]) => T
): (...indices: number[]) => (...args: any[]) => T;




/**
 * Y-combinator (returns fixed point of a higher-order function
 * passed as `f`).
 */
export function Y (f: Function): Function;
