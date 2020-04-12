"use strict"




// common plugins
var commonPlugins = [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-transform-arrow-functions",
    "@babel/plugin-transform-block-scoped-functions",
    "@babel/plugin-transform-block-scoping",
    "@babel/plugin-transform-computed-properties",
    "@babel/plugin-transform-destructuring",
    "@babel/plugin-transform-exponentiation-operator",
    "@babel/plugin-transform-literals",
    "@babel/plugin-transform-parameters",
    "@babel/plugin-transform-runtime",
    "@babel/plugin-transform-shorthand-properties",
    "@babel/plugin-transform-spread",
    "@babel/plugin-transform-template-literals",
]




// configuration
module.exports = function (api) {
    api.cache.using(() => process.env.BABEL_ENV)
    // eslint-disable-next-line
    console.log("Compiling for", "'" + api.env() + "'", "...")

    return {
        "env": {
            "commonjs": {
                "comments": false,
                "plugins": commonPlugins.concat([
                    "@babel/plugin-transform-modules-commonjs",
                ]),
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "modules": "commonjs",
                            "shippedProposals": true,
                            "targets": {
                                "node": "8.0.0",
                            },
                        },
                    ],
                ],
            },
            "es": {
                "comments": false,
                "plugins": commonPlugins,
                "presets": [
                    [
                        "@babel/preset-env",
                        {
                            "modules": false,
                            "shippedProposals": true,
                            "targets": {
                                "esmodules": true,
                            },
                        },
                    ],
                ],
            },
        },
    }
}
