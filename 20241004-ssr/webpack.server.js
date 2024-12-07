const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
    entry: "./server/server.js",
    target: "node",
    externals: [nodeExternals()],
    output: {
        path: path.resolve("dist"),
        filename: "server.bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
};
