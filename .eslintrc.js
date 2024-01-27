/**
 * ESLint config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

"use strict";




// ...
module.exports = {

    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },


    "parser": "@babel/eslint-parser",


    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },


    "extends": [
        "eslint:recommended",
    ],


    "plugins": [
        "import",
    ],


    "root": true,


    "rules": {
        "comma-dangle": [
            "error",
            {
                "arrays": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline",
                "imports": "always-multiline",
                "objects": "always-multiline",
            },
        ],
        "import/first": "error",
        "import/no-amd": "error",
        "import/no-webpack-loader-syntax": "error",
        "indent": ["warn", 4, { "SwitchCase": 1 }],
        "linebreak-style": ["error", "unix"],
        "no-console": "warn",
        "no-dupe-args": "error",
        "no-dupe-class-members": "error",
        "no-dupe-keys": "error",
        "no-redeclare": "error",
        "no-undef": "error",
        "no-unexpected-multiline": "error",
        "no-unused-vars": ["warn", { "args": "all", "argsIgnorePattern": "^_" }],
        "object-curly-newline": "off",
        "object-curly-spacing": ["error", "always"],
        "prefer-const": "warn",
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", "always"],
        "strict": "off",
    },


    "overrides": [
        {
            "files": ["*.ts"],
            "parser": "@typescript-eslint/parser",
            "parserOptions": {
                "project": true,
                "tsconfigRootDir": __dirname,
            },
            "extends": [
                "plugin:@typescript-eslint/recommended-type-checked",
                "plugin:@typescript-eslint/stylistic-type-checked",
            ],
            "plugins": [
                "@typescript-eslint",
            ],
            "rules": {
                "@typescript-eslint/comma-dangle": [
                    "error",
                    {
                        "arrays": "always-multiline",
                        "enums": "always-multiline",
                        "exports": "always-multiline",
                        "functions": "always-multiline",
                        "generics": "always-multiline",
                        "imports": "always-multiline",
                        "objects": "always-multiline",
                        "tuples": "always-multiline",
                    },
                ],
                "@typescript-eslint/consistent-indexed-object-style": "off",
                "@typescript-eslint/consistent-type-definitions": "off",
                "@typescript-eslint/explicit-module-boundary-types": ["warn"],
                "@typescript-eslint/indent": "off",
                "@typescript-eslint/interface-name-prefix": "off",
                "@typescript-eslint/member-delimiter-style": "error",
                "@typescript-eslint/no-empty-function": "warn",
                "@typescript-eslint/no-misused-promises": [
                    "error", { "checksVoidReturn": false },
                ],
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-redundant-type-constituents": "off",
                "@typescript-eslint/no-unused-vars": [
                    "warn", { "args": "all", "argsIgnorePattern": "^_" },
                ],
                "@typescript-eslint/require-await": "off",
                "@typescript-eslint/semi": ["error", "always"],
                "@typescript-eslint/unbound-method": "off",

                "comma-dangle": "off",
                "no-unused-vars": "off",
                "prefer-const": "warn",
                "require-await": "off",
                "semi": "off",
            },
        },
    ],

};
