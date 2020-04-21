/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */




import { identity } from "../func/tools"
import { curry } from "../func/curry"
import { Y } from "../func/combinators"
import { timeUnit } from "../utils"




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
    let mutex = createMutex()

    return {
        promise: race(p, mutex.lock()),
        cancel: mutex.reject,
        resolve: mutex.resolve,
    }
}




/**
 * Mutual exclusion for asynchronous functions.
 *
 * Example:
 *
 * ```
 * const mutex = async.createMutex()
 *
 * let f = async (m) => {
 *     let val = await m.lock()
 *     return `Freed with val: ${val}`
 * }
 *
 * f(mutex).then(utils.to_("success")).catch(utils.to_("failure"))
 *
 * mutex.resolve(42)  //  mutex.reject("ERROR")
 * ```
 *
 * @function createMutex
 * @returns {Object} lock(), resolve(), reject()
 */
export const createMutex = () => {
    let
        resolve = null, reject = null,
        promise = new Promise(
            (res, rej) => { resolve = res; reject = rej }
        )

    return {
        lock: () => promise,
        resolve, reject,
    }
}




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
 * @param {Function} [passCancel] (cancel) => any
 * @returns {Promise.<Number>}
 */
export const delay = (
    time = timeUnit.second,
    passCancel = identity
) =>
    timeout(() => time, time, passCancel)




/**
 * `setInterval` in `Promise` / `async` skin.
 *
 * Example 1:
 *
 * ```
 * global.x = 0
 * async.interval(
 *     (c) => {
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
 *     (c) => timeout(() => c(), 4 * timeUnit.second)
 * )
 * .then((x) => console.log("Finished:", x))
 * .catch((c) => console.log("Error:", c))
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
    time = timeUnit.second
) => {
    let
        resolve = null, handle = null, result = null,
        clear = (...args) => {
            clearInterval(handle)
            resolve(...(args.length > 0 ? args : [result]))
            return result
        },
        promise = new Promise((res, rej) => {
            resolve = res
            handle = setInterval(() => {
                try { result = f(clear) }
                catch (ex) {
                    clearInterval(handle)
                    rej(ex)
                }
            }, time)
        })

    passClear(clear)

    return promise
}




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
    let
        mutex = createMutex(),
        resolved = false

    ps.forEach(async (p) => {
        let v = null, e = null, thrown = false
        try { v = await p }
        catch (ex) { e = ex; thrown = true }
        if (!resolved) {
            resolved = true
            if (!thrown) mutex.resolve(v)
            else mutex.reject(e)
        }
    })

    return mutex.lock()
}




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
            Promise.resolve(result)
)())




/**
 * `setTimeout` in `Promise` / `async` skin.
 *
 * Example:
 *
 * ```
 * async.timeout(
 *     () => { console.log("Hey!"); return 42 }, 2000,
 *     (c) => async.timeout(() => c("Cancelled!"), 1000)
 * )
 * .then((x) => console.log("Success:", x))
 * .catch((c) => console.log("Error or cancel:", c))
 * ```
 *
 * @async
 * @function timeout
 * @param {Function} f
 * @param {Number} [time=timeUnit.second]
 * @param {Function} [passCancel] (cancel) => any
 * @returns {Promise.<any>}
 */
export const timeout = (
    f,
    time = timeUnit.second,
    passCancel = identity
) => {
    let
        reject = null, handle = null,
        promise = new Promise((res, rej) => {
            reject = rej
            handle = setTimeout(() => {
                try { res(f()) }
                catch (ex) { rej(ex) }
            }, time)
        })

    passCancel((reason) => {
        clearTimeout(handle)
        reject(reason)
    })

    return promise
}
