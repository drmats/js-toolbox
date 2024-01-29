/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-function-type */

import { race } from "../async/tools";
import { random } from "../string/gen";
import { timeUnit } from "../utils/misc";




/**
 * Mutual exclusion for asynchronous functions.
 *
 * Example:
 *
 * ```
 * const mutex = async.createMutex()
 *
 * let f = async m => {
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
export const createMutex = <T>(): {
    lock: () => Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
} => {
    let
        resolve = (_v: T | PromiseLike<T>): void => { /* no-op */ },
        reject = (_r?: any): void => {/* no-op */ };
    const promise = new Promise<T>(
        (res, rej) => { resolve = res; reject = rej; },
    );

    return {
        lock: () => promise,
        resolve, reject,
    };
};




/**
 * Create mutex with watchdog (10 minutes by default).
 *
 * `barrier`, in contrast to `mutex`, is preventing node process from exiting.
 *
 * Example:
 * ```
 * const barrier = createBarrier<void>();
 *
 * setTimeout(() => { barrier.resolve("Released!"); }, 2000);
 *
 * await barrier.lock();
 * ```
 *
 * @function createTimedBarrier
 * @param [releaseTimeout=10*timeUnit.minute]
 * @returns {Object} lock(), resolve(), reject()
 */
export const createTimedBarrier = <T>(
    releaseTimeout = 10 * timeUnit.minute,
): ReturnType<typeof createMutex<T>> => {
    const mutex = createMutex<T>();
    let watchdog: ReturnType<typeof setTimeout> | undefined = undefined;
    return {
        ...mutex,
        lock: () => {
            watchdog = setTimeout(() => {
                mutex.reject(new Error("timeout"));
            }, releaseTimeout);
            return mutex.lock();
        },
        resolve: (v) => {
            if (watchdog) clearTimeout(watchdog);
            return mutex.resolve(v);
        },
        reject: (r) => {
            if (watchdog) clearTimeout(watchdog);
            return mutex.reject(r);
        },
    };
};




/**
 * PromisePool fulfilled result type.
 */
export interface PromisePoolFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}




/**
 * PromisePool rejected result type.
 */
export interface PromisePoolRejectedResult<E> {
    status: "rejected";
    reason: E;
}




/**
 * PromisePool empty result type.
 */
export interface PromisePoolEmptyResult {
    status: "empty";
}




/**
 * PromisePool result type.
 */
export type PromisePoolResult<T, E = any> =
    | PromisePoolFulfilledResult<T>
    | PromisePoolRejectedResult<E>
    | PromisePoolEmptyResult;




/**
 * PromisePool properties type.
 */
export interface PromisePoolProps {
    id: string;
}




/**
 * PromisePool internal interface.
 */
interface PromisePoolSlotType<T> {
    id: string;
    value: T;
}




/**
 * Imperative promise pool.
 *
 * ```
 * const pool = promisePool(128);
 * for (element of dataSeries) {
 *     let r = await pool.exec(async () => {
 *         // ...
 *     });
 *     if (r.status === "fulfilled") {
 *         // ...
 *     } else if (r.status === "rejected") {
 *         // ...
 *     }
 * }
 * let rest = await pool.finish();
 * ```
 *
 * @function promisePool
 * @param [poolSize=64]
 * @returns {Object} exec(t), finish()
 */
export const promisePool = <T, E = any>(poolSize = 64): {
    exec: (
        task: { (props: PromisePoolProps): Promise<T> },
    ) => Promise<PromisePoolResult<T, E>>;
    finish: () => Promise<Array<PromisePoolResult<T, E>>>;
} => {
    const slots = {} as Record<string, Promise<PromisePoolSlotType<T>>>;

    return {
        // execute task in an "empty slot"
        // awaits (suspends caller) if there are no more empty slots available
        exec: async (task) => {
            const
                m = createMutex<PromisePoolSlotType<T>>(),
                id = random(8) + String(Date.now());

            // create new slot with locked mutex
            slots[id] = m.lock();

            // convert slots object to array
            const locks = Object.values(slots);

            // run the task (don't wait for it to finish in this context)
            Promise.resolve()
                .then(() => task({ id }))
                .then(
                    (value) => m.resolve({ id, value }),
                    (reason) => m.reject({ id, reason }),
                );

            // if poolSize is filled up then await for some resources
            if (locks.length === poolSize) {
                try {
                    const winner = await race(...locks);
                    delete slots[winner.id];
                    return { status: "fulfilled", value: winner.value };
                } catch (winningErr: any) {
                    delete slots[winningErr.id];
                    return { status: "rejected", reason: winningErr.reason };
                }
            }

            // resolve immediately otherwise
            return { status: "empty" };
        },

        // wait until all tasks are finished
        finish: async () =>
            Object.values(slots).length > 0 ?
                (await Promise.allSettled(
                    Object.values(slots),
                )).map((r) =>
                    r.status === "fulfilled" ? ({
                        status: r.status,
                        value: r.value.value,
                    }) : ({
                        status: r.status,
                        reason: r.reason.reason,
                    }),
                ) as PromisePoolResult<T, E>[] : [],
    };
};
