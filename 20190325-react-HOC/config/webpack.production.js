const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 一个系统提示工具
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度

module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].bundles.js",
        publicPath: "/"
    },
    plugins: [
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(["dist"]),
        new WebpackBuildNotifierPlugin({
            title: "ReactApp Build",
            suppressSuccess: true
        }),
    ]
}