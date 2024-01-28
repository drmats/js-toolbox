/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import { identity } from "../func/tools";
import { timeUnit } from "../utils/misc";




/**
 * Delay current async execution by `time` miliseconds.
 *
 * Example:
 *
 * ```
 * (async () => {
 *     await async.delay()
 *     console.log("Hello ...")
 *     await async.delay()
 *     console.log("... world")
 * })()
 * ```
 *
 * @async
 * @function delay
 * @see [timeout]{@link module:async~timeout}
 * @param {Number} [time=timeUnit.second]
 * @param {Function} [passCancel] cancel => any
 * @returns {Promise.<Number>}
 */
export const delay = (
    time = timeUnit.second,
    passCancel = identity,
) =>
    timeout(() => time, time, passCancel);




/**
 * `setInterval` in `Promise` / `async` skin.
 *
 * Example 1:
 *
 * ```
 * global.x = 0
 * async.interval(
 *     c => {
 *         if (global.x === 10) { c("tada") }
 *         else { global.x += 1 }
 *         console.log("ping", Date.now())
 *     }
 * )
 * .then(utils.to_("success"))
 * .catch(utils.to_("failure"))
 * ```
 *
 * Example 2:
 * ```
 * interval(
 *     () => { console.log("Hey!"); return 42 },
 *     c => timeout(() => c(), 4 * timeUnit.second)
 * )
 * .then(x => console.log("Finished:", x))
 * .catch(c => console.log("Error:", c))
 * ```
 *
 * @async
 * @function interval
 * @param {Function} f
 * @param {Function} [passClear] (Function) => any
 * @param {Number} [time=timeUnit.second]
 * @returns {Promise.<any>}
 */
export const interval = (
    f,
    passClear = identity,
    time = timeUnit.second,
) => {
    let resolve = null, handle = null, result = null;
    const
        clear = (...args) => {
            clearInterval(handle);
            resolve(...(args.length > 0 ? args : [result]));
            return result;
        },
        promise = new Promise((res, rej) => {
            resolve = res;
            handle = setInterval(() => {
                try { result = f(clear); }
                catch (ex) {
                    clearInterval(handle);
                    rej(ex);
                }
            }, time);
        });

    passClear(clear);

    return promise;
};




/**
 * `setTimeout` in `Promise` / `async` skin.
 *
 * Example:
 *
 * ```
 * async.timeout(
 *     () => { console.log("Hey!"); return 42 }, 2000,
 *     c => async.timeout(() => c("Cancelled!"), 1000)
 * )
 * .then(x => console.log("Success:", x))
 * .catch(c => console.log("Error or cancel:", c))
 * ```
 *
 * @async
 * @function timeout
 * @param {Function} f
 * @param {Number} [time=timeUnit.second]
 * @param {Function} [passCancel] cancel => any
 * @returns {Promise.<any>}
 */
export const timeout = (
    f,
    time = timeUnit.second,
    passCancel = identity,
) => {
    let reject = null, handle = null;
    const promise = new Promise((res, rej) => {
        reject = rej;
        handle = setTimeout(() => {
            try { res(f()); }
            catch (ex) { rej(ex); }
        }, time);
    });

    passCancel(reason => {
        clearTimeout(handle);
        reject(reason);
    });

    return promise;
};
