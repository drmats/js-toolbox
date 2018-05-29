/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */




/**
 * Delay current async execution by `time` miliseconds.
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
 * @see {@link async.timeout}
 * @param {Number} [time=1000]
 * @param {Function} [cancel]
 * @returns {Promise}
 */
export const delay = (time = 1000, cancel = (_canceller) => null) =>
    timeout(() => time, time, cancel)




/**
 * `setInterval` in `Promise` / `async` skin.
 *
 * Example usage:
 *
 * ```
 * interval(
 *     () => { console.log("Hey!"); return 42 },
 *     (c) => timeout(() => c(), 4000)
 * )
 * .then((x) => console.log("Finished:", x))
 * .catch((c) => console.log("Error:", c))
 * ```
 *
 * @async
 * @function interval
 * @param {Function} f
 * @param {Function} clear
 * @param {Number} [time=1000]
 * @returns {Promise}
 */
export const interval = (f, clear, time = 1000) => {
    let
        resolve = null, handle = null, result = null,
        promise = new Promise((res, rej) => {
            resolve = res
            handle = setInterval(() => {
                try { result = f() }
                catch (ex) { rej(ex) }
            }, time)
        })
    clear(() => {
        clearInterval(handle)
        resolve(result)
        return result
    })
    return promise
}




/**
 * `setTimeout` in `Promise` / `async` skin.
 *
 * Example usage:
 *
 * ```
 * timeout(
 *     () => { console.log("Hey!"); return 42 }, 1000,
 *     (c) => timeout(() => c("Cancelled!"), 800)
 * )
 * .then((x) => console.log("Success:", x))
 * .catch((c) => console.log("Error or cancel:", c))
 * ```
 *
 * @async
 * @function timeout
 * @param {Function} f
 * @param {Number} [time=1000]
 * @param {Function} [cancel]
 * @returns {Promise}
 */
export const timeout = (f, time = 1000, cancel = (_canceller) => null) => {
    let
        reject = null, handle = null,
        promise = new Promise((res, rej) => {
            reject = rej
            handle = setTimeout(() => {
                try { res(f()) }
                catch (ex) { rej(ex) }
            }, time)
        })
    cancel((reason) => {
        clearTimeout(handle)
        reject(reason)
    })
    return promise
}
