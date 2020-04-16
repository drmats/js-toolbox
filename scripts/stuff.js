#!/bin/node




// ...
var

    {
        copyFileSync,
        mkdirSync,
        writeFileSync,
    } = require("fs"),

    srcDir = "./src",
    distDir = "./dist",

    esConfig = mn => ({
        "sideEffects": false,
        "module": `../es/${mn}/index.js`,
        "typings": "./index.d.ts",
    }),

    packageJson = require("../package.json"),

    distJson = require("../dist.template.json");




console.info("Copying type declarations and module configs ...");




// copy src type files and es configs to dist directory
require("./module_names")
    .forEach(mn => {
        let src = `${srcDir}/${mn}`, dst = `${distDir}/${mn}`;
        mkdirSync(dst, { recursive: true });
        copyFileSync(`${src}/${mn}.d.ts`, `${dst}/${mn}.d.ts`);
        copyFileSync(`${src}/index.d.ts`, `${dst}/index.d.ts`);
        writeFileSync(
            `${dst}/package.json`,
            JSON.stringify(esConfig(mn))
        );
    });


// copy index type file
copyFileSync(`${srcDir}/index.d.ts`, `${distDir}/index.d.ts`);


// prepare dist package.json and store it
[
    "bugs", "contributors", "dependencies", "description",
    "engines", "homepage", "keywords", "license", "name",
    "repository", "version"
].forEach(key => { distJson[key] = packageJson[key] });
writeFileSync(
    `${distDir}/package.json`,
    JSON.stringify(
        Object.entries(distJson)
            .sort(([a, _1], [b, _2]) => a.localeCompare(b))
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
    )
);


// copy README.md and LICENSE
copyFileSync("./README.md", `${distDir}/README.md`);
copyFileSync("./LICENSE", `${distDir}/LICENSE`);




console.info("OK.");
