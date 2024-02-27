/**
 * JS toolbox.
 *
 * @license Apache-2.0
 */

import { describe, test, expect } from "@jest/globals";

import {
    isArray,
    isBoolean,
    isDate,
    isFunction,
    isNumber,
    isObject,
    isRegExp,
    isString,
} from "../type/check";




describe("basic checks", () => {
    test("isArray() should recognize arrays", async () => {
        expect(isArray([])).toEqual(true);
        expect(isArray([1, 2, 3])).toEqual(true);
    });


    test("isArray() shouldn't recognize non-arrays", async () => {
        expect(isArray(undefined)).toEqual(false);
        expect(isArray(null)).toEqual(false);
        expect(isArray({})).toEqual(false);
    });


    test("isBoolean() should recognize booleans", async () => {
        expect(isBoolean(true)).toEqual(true);
        expect(isBoolean(false)).toEqual(true);
    });


    test("isBoolean() shouldn't recognize non-booleans", async () => {
        expect(isBoolean(undefined)).toEqual(false);
        expect(isBoolean(null)).toEqual(false);
        expect(isBoolean([])).toEqual(false);
        expect(isBoolean({})).toEqual(false);
    });


    test("isDate() should recognize dates", async () => {
        expect(isDate(new Date())).toEqual(true);
    });


    test("isFunction() should recognize functions", async () => {
        expect(isFunction(() => { return 42; })).toEqual(true);
    });


    test("isNumber() should recognize numbers", async () => {
        expect(isNumber(0)).toEqual(true);
        expect(isNumber(42)).toEqual(true);
    });


    test("isNumber() shouldn't recognize non-numbers", async () => {
        expect(isNumber(NaN)).toEqual(false);
        expect(isNumber(Infinity)).toEqual(false);
        expect(isNumber("123")).toEqual(false);
        expect(isNumber(undefined)).toEqual(false);
        expect(isNumber(null)).toEqual(false);
        expect(isNumber(true)).toEqual(false);
    });


    test("isRegExp() should recognize regexps", async () => {
        expect(isRegExp(/test regexp/)).toEqual(true);
    });


    test("isString() should recognize strings", async () => {
        expect(isString("")).toEqual(true);
        expect(isString("test string")).toEqual(true);
    });


    test("isString() shouldn't recognize non-strings", async () => {
        expect(isString(12)).toEqual(false);
        expect(isString(true)).toEqual(false);
        expect(isString(null)).toEqual(false);
        expect(isString(undefined)).toEqual(false);
    });


    test("isObject() should recognize objects", async () => {
        expect(isObject({})).toEqual(true);
        expect(isObject({ someKey: "someVal" })).toEqual(true);
    });


    test("isObject() shouldn't recognize non-objects", async () => {
        expect(isObject(false)).toEqual(false);
        expect(isObject(null)).toEqual(false);
        expect(isObject(undefined)).toEqual(false);
        expect(isObject([])).toEqual(false);
        expect(isObject(["a", "b"])).toEqual(false);
    });
});
