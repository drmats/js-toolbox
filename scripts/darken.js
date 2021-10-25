#!/bin/node
/**
 * Apply dark theme to js-doc output.
 *
 * @license Apache-2.0
 * @copyright Mat. 2019-present
 * @author drmats
 */

"use strict";

// ...
const

    {
        copyFileSync,
        unlinkSync,
    } = require("fs"),

    stylesDir = "./scripts/styles",
    distDir = "./dist";




console.info("Saving the eyes of documentation readers ...");




// rename default style
copyFileSync(
    `${distDir}/doc/styles/jsdoc-default.css`,
    `${distDir}/doc/styles/jsdoc-default.bright.css`,
);
unlinkSync(`${distDir}/doc/styles/jsdoc-default.css`);




// copy dark styles
copyFileSync(
    `${stylesDir}/dark.css`,
    `${distDir}/doc/styles/dark.css`,
);
copyFileSync(
    `${stylesDir}/jsdoc-default.css`,
    `${distDir}/doc/styles/jsdoc-default.css`,
);




console.info("OK.");
