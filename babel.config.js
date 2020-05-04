"use strict"




// ...
var conf = {
    comments: false,
    shouldPrintComment: () => false,
    plugins: [
        "@babel/plugin-proposal-export-namespace-from",
        ["@babel/plugin-transform-arrow-functions", { "spec": true }],
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
            commonjs: {
                ...conf,
                presets: [
                    [
                        "@babel/preset-env",
                        {
                            modules: "commonjs",
                            shippedProposals: true,
                            targets: {
                                node: "10.0.0",
                            },
                        },
                    ],
                ],
            },
            es: {
                ...conf,
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
                ],
            },
        },
    }
}
