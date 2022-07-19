// const webpack = require('webpack');
// const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 一个系统提示工具
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度

module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].bundles.js", // entry chunk 文件名
        publicPath: "/", // 生产环境一般配CDN地址
        chunkFilename: 'scripts/async-[name]-[contenthash:5].js', // 决定non-entry块文件的名称
    },
    // 用了分离，就不能用按需加载了...
    // 看能不能兼顾啊
    // optimization: {
    //     // minimizer: [
    //     //     new UglifyJsPlugin({
    //     //         parallel: true, // 并行，多核
    //     //         // parallel: os.cpus().length
    //     //     })
    //     // ],
    //     splitChunks: {
    //         chunks: 'all', // 哪些模块参与splitChunks，值为(all, async, initial, 函数)
    //         minSize: 1000,
    //         maxSize: 1000000, // 生成的包最大不能超过这个值，超过了就自动拆开
    //         minChunks: 2, // 默认为1
    //         maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
    //         maxInitialRequests: 3, // 首屏加载最大并行请求
    //         automaticNameDelimiter: '-', // 指定分隔符 vendors-main.js
    //         // name: true, // 默认为true， based on chunks and cache group key
    //         name (module, chunks, cacheGroupKey) {
    //             // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', cacheGroupKey);
    //             return `abc-${cacheGroupKey}`;
    //         },
    //         cacheGroups: {
    //             // 缓存(如果源文件没有更改，hash值就不变，浏览器就不会重新请求而走缓存获取)
    //             // 通过正则来判断的，每个vendor打一个chunk出来
    //             vendor1: {
    //                 // test 可以是正则、名字、函数，规定哪些模块要被分离出来缓存
    //                 test: /[\\/]node_modules[\\/]/,
    //                 filename: 'scripts/[name]-vendor.js', // 这里的[name]会把上面 splitChunks 层级下的name值作为基础再加上当前对象的key
    //                 reuseExistingChunk: true, // 默认就为true，如果一个'splitChunk'又引用了其它'splitChunk'，这种情况会被优化处理，不会生成新的chunck
    //                 // test: /([\\/]node_modules[\\/])|([\\/]src[\\/])/, // 合并成一个
    //                 // name: '[name]-vendor.js', // [name] 是获取不到值的，name字段没有filename灵活
    //             },
    //             vendor2: {
    //                 test: /[\\/]src[\\/]/,
    //                 filename: 'scripts/[name]-vendor.js',
    //             },
    //         }
    //     }
    // },
    plugins: [
        new ProgressBarPlugin(),
        // new WebpackBuildNotifierPlugin({
        //     title: "ReactApp Build",
        //     suppressSuccess: true
        // }),
    ]
}