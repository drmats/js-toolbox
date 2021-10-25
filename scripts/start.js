#!/bin/node
/**
 * @license Apache-2.0
 * @copyright Mat. 2019-present
 * @author drmats
 */

"use strict";




// inject compiled modules to repl context
Object.assign(
    require("repl").start({}).context,
    require("./module_names").reduce((e, mn) => (
        e[mn] = Object.entries(require("../dist/" + mn).default)
            .sort(([k1], [k2]) => k1.localeCompare(k2))
            .reduce((m, [k, v]) => (m[k] = v, m), {}),
        e
    ), {}),
);
