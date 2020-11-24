/**
 * Shared memory.
 *
 * @module memory
 * @license Apache-2.0
 * @author drmats
 */




import {
    identity,
    lazyish,
} from "../func/tools";
import { assign } from "../struct/data";




/**
 * Application logic shared memory structure.
 *
 * @function memory
 * @returns memory object
 */
const memory = lazyish({});




/**
 * Invoke function argument with a reference to shared memory.
 *
 * @function useMemory
 * @param f function to invoke on a shared memory
 * @returns {*}
 */
export function useMemory<T> (f: (x: T) => T = identity): T {
    return f(memory() as T);
}




/**
 * Extend shared memory with keys from provided extension object.
 * It throws when shared memory already have those keys.
 *
 * @function share
 * @param ext extension object
 * @returns extended memory object
 */
export function share<T> (ext: T): T {
    return useMemory(ctx => {
        assign(ctx, ext);
        return ctx;
    });
}
