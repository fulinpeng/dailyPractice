const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    // devtool: 'source-map',
    optimization: {
        // minimizer: [
        //     new UglifyJsPlugin({
        //         parallel: true, // 并行，多核
        //         // parallel: os.cpus().length
        //     })
        // ],
        splitChunks: {
            // chunks: 'all', // 哪些模块参与splitChunks，值为(all, async, initial, 函数)
            chunks (chunk) {
                // 指定名字为 XXXX 的模块不参与splitChunks
                // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', chunk.name); // app another
                return chunk.name !== 'XXXX';
            },
            minSize: 1000,
            maxSize: 30000,
            minChunks: 2, // 至少被引用2次才分离成chunk
            maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
            maxInitialRequests: 2, // 一个入口点的最大数量的并行请求
            automaticNameDelimiter: '-', // 指定分隔符 vendors-main.js
            // name: true, // 自动产生一个name based on chunks and cache group key
            name (module, chunks, cacheGroupKey) {
                // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', chunks[0].name, '---', chunks[1].name, '---', cacheGroupKey);
                return `abc-${cacheGroupKey}`;
            },
            cacheGroups: {
                // 缓存
                // splitChunks.cacheGroups.* 可以覆盖任何 splitChunks.* 设置的值或者splitChunks其它的默认值
                // cacheGroups的默认设置，可以显示的设置如下
                // 如果要自定义，必须将default设为 false，再到 vendors 中自己设置
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true,
                //     filename: '[name]-vendor.js',
                // },
                // default: false, // 设置为舍弃webpack对cacheGroups的默认设置
                // another: {
                //     // app 这个名字是从下面那个vendors的console.log中找的值，还有another
                //     // app模块打印的content就是src，所以，所有的src中的被分离出的模块将被下面的配置所约束
                //     // 当然要配置所有的被分离出的Groups，还得用 vendors 来配置，而不是像这里用的某个vendors的name
                //     filename: '[name].[-another-].js',
                //     // ...
                // },
                vendors: {
                    // test 可以是正则、名字、函数，规定哪些模块要被缓存
                    // test: /[\\/]node_modules[\\/]/, // 只对node_modules里面的包进行分离
                    test(module, chunks) {
                        // chunks.forEach((chunk) => {
                        //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', chunk.name);
                        // });
                        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', module.type, '---', chunks.length, '---', module.context, );
                        return module.type === 'javascript/auto'; // 所有的包只要type为javascript/auto，并满足splitChunks.minChunks的设置都分离
                    },
                    filename: '[name]-vendor.js', // 这里的[name]会把上面 splitChunks 层级下的name值作为基础再次处理
                    reuseExistingChunk: true, // 默认为true，如果一个'splitChunk'又引用了其它'splitChunk'，这种情况会被优化处理，不会生成新的chunck
                    // enforce: true, // 强制分离；忽略这些配置：splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests
                },
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production') // 在所有src的模块中都能访问到process.env变量
        })
    ],
});