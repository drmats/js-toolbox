/**
 * Array tools.
 *
 * @module @xcmats/js-toolbox/array
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import type { ArrStr } from "../type/defs";
import type { ChooseArrElOrStr } from "../type/utils";
import { range } from "../array/tools";
import { dec, inc, sub } from "../math/arithmetic";
import { randomInt } from "../math/random";
import { isArray } from "../type/check";




/**
 * Choose a random element from a non-empty array.
 *
 * @function draw
 * @param {Array<T>|String} arr
 * @returns {T|String}
 */
export function draw<T extends ArrStr> (xs: T): ChooseArrElOrStr<T> {
    if (!xs.length) throw new TypeError("array.draw() - empty list");
    return xs[randomInt() % xs.length];
}




/**
 * Shuffle all elements in the given array
 * (Durstenfeld's modification to the Fisher-Yates shuffle algorithm).
 *
 * The operation is taken in-place.
 *
 * @function shuffle
 * @param {Array} arr
 * @returns {Array}
 */
export function shuffle<T> (arr: readonly T[]): T[] {
    if (!isArray(arr)) throw new TypeError(
        `array.shuffle() - expected array as argument, got [${typeof arr}]`,
    );

    for (let i = dec(arr.length);  i > 0;  i -= 1) {
        const j = randomInt() % inc(i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
}




/**
 * - `sparse(stop, size)` -> array of 'size' distinct integers
 *     in range `[0..stop-1]`
 * - `sparse(start, stop, size)` -> array of 'size' distinct integers
 *     in range `[start..stop-1]`
 *
 * Generate sparse array of distinct integers
 * with (almost) uniform distribution.
 *
 * @function sparse
 * @param {Number} [start=0]
 * @param {Number} stop
 * @param {Number} size
 * @returns {Array}
 */
export function sparse (stop: number, size: number): number[];
export function sparse (start: number, stop: number, size: number): number[];
export function sparse (...args: number[]): number[] {
    let start = 0, stop = 0, size = 0, interval = 0;
    const hash = Object.create(null) as Record<number, number>;

    if (args.length === 2) { [stop, size] = args; }
    else if (args.length === 3) { [start, stop, size] = args; }
    else throw new TypeError(
        `array.sparse() expected 2 or 3 arguments, got ${args.length}`,
    );

    if (start > stop) { [start, stop] = [stop, start]; }
    interval = stop - start;

    if (size <= 0  ||  interval === 0) { return []; }
    if (size >= interval) { return range(start, stop); }

    while (size > 0) {
        const val = (randomInt() % interval) + start;
        if (!Object.hasOwnProperty.call(hash, val)) {
            hash[val] = val;
            size = dec(size);
        }
    }

    return Object.values(hash).sort(sub);
}
