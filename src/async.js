/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */




import { head } from "./array"
import {
    identity,
    partial,
    rearg,
    Y,
} from "./func"
import { quote } from "./string"
import {
    isArray,
    isFunction,
} from "./type"
import { timeUnit } from "./utils"




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
 * @returns {Promise.<*>}
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
 * Example:
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
        promise = new Promise((res) => { resolve = res }),
        progress = (r) => {
            results.push(r)
            i += 1
            if (i < arr.length) {
                Promise
                    .resolve(f.call(arr, arr[i], i))
                    .then(progress).catch(progress)
            } else resolve(results)
        },
        bquote = (x) => partial(rearg(quote)(1, 0))("[]")(typeof x)

    if (isArray(arr)  &&  isFunction(f)) {
        if (arr.length > 0) {
            Promise
                .resolve(f.call(arr, head(arr), 0))
                .then(progress).catch(progress)
        } else return Promise.resolve(results)
    } else throw new TypeError(
        "async.map() expected array and function, " +
        `got ${bquote(arr)} and ${bquote(f)}`
    )

    return promise
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
 * Example:
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
 * Example:
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
        promise = new Promise((res) => { resolve = res }),
        progress = (r) => {
            i += 1
            if (i < arr.length) {
                Promise
                    .resolve(f.call(arr, r, arr[i], i))
                    .then(progress).catch(progress)
            } else resolve(r)
        },
        bquote = (x) => partial(rearg(quote)(1, 0))("[]")(typeof x)

    if (isArray(arr)  &&  isFunction(f)) {
        if (arr.length > 0) {
            Promise
                .resolve(f.call(arr, initAcc || head(arr), head(arr), 0))
                .then(progress).catch(progress)
        } else return Promise.resolve(initAcc)
    } else throw new TypeError(
        "async.reduce() expected array and function, " +
        `got ${bquote(arr)} and ${bquote(f)}`
    )

    return promise
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
 * @returns {Promise.<*>}
 */
export const repeat = (f, condition) => Y(
    (act) => (result) =>
        condition() ?
            Promise.resolve().then(f).then(act) :
            Promise.resolve(result)
)()




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
 * @returns {Promise.<*>}
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
