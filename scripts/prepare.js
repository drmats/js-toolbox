#!/bin/node
/**
 * Prepare all sub-packages.
 *
 * @license Apache-2.0
 * @copyright Mat. 2019-present
 */

"use strict";




// ...
const

    {
        copyFileSync,
        mkdirSync,
        readdirSync,
        writeFileSync,
    } = require("node:fs"),

    srcDir = "./src",
    distDir = "./dist",

    esConfig = mn => ({
        "sideEffects": false,
        "module": `../es/${mn}/index.js`,
        "typings": "./index.d.ts",
    }),

    tsFiles = dir =>
        readdirSync(dir, { withFileTypes: true })
            .filter(de => de.isFile() && de.name.endsWith(".d.ts"))
            .map(de => de.name),

    packageJson = require("../package.json"),

    distJson = require("./dist.template.json");




console.info("Copying type declarations and module configs ...");




// copy src type files and es configs to dist directory
require("./module_names")
    .forEach(mn => {
        let src = `${srcDir}/${mn}`, dst = `${distDir}/${mn}`;
        mkdirSync(dst, { recursive: true });
        tsFiles(`${src}/`).forEach(f => {
            copyFileSync(`${src}/${f}`, `${dst}/${f}`);
        });
        writeFileSync(
            `${dst}/package.json`,
            JSON.stringify(esConfig(mn)),
        );
    });




// prepare dist package.json and store it
[
    "bugs", "contributors", "dependencies", "description",
    "engines", "homepage", "keywords", "license", "name",
    "repository", "version",
].forEach(key => { distJson[key] = packageJson[key]; });
writeFileSync(
    `${distDir}/package.json`,
    JSON.stringify(
        Object.entries(distJson)
            .sort(([a, _1], [b, _2]) => a.localeCompare(b))
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
    ),
);


// copy README.md and LICENSE
copyFileSync("./README.md", `${distDir}/README.md`);
copyFileSync("./LICENSE", `${distDir}/LICENSE`);




console.info("OK.");
