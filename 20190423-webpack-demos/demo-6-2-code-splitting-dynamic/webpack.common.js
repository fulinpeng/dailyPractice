const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const join = (src) => {
    return path.join(__dirname, src)
}

module.exports = {
    // context: path.resolve(__dirname, '../'),
    entry: {
        // app: join('src/index-import-dynamic.js'),
        // app: join('src/index-import-async.js'),
        app: join('src/index-import-prefetching.js'),
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
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: join('index.html'),
            inject: true,
        }),
    ],
};