const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const ENV = argv.mode || "development";
const ENV_PRO = ENV == "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${ENV}.js`);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');

const path = require("path");
const { join, resolve } = path;
const ROOT_PATH = resolve(__dirname);
const APP_PATH = resolve(ROOT_PATH, "src");

webpackConfig = {
    entry: {
        app: "./src/app.js"
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
                // use: 'happypack/loader?id=sass',
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.css$/,
                // use: 'happypack/loader?id=css', // 怎么加上插件啊用happypack时
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: 'happypack/loader?id=js',
                // loader: "babel-loader",
                exclude: /node_modules/,
                // .babelrc 文件：evn 处理es6，stage-0 处理es7，react 处理react
            },
            // file-loader 解析图片地址，把图片拷贝到目标位置并修改引用地址
            // url-loader 可以处理任意二进制文件，在一定限制大小内可以转成base64串嵌入到页面
            {
                test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
                use: 'happypack/loader?id=img',
                // loader: 'url-loader',
                // options: {
                //     limit: 1024 * 5, // 字节
                //     name: 'images/[name].[hash:5].[ext]',
                //     // outputPath: 'images/', // 文件输入目录(指定name也可以达到效果就一起咯)
                // }
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: resolve(APP_PATH, "config/config.js"), to: 'config.js' }
        ]),
        new HappyPack({
            id: 'js',
            threads: 2,
            loaders: ['babel-loader']
        }),
        // new HappyPack({
        //     id: 'css',
        //     threads: 2,
        //     loaders: [
        //         { loader: 'style-loader' },
        //         {
        //             loader: MiniCssExtractPlugin.loader,
        //             options: {
        //                 publicPath: './'
        //             }
        //         },
        //         { loader: 'css-loader' },
        //         { loader: 'sass-loader' }
        //     ]
        // }),
        // new HappyPack({
        //     id: 'css',
        //     threads: 2,
        //     loaders: [
        //         {
        //             loader: MiniCssExtractPlugin.loader,
        //             options: {
        //                 publicPath: './'
        //             }
        //         },
        //         { loader: 'css-loader' }
        //     ]
        // }),
        new HappyPack({
            id: 'img',
            threads: 2,
            loaders: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 5, // 字节
                        name: 'images/[name].[hash:5].[ext]',
                        // outputPath: 'images/', // 文件输入目录(指定name也可以达到效果就一起咯)
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: ENV_PRO ? "styles/[name].[hash:5].css" : "styles/[name].css",
            chunkFilename: ENV_PRO
                ? "styles/[id].[hash:5].css"
                : "styles/[name].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html"
        }),
        // 引用 webpack.dll.js 中导出的库
        new webpack.DllReferencePlugin({
            context: join(__dirname, "./dist"), // 必须有context，不然找不到打包后的模块
            // manifest: join(__dirname, 'dist/manifest.json'),
            manifest: require('./dist/manifest.json'), // 用路径或者用require加载都可以
        }),
        // 插入js
        // new AddAssetHtmlPlugin({
        //   includeSourcemap: false,
        //   filepath: join(__dirname, 'dist/dllLibrary.js'),
        //   outputPath: '/',
        //   publicPath: `${location.origin}/`
        // }),
    ],
    devServer: {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    // 解析：当加载一个文件的时候，按照如下的规则顺序查找
    resolve: {
        // 指定模块加载的查询顺序，特别是自定义模块
        modules: [resolve(__dirname, 'node_modules'), resolve(APP_PATH, 'util')],
        // 某个库做了同构处理，需要在 pagage.json 文件添加对应的配置，webpack 会根据 mainFields 来找
        // mainFields: ['main', 'browser', 'node'], // 暂时不需要
        // 可省略文件后缀，越靠前权重越高
        extensions: [".js", ".jsx", ".less", ".css", ".scss", '.json'],
        alias: {
            _root: APP_PATH,
            _components: resolve(APP_PATH, "webApp/components"),
            _containers: resolve(APP_PATH, "webApp/containers")
        }
    }
};
module.exports = merge(_mergeConfig, webpackConfig);
