/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */




import { head } from "./array"
import { isFunction } from "./type"




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
 * @returns {Promise.<Number>}
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
 * @returns {Promise.<*>}
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
 * Asynchronous version of standard `Array.prototype.map` function.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `element` - currently processed element
 *     - `index` - current index
 *
 * `f` can return `Promise.<*>` or `<*>`
 *
 * Example usage:
 *
 * ```
 * (async () => {
 *     let x = await async.map(
 *         array.range(10),
 *         (x) => async.timeout(() => 4*x, 100*x)
 *     )
 *     console.log(x)
 * })()
 * ```
 *
 * @async
 * @function map
 * @param {Array} arr
 * @param {Function} f
 * @returns {Promise.<Array>}
 */
export const map = (arr, f) => {
    let
        results = [],
        i = 0,
        resolve = null,
        p = new Promise((res) => { resolve = res }),
        progress = (r) => {
            results.push(r)
            i += 1
            if (i < arr.length) {
                Promise.resolve(f.call(arr, arr[i], i))
                    .then(progress).catch(progress)
            } else resolve(results)
        }

    if (Array.isArray(arr)  &&  isFunction(f)) {
        if (arr.length > 0) {
            Promise.resolve(f.call(arr, head(arr), 0))
                .then(progress).catch(progress)
        } else return Promise.resolve(results)
    } else throw new TypeError(
        "async.map() expected array and function," +
        ` got ${typeof arr} and ${typeof f}`
    )

    return p
}




/**
 * Asynchronous version of standard `Array.prototype.map` function.
 *
 * *Implementation that does paralell execution*.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `element` - currently processed element
 *     - `index` - current index
 *
 * `f` can return `Promise.<*>` or `<*>`
 *
 * Example usage:
 *
 * ```
 * (async () => {
 *     let x = await async.parMap(
 *         array.range(10),
 *         (x) => async.timeout(() => 4*x, 100*x)
 *     )
 *     console.log(x)
 * })()
 * ```
 *
 * @async
 * @function parMap
 * @param {Array} arr
 * @param {Function} f
 * @returns {Promise.<Array>}
 */
export const parMap = (arr, f) =>
    Promise.all(arr.map((el) => Promise.resolve(f(el))))




/**
 * Asynchronous version of standard `Array.prototype.reduce` function.
 *
 * - `arr` - array to operate on
 * - `f` - async or sync function with signature:
 *     - `this` - bound to `arr`
 *     - `acc` - accumulates the `f`'s return values; it is
 *         the accumulated value previously returned
 *         in the last invocation of `f`, or `initAcc`, if supplied.
 *     - `element` - currently processed element
 *     - `index` - current index
 * - `initAcc` - value to use as the first argument to the first call
 *     of the `f`. If no initial value is supplied, the first element
 *     in the array will be used.
 *
 * `f` can return `Promise.<*>` or `<*>`
 *
 * Example usage:
 *
 * ```
 * (async () => {
 *     let x = await async.reduce(
 *         array.range(10),
 *         (acc, x) => async.timeout(() => acc+x, 100*x),
 *         0
 *     )
 *     console.log(x)
 * })()
 * ```
 *
 * @async
 * @function reduce
 * @param {Array} arr
 * @param {Function} f
 * @param {*} [initAcc]
 * @returns {Promise.<*>}
 */
export const reduce = (arr, f, initAcc) => {
    let
        i = 0,
        resolve = null,
        p = new Promise((res) => { resolve = res }),
        progress = (r) => {
            i += 1
            if (i < arr.length) {
                Promise.resolve(f.call(arr, r, arr[i], i))
                    .then(progress).catch(progress)
            } else resolve(r)
        }

    if (Array.isArray(arr)  &&  isFunction(f)) {
        if (arr.length > 0) {
            Promise.resolve(f.call(arr, initAcc || head(arr), head(arr), 0))
                .then(progress).catch(progress)
        } else return Promise.resolve(initAcc)
    } else throw new TypeError(
        "async.reduce() expected array and function," +
        ` got ${typeof arr} and ${typeof f}`
    )

    return p
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
 * @returns {Promise.<*>}
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
