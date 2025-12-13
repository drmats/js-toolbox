/**
 * JS toolbox - utils/jss tests.
 *
 * @license Apache-2.0
 */

import { describe, test, expect } from "@jest/globals";

import { rgb, rgba, url } from "../utils/jss";




describe("rgb", () => {
    test("should format rgb values with commas and spaces", () => {
        expect(rgb(255, 0, 128)).toBe("rgb(255, 0, 128)");
    });

    test("should work with zero values", () => {
        expect(rgb(0, 0, 0)).toBe("rgb(0, 0, 0)");
    });
});




describe("rgba", () => {
    test("should format rgba values including alpha", () => {
        expect(rgba(10, 20, 30, 0.5)).toBe("rgba(10, 20, 30, 0.5)");
    });

    test("should accept integer alpha values", () => {
        expect(rgba(1, 2, 3, 1)).toBe("rgba(1, 2, 3, 1)");
    });
});




describe("url", () => {
    test("should wrap value in url() and quote the inner string", () => {
        expect(url("/img/logo.png")).toBe("url(\"/img/logo.png\")");
    });

    test("should preserve spaces inside quoted url", () => {
        expect(url("a b c.png")).toBe("url(\"a b c.png\")");
    });
});
