/**
 * Jest config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    roots: ["<rootDir>"],
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^~/(.*)$": "<rootDir>/src/$1",
        "^~array(.*)$": "<rootDir>/src/array$1",
        "^~async(.*)$": "<rootDir>/src/async$1",
        "^~codec(.*)$": "<rootDir>/src/codec$1",
        "^~func(.*)$": "<rootDir>/src/func$1",
        "^~math(.*)$": "<rootDir>/src/math$1",
        "^~string(.*)$": "<rootDir>/src/string$1",
        "^~struct(.*)$": "<rootDir>/src/struct$1",
        "^~type(.*)$": "<rootDir>/src/type$1",
        "^~utils(.*)$": "<rootDir>/src/utils$1",
    },
};
