#!/bin/node




var
    {
        copyFileSync,
        writeFileSync,
    } = require("fs"),

    packageTemplate = mn => ({
        "sideEffects": false,
        "module": `../es/${mn}/index.js`,
        "typings": "./index.d.ts",
    });




console.info("Copying type declarations and es configs ...")

// copy src type files and es configs to dist directory
require("./module_names")
    .forEach(mn => {
        let src = `./src/${mn}`, dst = `./dist/${mn}`
        copyFileSync(`${src}/${mn}.d.ts`, `${dst}/${mn}.d.ts`);
        copyFileSync(`${src}/index.d.ts`, `${dst}/index.d.ts`);
        writeFileSync(
            `${dst}/package.json`,
            JSON.stringify(packageTemplate(mn))
        );
    });

// copy index type file
copyFileSync("./src/index.d.ts", "./dist/index.d.ts")

console.log("OK.")
