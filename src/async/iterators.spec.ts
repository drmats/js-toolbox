/**
 * JS toolbox.
 *
 * @license Apache-2.0
 */

import { describe, test, expect } from "@jest/globals";

import { map } from "../async/iterators";




describe("map", () => {
    test("should async iterate", async () => {
        const result = await map([1, 2, 3])(async (x) => 2 * x);
        expect(result).toEqual([2, 4, 6]);
    });

    test("should sync iterate", async () => {
        const result = await map([1, 2, 3])((x) => 2 * x);
        expect(result).toEqual([2, 4, 6]);
    });

    test("should resolve empty list (async)", async () => {
        const result = await map([])(async (x) => 2 * x);
        expect(result).toEqual([]);
    });

    test("should resolve empty list (sync)", async () => {
        const result = await map([])((x) => 2 * x);
        expect(result).toEqual([]);
    });
});
