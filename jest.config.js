/**
 * Jest config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




/** @type {import("ts-jest").JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: [
        "<rootDir>",
    ],
    transform: {
        "^.+\\.(j|t)s?$": "ts-jest",
    },
    transformIgnorePatterns: [
        "<rootDir>/node_modules/",
    ],
};
