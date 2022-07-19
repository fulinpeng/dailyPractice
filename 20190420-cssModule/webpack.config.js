const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const IS_DEV = (_mode == "development" ? true : false);
// const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const CleanWebpackPlugin = require('clean-webpack-plugin')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 监控文件打包速度
const WebpackBuildNotifierPlugin = require('webpack-build-notifier'); // 一个系统提示工具
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 打包进度

const config = {
    entry: {
        'main': ['./src/main.js'], // 名称也可以换成路径
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
                    // 分离css与cssModules是冲突的
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         publicPath: './'
                    //     }
                    // },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                            modules: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName: IS_DEV ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                        }
                    },
                    { loader: 'less-loader' }
                ],
                exclude: [/node_modules/, path.resolve(__dirname, 'src/main.less')],
            },
            // 单独将不用cssModules的less进行处理
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                        }
                    },
                    { loader: 'less-loader' }
                ],
                include: [path.resolve(__dirname, 'src/main.less')],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    // {
                    //     loader: MiniCssExtractPlugin.loader,
                    //     options: {
                    //         publicPath: './'
                    //     }
                    // },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: IS_DEV,
                            modules: true,
                            camelCase: true,
                            importLoaders: 1,
                            localIdentName: IS_DEV ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                        },
                    },
                ],
                exclude: [/node_modules/],
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: { // 这里的options选项参数可以定义多大的图片转换为base64
                        limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath: 'images' //定义输出的图片文件夹
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
        ]
    },
    optimization:{
        splitChunks:{
            cacheGroups:{
                commons:{
                    chunks:'initial',
                    name:'common',
                    minChunks:2,
                    maxInitialRequests:5,
                    minSize:0,
                }
            }
        },
        runtimeChunk:{ // webpack 运行时的代码(缓存)
            name:'runtime'
        }
    },
    plugins: [
        new ProgressBarPlugin(), // 放最上面
        new MiniCssExtractPlugin({
            filename: IS_DEV ? "styles/[name].[hash:5].css" : "styles/[name].css",
            chunkFilename: IS_DEV ? "styles/[id].[hash:5].css" : "styles/[name].css"
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
