const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAferWebpackPlugin = require('./htmlAferWebpackPlugin.js');

const config = {
    entry: {
        'index-index' :'./project/src/views/index.entry.js' 
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./project/src/views/index.html",
            inject:false // 它自己插入的有问题，要自己写插件
        }),
        new HtmlAferWebpackPlugin()
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // config.devtool = 'source-map';
    }
    if (argv.mode === 'production') {
        //...
    }
    return config;
};