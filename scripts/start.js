#!/bin/node




// inject compiled modules to repl context
Object.assign(
    require("repl").start({}).context,
    [
        "array", "async", "codec", "func",
        "math", "redux", "string", "type", "utils",
    ].reduce(
        (e, mn) => (e[mn] = require("../lib/" + mn + ".js"), e), {}
    )
)
