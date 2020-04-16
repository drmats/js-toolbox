// ...
var { readdirSync } = require("fs");




// ...
module.exports =
    readdirSync("./src/", { withFileTypes: true })
        .filter(de => de.isDirectory())
        .map(de => de.name);
