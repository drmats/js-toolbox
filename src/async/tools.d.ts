/**
 * Async - type declarations.
 *
 * @module @xcmats/js-toolbox/async
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




/**
 * Make any promise cancellable.
 *
 * Example:
 *
 * ```
 * let { promise, cancel } = async.cancellable(
 *     async.timeout(() => "Job done!", 2000)
 * )
 *
 * promise.then(utils.to_("resolved")).catch(utils.to_("rejected"))
 *
 * cancel("I've changed my mind")
 * ```
 */
export declare function cancellable (
    p: Promise<unknown>
): {
    promise: Promise<unknown>,
    cancel: (reason?: any) => void,
    resolve: (value?: any) => void,
};




/**
 * Resolve or reject when any of the promises
 * passed as arguments resolve or reject.
 *
 * Complementary function to the standard `Promise.all()`.
 *
 * Example:
 *
 * ```
 * m1 = async.createMutex()
 * m2 = async.createMutex()
 *
 * async.race(m1.lock(), m2.lock())
 *     .then(utils.to_("resolved"))
 *     .catch(utils.to_("rejected"))
 *
 * m1.resolve("All right!")  //  or, e.g: m2.reject("Some left!")
 * ```
 */
export declare function race<T> (...ps: Promise<T>[]): Promise<T>;




/**
 * Repeat `f` (sync. or async.) while `condition` evaluates to `true`.
 *
 * Resolves with result of last `f` execution
 * when `condition` evaluates to `false`.
 */
export declare function repeat<T> (
    f: () => Promise<T> | T,
    condition: () => boolean
): Promise<T>;
