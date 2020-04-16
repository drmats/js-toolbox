#!/bin/node




var copy = require("fs").copyFileSync;




console.info("Copying type declarations ...")

// copy src type files to dist directory
require("./module_names")
    .forEach(mn => {
        let src = `./src/${mn}`, dst = `./dist/${mn}`
        copy(`${src}/${mn}.d.ts`, `${dst}/${mn}.d.ts`);
        copy(`${src}/index.d.ts`, `${dst}/index.d.ts`);
    });

// copy index type file
copy("./src/index.d.ts", "./dist/index.d.ts")

console.log("OK.")
