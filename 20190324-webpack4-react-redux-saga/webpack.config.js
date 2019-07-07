
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const ENV = argv.mode || "development";
const ENV_PRO = ENV == "production" ? true : false;
const _mergeConfig = require(`./config/webpack.${ENV}.js`);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require("path");
const { join, resolve } = require("path");
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
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192',
                options: {
                    limit: 3000, // 字节
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: resolve(APP_PATH, "config/config.js"), to: 'config.js' }
        ]),
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
    ],
    devServer: {
        contentBase: join(__dirname, "dist"),
        compress: true,
        port: 9000
    },
    resolve: {
        extensions: [".js", ".jsx", ".less", ".css", ".scss"],
        alias: {
            _root: APP_PATH,
            _components: resolve(APP_PATH, "webApp/components"),
            _containers: resolve(APP_PATH, "webApp/containers")
        }
    }
};
module.exports = merge(_mergeConfig, webpackConfig);
