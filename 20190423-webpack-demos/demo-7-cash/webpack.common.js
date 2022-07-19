const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const join = (src) => {
    return path.join(__dirname, src)
}

module.exports = {
    // context: path.resolve(__dirname, '../'),
    entry: {
        // app: join('src/index-import-dynamic.js'),
        app: join('src/index.js'),
    },
    output: {
        chunkFilename: '[name]-[contenthash].js', // 决定non-entry块文件的名称
        path: join('dist'),
        publicPath: '/', // 在服务器脚本用到，以确保文件资源能够在 http://localhost:xxxx 下正确访问
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        // runtimeChunk: 'single', // 不修改代码，多次打包生成的hash一致，splitChunks，的功能更多
        splitChunks: {
            chunks: 'all', // 哪些模块参与splitChunks，值为(all, async, initial, 函数)
            minSize: 1,
            maxSize: 30000,
            minChunks: 1, // 至少被引用2次才分离成chunk
            maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
            maxInitialRequests: 2, // 一个入口点的最大数量的并行请求
            automaticNameDelimiter: '-', // 指定分隔符 vendors-main.js
            name: true, // 自动产生一个name based on chunks and cache group key
            // name (module, chunks, cacheGroupKey) {
            //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@', chunks[0].name, '---', chunks[1].name, '---', cacheGroupKey);
            //     return `abc-${cacheGroupKey}`;
            // },
            cacheGroups: {
                vendors: {
                    // test 可以是正则、名字、函数，规定哪些模块要被缓存
                    // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // 只对node_modules里面的包进行分离
                    test: /[\\/]src[\\/]/, // 只对src里面的包进行分离
                    filename: 'vendor-[name].js', // 这里的[name]会把上面 splitChunks 层级下的name值作为基础再次处理
                    reuseExistingChunk: true, // 默认为true，如果一个'splitChunk'又引用了其它'splitChunk'，这种情况会被优化处理，不会生成新的chunck
                    // enforce: true, // 强制分离；忽略这些配置：splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests
                    // chunks: 'all',
                },
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new HtmlWebpackPlugin({
            title: 'cash',
            // template: join('index.html'),
            inject: true,
        }),
    ],
};