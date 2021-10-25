/**
 * @license Apache-2.0
 * @copyright Mat. 2019-present
 * @author drmats
 */

"use strict";

// ...
const { readdirSync } = require("fs");




// ...
module.exports =
    readdirSync("./src/", { withFileTypes: true })
        .filter(de => de.isDirectory())
        .map(de => de.name);
