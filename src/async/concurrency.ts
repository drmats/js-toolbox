/**
 * Asynchronous tools.
 *
 * @module async
 * @license Apache-2.0
 * @author drmats
 */

/* eslint-disable @typescript-eslint/no-explicit-any */




import {
    createMutex,
    race,
} from "./tools";
import { random } from "../string/gen";




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
 * @param {Number} [poolSize=64]
 * @returns {Object} exec(t), finish()
 */
export const promisePool = <T, E = any>(poolSize = 64): {
    exec: (
        task: { (props: PromisePoolProps): Promise<T> },
    ) => Promise<PromisePoolResult<T, E>>;
    finish: () => Promise<Array<PromisePoolResult<T, E>>>;
} => {
    let slots = {} as Record<string, Promise<{ id: string, value: T }>>;

    return {
        // execute task in an "empty slot"
        // awaits (suspends caller) if there are no more empty slots available
        exec: async (task) => {
            const
                m = createMutex(),
                id = random(8) + String(Date.now());

            // create new slot with locked mutex
            slots[id] = m.lock();

            // convert slots object to array
            let locks = Object.values(slots);

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
                    let winner = await race(...locks);
                    delete slots[winner.id];
                    return { status: "fulfilled", value: winner.value };
                } catch (winningErr) {
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
