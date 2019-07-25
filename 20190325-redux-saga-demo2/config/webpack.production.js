const CleanWebpackPlugin = require("clean-webpack-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 一个系统提示工具
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度

module.exports = {
    output: {
        filename: "scripts/[name].[hash:5].bundles.js",
        publicPath: "/", // 生产环境一般配CDN地址
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: '[name]-vendor',
                },
            }
        }
    },
    // optimization: {
    //     // minimizer: [
    //     //     new UglifyJsPlugin({
    //     //         parallel: true, // 并行，多核
    //     //         // parallel: os.cpus().length
    //     //     })
    //     // ],
    //     splitChunks: {
    //         chunks: 'all', // 哪些模块参与splitChunks，值为(all, async, initial, 函数)
    //         minSize: 10000,
    //         maxSize: 30000,
    //         minChunks: 2, // 至少被引用2次才分离成chunk
    //         maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
    //         maxInitialRequests: 2, // 一个入口点的最大数量的并行请求
    //         automaticNameDelimiter: '-', // 指定分隔符 vendors-main.js
    //         // name: true, // 自动产生一个name based on chunks and cache group key
    //         name (module, chunks, cacheGroupKey) {
    //             // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', chunks[0].name, '---', chunks[1].name, '---', cacheGroupKey);
    //             return `abc-${cacheGroupKey}`;
    //         },
    //         cacheGroups: {
    //             // 缓存
    //             // splitChunks.cacheGroups.* 可以覆盖任何 splitChunks.* 设置的值或者splitChunks其它的默认值
    //             vendors: {
    //                 // test 可以是正则、名字、函数，规定哪些模块要被缓存
    //                 test: /[\\/]node_modules[\\/]/, // 只对node_modules里面的包进行分离
    //                 // test(module, chunks) {
    //                 //     // chunks.forEach((chunk) => {
    //                 //     //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', chunk.name);
    //                 //     // });
    //                 //     // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', module.type, '---', chunks.length, '---', module.context, );
    //                 //     return module.type === 'javascript/auto'; // 所有的包只要type为javascript/auto，并满足splitChunks.minChunks的设置都分离
    //                 // },
    //                 filename: '[name]-vendor.js', // 这里的[name]会把上面 splitChunks 层级下的name值作为基础再次处理
    //                 reuseExistingChunk: true, // 默认为true，如果一个'splitChunk'又引用了其它'splitChunk'，这种情况会被优化处理，不会生成新的chunck
    //             },
    //         }
    //     }
    // },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new ProgressBarPlugin(),
        new WebpackBuildNotifierPlugin({
            title: "ReactApp Build",
            suppressSuccess: true
        }),
    ]
}