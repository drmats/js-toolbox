/**
 * JS toolbox.
 *
 * @license Apache-2.0
 */

import { describe, test, expect } from "@jest/globals";

import {
    access,
    isBasicData,
    isBasicDataOrUndefined,
} from "../struct/data";
import { isNumber, isString } from "../type/check";




describe("isBasicData", () => {
    test("should recognize string", async () => {
        expect(isBasicData("test string")).toEqual(true);
    });

    test("should recognize number", async () => {
        expect(isBasicData(42)).toEqual(true);
    });

    test("should recognize boolean", async () => {
        expect(isBasicData(false)).toEqual(true);
    });

    test("shouldn't recognize undefined", async () => {
        expect(isBasicData(undefined)).toEqual(false);
    });

    test("shouldn't recognize null", async () => {
        expect(isBasicData(null)).toEqual(false);
    });
});




describe("isBasicDataOrUndefined", () => {
    test("should recognize string", async () => {
        expect(isBasicDataOrUndefined("test string")).toEqual(true);
    });

    test("should recognize number", async () => {
        expect(isBasicDataOrUndefined(42)).toEqual(true);
    });

    test("should recognize boolean", async () => {
        expect(isBasicDataOrUndefined(false)).toEqual(true);
    });

    test("should recognize undefined", async () => {
        expect(isBasicDataOrUndefined(undefined)).toEqual(true);
    });

    test("shouldn't recognize null", async () => {
        expect(isBasicDataOrUndefined(null)).toEqual(false);
    });
});




describe("access", () => {
    test("should access existing key", async () => {
        const testObj = { a: { b: [10, { c: 42 }] } };
        const testPath = ["a", "b", 1, "c"];

        const result = access(testObj, testPath);

        expect(isNumber(result)).toEqual(true);
        expect(result).toEqual(42);
    });

    test("should return fallback value on non-existing key", async () => {
        const testObj = { a: { b: [10, { c: 42 }] } };
        const testPath1 = ["a", "b", 1, "x"];
        const testPath2 = ["a", "b", 1, "c", 5, "12"];

        const result1 = access(testObj, testPath1, 12);
        const result2 = access(testObj, testPath2, "different value");

        expect(isNumber(result1)).toEqual(true);
        expect(result1).toEqual(12);
        expect(isString(result2)).toEqual(true);
        expect(result2).toEqual("different value");
    });

    test("should return undefined on non-existing key if no fallback", async () => {
        const testObj = { a: { b: [10, { c: 42 }] } };
        const testPath1 = ["c", "x"];
        const testPath2 = ["a", "b", 0, 42];

        const result1 = typeof access(testObj, testPath1);
        const result2 = typeof access(testObj, testPath2);

        expect(result1).toEqual("undefined");
        expect(result2).toEqual("undefined");
    });

    test("should return input if no path", async () => {
        const testObj = { a: { b: [10, { c: 42 }] } };

        const result = access(testObj);

        expect(result).toEqual(testObj);
    });
});
