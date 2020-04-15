#!/bin/node




var
    rm = require("fs").unlinkSync,
    ignoreError = f => (...args) => { try { f(...args) } catch (_) { _ } },
    append = (xs, ys) => { Array.prototype.push.apply(xs, ys); return xs };




// remove src modules and type files from package root
["index"].concat(require("./module_names"))
    .map(mn => ["./" + mn + ".js", "./" + mn + ".d.ts"])
    .reduce(append, [])
    .forEach(ignoreError(rm));
