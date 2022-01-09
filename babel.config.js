/**
 * Babel config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 * @author drmats
 */

"use strict"




// ...
const

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
                                node: "14.0.0",
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
    }
}
