const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAferWebpackPlugin = require('./htmlAferWebpackPlugin.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);

const config = {
    entry: {
        'index-index': './project/src/views/index.entry.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            },
            // css-loader的写法之一
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    // 这里不需要style-loader的呀，别打开
                    { loader: 'css-loader' }
                ]
            },
            // 下面这个和上面的会冲突
            // {
            //     test: /\.css$/,
            //     use: [
            //         'style-loader',
            //         {
            //             loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
            //         }
            //     ]
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: 'images' //定义输出的图片文件夹
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
            chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[name].css"
        }),
        // 插件有先后顺序，请注意
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./project/src/views/index.html",
            inject: false // 它自己插入的有问题，要自己写插件
        }),
        new HtmlAferWebpackPlugin(),
    ],
    devServer: {
        // port: 3000,
        // hot: true,
        before(app) {
            app.get('/api/test', (req, res) => {
                res.json({
                    code: 200,
                    message: 'hello world'
                })
            })
        }
    }
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