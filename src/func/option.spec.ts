/**
 * JS toolbox.
 *
 * @license Apache-2.0
 */

import { describe, test, expect } from "@jest/globals";

import { JUST, NOTHING, hasValue, optionalize } from "../func/option";




describe("option", () => {
    test("should recognize no value", () => {
        expect(hasValue(NOTHING)).toEqual(false);
    });


    test("should recognize value", () => {
        expect(hasValue(JUST(42))).toEqual(true);
    });


    test("should optionalize", () => {
        const f = optionalize((n: number) => n**2);

        expect(hasValue(f(NOTHING))).toEqual(false);

        const r = f(JUST(4));
        const predicateResult = hasValue(r);
        expect(predicateResult).toEqual(true);

        if (predicateResult) {
            expect(r.value).toEqual(16);
        } else {
            throw new Error("should have value");
        }
    });
});
