/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { createMutex } from "../async/concurrency";
import { curry } from "../func/curry";
import { Y } from "../func/combinators";




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
 *
 * @function cancellable
 * @param {Promise} p
 * @returns {Object} { promise, cancel, resolve }
 */
export const cancellable = p => {
    const mutex = createMutex();

    return {
        promise: race(p, mutex.lock()),
        cancel: mutex.reject,
        resolve: mutex.resolve,
    };
};




/**
 * Resolve or reject when any of the promises
 * passed as arguments resolve or reject.
 *
 * Mirror of the standard function `Promise.race()`.
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
 *
 * @async
 * @function race
 * @param  {...Promise} ps promises
 * @returns {Promise}
 */
export const race = (...ps) => {
    const mutex = createMutex();
    let resolved = false;

    ps.forEach(async p => {
        let v = null, e = null, thrown = false;
        try { v = await p; }
        catch (ex) { e = ex; thrown = true; }
        if (!resolved) {
            resolved = true;
            if (!thrown) mutex.resolve(v);
            else mutex.reject(e);
        }
    });

    return mutex.lock();
};




/**
 * Repeat `f` (sync. or async.) while `condition` evaluates to `true`.
 *
 * Resolves with result of last `f` execution
 * when `condition` evaluates to `false`.
 *
 * @async
 * @function repeat
 * @param {Function} f
 * @param {Function} condition
 * @returns {Promise.<any>}
 */
export const repeat = curry((f, condition) => Y(act =>
    result =>
        condition() ?
            Promise.resolve().then(f).then(act) :
            Promise.resolve(result),
)());
