#!/bin/node




var copy = require("fs").copyFileSync;




// copy src type files to package root
["index"].concat(require("./module_names"))
    .forEach(
        mn => copy("./src/" + mn + ".d.ts", "./" + mn + ".d.ts")
    );
