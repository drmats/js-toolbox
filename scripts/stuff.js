#!/bin/node




// ...
var

    {
        copyFileSync,
        writeFileSync,
    } = require("fs"),

    srcDir = "./src",
    distDir = "./dist",

    esConfig = mn => ({
        "sideEffects": false,
        "module": `../es/${mn}/index.js`,
        "typings": "./index.d.ts",
    });




console.info("Copying type declarations and module configs ...");




// copy src type files and es configs to dist directory
require("./module_names")
    .forEach(mn => {
        let src = `${srcDir}/${mn}`, dst = `${distDir}/${mn}`
        copyFileSync(`${src}/${mn}.d.ts`, `${dst}/${mn}.d.ts`);
        copyFileSync(`${src}/index.d.ts`, `${dst}/index.d.ts`);
        writeFileSync(
            `${dst}/package.json`,
            JSON.stringify(esConfig(mn))
        );
    });

// copy index type file
copyFileSync(`${srcDir}/index.d.ts`, `${distDir}/index.d.ts`);

// copy main package config file
copyFileSync("./dist.template.json", `${distDir}/package.json`);

// copy README.md and LICENSE
copyFileSync("./README.md", `${distDir}/README.md`);
copyFileSync("./LICENSE", `${distDir}/LICENSE`);




console.log("OK.");
