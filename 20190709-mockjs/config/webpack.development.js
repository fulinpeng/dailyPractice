
const { join, resolve } = require("path");
module.exports = {
    output: {
        filename: "scripts/[name].bundles.js",
    },
    devServer: {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
}