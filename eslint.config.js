/**
 * ESLint config.
 *
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */

"use strict";

const {
    defineConfig,
    globalIgnores,
} = require("eslint/config");

const globals = require("globals");
const babelParser = require("@babel/eslint-parser");
const eslintPluginImport = require("eslint-plugin-import");

const {
    fixupPluginRules,
} = require("@eslint/compat");

const tsParser = require("@typescript-eslint/parser");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const js = require("@eslint/js");

const stylistic = require("@stylistic/eslint-plugin");

const {
    FlatCompat,
} = require("@eslint/eslintrc");




// ...
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});




// ...
module.exports = defineConfig([

    {

        "files": ["**/*.js"],

        "languageOptions": {
            "globals": {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
            },
            "parser": babelParser,
            "parserOptions": {
                "ecmaVersion": "latest",
                "sourceType": "module",
            },
        },

        "extends": compat.extends("eslint:recommended"),

        "plugins": {
            "@import": fixupPluginRules(eslintPluginImport),
            "@stylistic": stylistic,
        },

        "rules": {
            "@stylistic/comma-dangle": ["error", {
                "arrays": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline",
                "imports": "always-multiline",
                "objects": "always-multiline",
            }],
            "@stylistic/indent": ["warn", 4, {
                "SwitchCase": 1,
            }],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/object-curly-newline": "off",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/space-before-function-paren": ["error", "always"],

            "@import/first": "error",
            "@import/no-amd": "error",
            "@import/no-webpack-loader-syntax": "error",

            "no-console": "warn",
            "no-dupe-args": "error",
            "no-dupe-class-members": "error",
            "no-dupe-keys": "error",
            "no-redeclare": "error",
            "no-undef": "error",
            "no-unexpected-multiline": "error",
            "no-unused-vars": ["warn", {
                "args": "all",
                "argsIgnorePattern": "^_",
            }],
            "prefer-const": "warn",
            "strict": "off",
        },

    }, {

        "files": ["**/*.ts"],

        "languageOptions": {
            "globals": {
                ...globals.browser,
                ...globals.commonjs,
                ...globals.node,
            },
            "parser": tsParser,
            "parserOptions": {
                "project": true,
                "tsconfigRootDir": __dirname,
            },
        },

        "extends": compat.extends(
            "plugin:@typescript-eslint/recommended-type-checked",
            "plugin:@typescript-eslint/stylistic-type-checked",
        ),

        "plugins": {
            "@import": fixupPluginRules(eslintPluginImport),
            "@typescript-eslint": typescriptEslint,
            "@stylistic": stylistic,
        },

        "rules": {
            "@stylistic/comma-dangle": ["error", {
                "arrays": "always-multiline",
                "enums": "always-multiline",
                "exports": "always-multiline",
                "functions": "always-multiline",
                "generics": "always-multiline",
                "imports": "always-multiline",
                "objects": "always-multiline",
                "tuples": "always-multiline",
            }],
            "@stylistic/indent": ["warn", 4, {
                "SwitchCase": 1,
            }],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/member-delimiter-style": "error",
            "@stylistic/object-curly-newline": "off",
            "@stylistic/object-curly-spacing": ["error", "always"],
            "@stylistic/quotes": ["error", "double"],
            "@stylistic/semi": ["error", "always"],
            "@stylistic/space-before-function-paren": ["error", "always"],

            "@import/first": "error",
            "@import/no-amd": "error",
            "@import/no-webpack-loader-syntax": "error",

            "@typescript-eslint/consistent-indexed-object-style": "off",
            "@typescript-eslint/consistent-type-definitions": "off",
            "@typescript-eslint/explicit-module-boundary-types": ["warn"],
            "@typescript-eslint/indent": "off",
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/no-empty-function": "warn",
            "@typescript-eslint/no-misused-promises": ["error", {
                "checksVoidReturn": false,
            }],
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-redundant-type-constituents": "off",
            "@typescript-eslint/no-unused-vars": ["warn", {
                "args": "all",
                "argsIgnorePattern": "^_",
            }],
            "@typescript-eslint/require-await": "off",
            "@typescript-eslint/unbound-method": "off",

            "no-console": "warn",
            "no-dupe-args": "error",
            "no-dupe-class-members": "error",
            "no-dupe-keys": "error",
            "no-undef": "error",
            "no-unexpected-multiline": "error",
            "no-unused-vars": "off",
            "prefer-const": "warn",
            "require-await": "off",
            "strict": "off",
        },

    }, globalIgnores([

        ".git/*",
        ".vscode/*",
        "dist/*",
        "node_modules/*",
        "scripts/*",

    ]),

]);
