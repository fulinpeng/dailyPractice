const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const join = (src) => {
    return path.join(__dirname, src)
}

module.exports = {
    // context: path.resolve(__dirname, '../'),
    entry: {
        app: join('src/index.js'),
        another: join('src/another.js'),
    },
    output: {
        filename: '[name].bundle.js',
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
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Production',
            // template: join('index.html'),
            inject: true,
        }),
    ],
};