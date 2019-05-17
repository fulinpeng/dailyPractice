const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
// const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 监控文件打包速度
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 一个系统提示工具
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度
const smp = new SpeedMeasurePlugin();

const config = {
    entry: {
        'index': ['./src/index.js'], // 名称也可以换成路径
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'script/[name]-[hash:5].js',
        publicPath: '/',
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
                    // 这里不需要style-loader的
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
    optimization:{
        splitChunks:{
            cacheGroups:{
                commons:{
                    chunks:'initial',
                    name:'common',
                    minChunks:1,
                    maxInitialRequests:5,
                    minSize:0,
                }
            }
        },
        runtimeChunk:{ // webpack 运行时的代码
            name:'runtime'
        }
    },
    plugins: [
        new ProgressBarPlugin(), // 放最上面
        new MiniCssExtractPlugin({
            filename: _modeflag ? "styles/[name].[hash:5].css" : "styles/[name].css",
            chunkFilename: _modeflag ? "styles/[id].[hash:5].css" : "styles/[name].css"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin(['dist']), // npm run dist 时会自己清除dist目录
        new WebpackBuildNotifierPlugin({
            title: "My Project Webpack Build",
            // logo: path.resolve("./img/favicon.png"),
            suppressSuccess: true
        }),
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

// config = smp.wrap(config); // 加上就报错。。。

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        // config.devtool = 'source-map';
    }
    if (argv.mode === 'production') {
        //...
    }
    return config;
};
