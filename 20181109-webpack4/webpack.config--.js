const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const UglifyJsPlugin = require('mini-css-extract-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");// 分离css（extract-text-webpack-plugin已经不用了）
const ENV = process.env.NODE_ENV;
console.log('ENV', ENV)
const config = {
    entry: {
        'index': ['./index.js'], // 名称也可以换成路径
        // main: './main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash:5].js',
        publicPath: '',
    },
    module: {
        rules: [
            // { loader: 'style-loader' },
            // { loader: 'css-loader' },
            {
                test: /\.css$/,
                use: [
                  { loader: 'style-loader' },
                  {
                    loader: 'css-loader',
                    options: {
                      modules: true
                    }
                  },
                  { loader: 'sass-loader' }
                ]
            },
            // {
            //     test: /\.css$/,
            //     use: [
            //       {
            //         loader: MiniCssExtractPlugin.loader,
            //         options: {
            //           publicPath: '../'
            //         }
            //       },
            //       "css-loader"
            //     ]
            // },
            // {
            //     test: /\.less$/,
            //     use: [
            //         { loader: 'style-loader' },
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         },
            //         {
            //             loader: 'less-loader',
            //             options: {
            //                 plugins: [
            //                     new CleanCSSPlugin({ advanced: true })
            //                 ]
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                    { loader: 'less-loader' }
                ]
            },
        ]
    },
    plugins: [
        //     new HtmlWebpackPlugin({
        //         template: './src/index.html',
        //         filename: 'index.html',
        //     }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // })
    ]
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