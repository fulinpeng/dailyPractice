
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
    }
}