#!/bin/node




var
    rm = require("fs").unlinkSync,
    ignoreError = f => (...args) => { try { f(...args) } catch (_) { _ } }




// remove src modules from package root
require("./module_names").forEach(
    mn => ignoreError(rm) ("./" + mn + ".js")
)
