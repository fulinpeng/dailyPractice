const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        print: './src/print.js',
    },
    output: {
        filename: 'bundle.js',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/', // 在服务器脚本用到，以确保文件资源能够在 http://localhost:xxxx 下正确访问
    },
    devtool: 'inline-source-map', // false, // 帮助开发时定位错误
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin({
            // cleanAfterEveryBuildPatterns: ['dist/*'],
        }),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: 'index.html',
            inject: true,
            meta: [
                {
                    name: 'description',
                    content: 'A better default template for html-webpack-plugin.'
                }
            ],
        }),
    ],
    devServer: {
        contentBase: './dist', // 服务器根目录
    },
};