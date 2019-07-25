const webpack = require('webpack');
const path = require("path");
const { join, resolve } = path;
module.exports = {
    output: {
        filename: "scripts/[name].bundles.js",
        publicPath: "/",
    },
    devtool: 'source-map', // devtool 有四种值...
    watch: true, // 监控源文件，改变后重新打包
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
        aggregateTimeout: 500,
    },
    devServer: {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 9000,
        inline: true,
        hot: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new webpack.NoEmitOnErrorsPlugin(), // 即使有错误也不中断运行
    ]
}