/**
 * JS toolbox.
 *
 * @license Apache-2.0
 */

import { describe, test, expect } from "@jest/globals";

import { bind, JUST, NOTHING, hasValue, optionalize } from "../option/maybe";
import { isNumber } from "../type/check";




describe("maybe", () => {
    test("should recognize no value", () => {
        expect(hasValue(NOTHING)).toEqual(false);
    });


    test("should recognize value", () => {
        expect(hasValue(JUST(42))).toEqual(true);
    });


    test("should optionalize", () => {
        const f = optionalize((v: number) => v**2);

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


    test("should bind", () => {
        const f = (v: number) => isNumber(v) ? JUST(v) : NOTHING;

        expect(hasValue(f(Infinity))).toBe(false);

        const r1 = bind(NOTHING, f);
        expect(hasValue(r1)).toBe(false);

        const r2 = bind(JUST(Infinity), f);
        expect(hasValue(r2)).toBe(false);

        const r3 = bind(JUST(27), f);
        const predicateResult = hasValue(r3);

        if (predicateResult) {
            expect(r3.value).toEqual(27);
        } else {
            throw new Error("should have value");
        }

    });
});
