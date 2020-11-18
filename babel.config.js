"use strict"




// ...
var conf = {
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-transform-runtime",
        "babel-plugin-inline-json-import",
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
                ...conf,
                presets: [
                    "@babel/preset-env",
                    "@babel/preset-typescript",
                ],
            },

            // node-compatible modules generation
            commonjs: {
                ...conf,
                comments: false,
                shouldPrintComment: () => false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: "commonjs",
                            shippedProposals: true,
                            targets: {
                                node: true,
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
                ...conf,
                comments: false,
                shouldPrintComment: () => false,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: false,
                            shippedProposals: true,
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
