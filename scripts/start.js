#!/bin/node




// inject compiled modules to repl context
Object.assign(
    require("repl").start({}).context,
    require("./module_names").reduce(
        (e, mn) => (e[mn] = require("../lib/" + mn + ".js"), e), {}
    )
)
