"use strict"




// ...
var

    runtimeVersion = require(
        "./package.json",
    ).dependencies["@babel/runtime-corejs3"],

    conf = {
        plugins: [
            "babel-plugin-inline-json-import",
            "@babel/plugin-proposal-export-namespace-from",
        ],
    }




// configuration
module.exports = function (api) {
    api.cache.using(() => process.env.BABEL_ENV)
    // eslint-disable-next-line
    console.log(`Compiling for '${api.env()}' ...`)

    return {
        env: {

            // linting and jsdoc generation
            development: {
                plugins: [...conf.plugins, "@babel/plugin-transform-runtime"],
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                ],
            },

            // node-compatible modules generation
            commonjs: {
                plugins: [
                    ...conf.plugins, [
                        "@babel/plugin-transform-runtime",
                        {
                            absoluteRuntime: false,
                            corejs: 3,
                            version: runtimeVersion,
                        },
                    ],
                ],
                comments: false,
                shouldPrintComment: () => false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: "commonjs",
                            useBuiltIns: false,
                            targets: {
                                node: "12.0.0",
                            },
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
                    ...conf.plugins, [
                        "@babel/plugin-transform-runtime",
                        {
                            absoluteRuntime: false,
                            corejs: 3,
                            version: runtimeVersion,
                        },
                    ],
                ],
                comments: false,
                shouldPrintComment: () => false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: false,
                            useBuiltIns: false,
                            targets: {
                                esmodules: true,
                            },
                        },
                    ],
                    [
                        "@babel/preset-typescript",
                    ],
                ],
            },

        },
    }
}
