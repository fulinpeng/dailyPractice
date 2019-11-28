const webpack = require('webpack');
const path = require("path");
const { join, resolve } = path;
const antLessOverride = require('./antLessOverride.js');
// console.log('@@@@@@@@@@@@@@@@@@@@', antLessOverride);
// 自定制主题使用，也可以在 .babelrc 中配置 hack
const antOptions = {
    modifyVars: antLessOverride, // Override with less file
    javascriptEnabled: true,
}
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
    },
    devServer: {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 9000,
        inline: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: antOptions
                    }
                ],
                // include: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                // exclude: /(node_modules)|(asyncModules)/,
                // .babelrc 文件：evn 处理es6，stage-0 处理es7，react 处理react
            },
            // {
            //     test: /\.(js|jsx)$/,
            //     include: /asyncModules/,
            //     // exclude: /((?!asyncModules).)*/,
            //     use: [
            //         {
            //             loader: 'bundle-loader',
            //             options: {
            //                 lazy: true,
            //                 // name: 'async-[name]',
            //             }
            //         },
            //         { loader: 'babel-loader' },
            //     ],
            // },
            // file-loader 解析图片地址，把图片拷贝到目标位置并修改引用地址
            // url-loader 可以处理任意二进制文件，在一定限制大小内可以转成base64串嵌入到页面
            {
                test: /\.(png|jpe?g|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024 * 5, // 字节
                    name: 'images/[name].[hash:5].[ext]',
                    // outputPath: 'images/', // 文件输入目录(指定name也可以达到效果)
                }
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // 热更新插件
        new webpack.NoEmitOnErrorsPlugin(), // 即使有错误也不中断运行
    ]
}