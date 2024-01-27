/**
 * Various tools.
 *
 * @module @xcmats/js-toolbox/utils
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

import type { NoArgFun } from "../type/defs";
import { isFunction, isObject } from "../type/check";
import { quote } from "../string/transform";




/**
 * Run "main" function:
 *     - in browser on "load" event,
 *     - via setTimeout if there's no event API available
 *
 * @function run
 * @param {Function} main
 * @returns {void}
 */
export const run = (main: NoArgFun<void>): void => {
    typeof window !== "undefined"  &&
    isObject(window)  &&
    isFunction(window.addEventListener) ?
        window.addEventListener("load", main) :
        setTimeout(main, 10);
};




/**
 * Time units represented in milliseconds.
 *
 * - `second` - `1000 milliseconds`
 * - `minute` - `60 seconds`
 * - `hour` - `60 minutes`
 * - `day` - `24 hours`
 * - `week` - `7 days`
 * - `month` - [**average** month]: `30.4375 days` (`365.25 days / 12`)
 * - `quarter` - [**average** quarter]: `3 months` (`365.25 days / 4`)
 * - `year` - [**average** year]: `365.25 days`
 *
 * @name timeUnit
 */
export const timeUnit = Object.freeze({
    second: 1000,
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: 2629800000,
    quarter: 7889400000,
    year: 31557600000,
});
export type TimeUnit = typeof timeUnit;




/**
 * Wrap typeof output string with square brackets.
 *
 * @function btquote
 * @param x
 * @returns wrapped typeof string
 */
export const btquote = (x: unknown): string => quote(typeof x, "[]");




/**
 * Measure `fn` working time.
 *
 * @function timing
 * @param fn asynchronous function to measure
 * @returns Object containing `result`, `start` and `duration` fields.
 */
export const timing = async <T>(fn: NoArgFun<Promise<T>>): Promise<{
    result: T;
    start: number;
    duration: number;
}> => {
    const start = Date.now(), result = await fn();
    return { result, start, duration: Date.now() - start };
};
