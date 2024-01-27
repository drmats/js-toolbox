/**
 * List all submodule names.
 *
 * @license Apache-2.0
 * @copyright Mat. 2019-present
 */

"use strict";

// ...
const { readdirSync } = require("node:fs");




// ...
module.exports =
    readdirSync("./src/", { withFileTypes: true })
        .filter(de => de.isDirectory())
        .map(de => de.name);
