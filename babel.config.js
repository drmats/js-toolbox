/**
 * Babel config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

"use strict";




// ...
const

    { realpathSync } = require("node:fs"),
    { resolve } = require("node:path"),
    appDirectory = realpathSync(process.cwd()),

    conf = {
        plugins: [
            [
                "module-resolver",
                {
                    cwd: "packagejson",
                    extensions: [".js", ".ts"],
                    root: ["./"],
                    alias: {
                        "~": resolve(appDirectory, "src"),
                        "~array": resolve(appDirectory, "src", "array"),
                        "~async": resolve(appDirectory, "src", "async"),
                        "~codec": resolve(appDirectory, "src", "codec"),
                        "~func": resolve(appDirectory, "src", "func"),
                        "~math": resolve(appDirectory, "src", "math"),
                        "~string": resolve(appDirectory, "src", "string"),
                        "~struct": resolve(appDirectory, "src", "struct"),
                        "~type": resolve(appDirectory, "src", "type"),
                        "~utils": resolve(appDirectory, "src", "utils"),
                    },
                },
            ],
            "babel-plugin-inline-json-import",
            "@babel/plugin-transform-export-namespace-from",
        ],
    };




// configuration
module.exports = function (api) {
    api.cache.using(() => process.env.BABEL_ENV);
    // eslint-disable-next-line
    console.log(`Compiling for '${api.env()}' ...`)

    return {
        env: {

            // linting and jsdoc generation
            development: {
                plugins: [
                    ...conf.plugins,
                ],
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                ],
            },

            // node-compatible modules generation
            commonjs: {
                plugins: [
                    ...conf.plugins,
                ],
                comments: false,
                shouldPrintComment: () => false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            exclude: [
                                "transform-async-to-generator",
                                "transform-regenerator",
                            ],
                            modules: "commonjs",
                            targets: {
                                node: "16.0.0",
                            },
                            useBuiltIns: false,
                        },
                    ],
                    [
                        "@babel/preset-typescript",
                    ],
                ],
            },

            // es-modules generation
            es: {
                plugins: [
                    ...conf.plugins,
                ],
                comments: false,
                shouldPrintComment: () => false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            exclude: [
                                "transform-async-to-generator",
                                "transform-regenerator",
                            ],
                            modules: false,
                            targets: {
                                esmodules: true,
                            },
                            useBuiltIns: false,
                        },
                    ],
                    [
                        "@babel/preset-typescript",
                    ],
                ],
            },

        },
    };
};
