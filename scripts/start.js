#!/bin/node




// inject compiled modules to repl context
Object.assign(
    require("repl").start({}).context,
    ["array", "async", "math", "redux", "string", "utils",].reduce(
        (e, mn) => (e[mn] = require("../build/" + mn + ".js"), e), {}
    )
)
