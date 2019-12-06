const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    // 原始源代码
    devtool: 'source-map',
    // 入口
    // entry: "./src/index.tsx",
    entry: "./src/app.tsx",

    // 输出
    output: {
        // 打包文件名
        filename: "[name].bundle.[hash:5].js",
        // 输出路径
        path: path.resolve(__dirname, "dist"),
        // 资源请求路径
        publicPath: '/',
    },
    devServer: {
        // 打开模式, Iframe mode和Inline mode最后达到的效果都是一样的，都是监听文件的变化，然后再将编译后的文件推送到前端，完成页面的reload的
        inline: true,
        // 指定了服务器资源的根目录
        contentBase: path.join(__dirname, 'dist'),
        // 是否开启gzip压缩
        compress: false,
        port: 9000,
        // 是否开启全局热替换功能，使用了mini-css-extract-plugin之后，最好开启该项
        // hot: true,
        // 是否开启部分热替换功能
        hotOnly: true,
        // 是否自动打开页面,可以传入指定浏览器名字打开
        open: true,
        proxy: {
            '/api': {
                // 代理地址
                target: 'http://www.test.cn',
                changeOrigin: true,
                // 默认情况下，不接受运行在 HTTPS 上，且使用了无效证书的后端服务器。如果你想要接受
                secure: true,
                // 重写路径
                pathRewrite: {
                    '^/api': ''
                },
            }
        },
    },

    module: {
        rules: [
            {
                test: /antd.*\.less$/, // 只匹配antd文件
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: "../"
                    }
                },
                    // "style-loader", // 使用<style>将css-loader内部样式注入到我们的HTML页面,
                    "css-loader", // 加载.css文件将其转换为JS模块
                {
                    loader: "postcss-loader",
                    options: {
                        config: {
                            path: "./" // 写到目录即可，文件名强制要求是postcss.config.js
                        }
                    }
                },
                {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true // 是否处理js内样式,less-loader@3+需要在选项增加对Js引入的less文件处理
                    }
                }
                ]
            },
            // {
            //     test: /\.(css|scss)$/, // 匹配文件
            //     use: [
            //         "style-loader", // 使用<style>将css-loader内部样式注入到我们的HTML页面
            //         "css-loader", // 加载.css文件将其转换为JS模块
            //         "sass-loader" // 加载 SASS / SCSS 文件并将其编译为 CSS
            //     ]
            // },
            {
                test: /\.scss$/, // 匹配文件
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: "../"
                        }
                    },
                    // "style-loader", // 使用<style>将css-loader内部样式注入到我们的HTML页面
                    "css-loader", // 加载.css文件将其转换为JS模块
                    {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: './' //引入 postcss.config.js 配置，来自动补全css前缀
                            }
                        }
                    },
                    "sass-loader" // 加载 SASS / SCSS 文件并将其编译为 CSS
                ]
            },
            {
                test: /\.(js|jsx)$/, // 匹配文件
                enforce: "pre",
                use: ['babel-loader', 'source-map-loader'],
                exclude: /node_modules/, // 过滤文件夹
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ["awesome-typescript-loader"],
                exclude: [
                  /node_modules\/mutationobserver-shim/g,
                ]
            },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            title: "test", // title
            template: "index.html" // 以index为模板
        }),
        // 提取样式文件
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[hash:5].css',
            chunkFilename: '[id].[hash:5].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".css", ".scss", '.json'],

    }
};