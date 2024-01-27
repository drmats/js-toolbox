import { describe, test, expect } from "@jest/globals";
import { append } from "./list";

describe("append", () => {
    test("should append array ys to array xs", () => {
        const xs: number[] = [1, 2, 3];
        const ys: number[] = [4, 5, 6];

        const result = append<number>(xs)(ys);

        expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test("should work with empty arrays", () => {
        const xs: number[] = [];
        const ys: number[] = [4, 5, 6];

        const result = append<number>(xs)(ys);

        expect(result).toEqual([4, 5, 6]);
    });

    test("should work with different types", () => {
        const xs: (number | string)[] = [1, 2, 3];
        const ys: string[] = ["4", "5", "6"];

        const result = append<number | string>(xs)(ys);

        expect(result).toEqual([1, 2, 3, "4", "5", "6"]);
    });
});
