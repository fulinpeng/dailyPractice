const webpack = require('webpack');
// const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const ENV = process.env.NODE_ENV || "development";
const ENV_PRD = ENV == "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${ENV}.js`);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ModuleConcatenationPlugina = require('webpack/lib/optimize/ModuleConcatenationPlugin');

const path = require("path");
const { join, resolve } = path;
const ROOT_PATH = resolve(__dirname);
const APP_PATH = resolve(ROOT_PATH, "src");

console.log('@@@@@@@@@--NODE_ENV:', process.env.NODE_ENV);

webpackConfig = {
    entry: {
        app: "./src/app.js"
    },
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             // async chunk入口引入的分离为 common
    //             app: {
    //                 test: /[\\/]src[\\/]/,
    //                 chunks: 'all',
    //                 minChunks: 2,
    //                 name: 'common',
    //             },
    //             // node_modules 里的分离为 vendor
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 chunks: 'all',
    //                 name: 'vendor',
    //             },
    //         }
    //     }
    // },
    plugins: [
        new webpack.DefinePlugin({
            _NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }),
        new CopyWebpackPlugin([
            { from: resolve(APP_PATH, "config/config.js"), to: 'config.js' }
        ]),
        new MiniCssExtractPlugin({
            filename: ENV_PRD ? "styles/[name].[hash:5].css" : "styles/[name].css",
            chunkFilename: ENV_PRD
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
        // new ModuleConcatenationPlugina(), // 开启 Scope Hoisting
    ],
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
            _containers: resolve(APP_PATH, "webApp/containers"),
            _util: resolve(APP_PATH, "util"),
        }
    }
};
module.exports = merge(_mergeConfig, webpackConfig);
