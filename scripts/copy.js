#!/bin/node




var copy = require("fs").copyFileSync


// copy src modules to package root
require("./module_names").forEach(
    mn => copy("./src/" + mn + ".js", "./" + mn + ".js")
)
