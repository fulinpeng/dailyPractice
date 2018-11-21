const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;
const setIterm2Badge = require('set-iterm2-badge');
const CleanWebpackPlugin = require('clean-webpack-plugin');


setIterm2Badge("开发环境");
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
// const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
    entry: {
        'index': ['./src/index.js'], // 名称也可以换成路径
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:5].js',
        publicPath: '/',
    },
    module: {
        rules: [
            // { loader: 'style-loader' },
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
                    {loader: 'css-loader'}
                ]
            },
            // 下面这个和上面的less会冲突
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
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{ // 这里的options选项参数可以定义多大的图片转换为base64
                        limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
                        outputPath:'images' //定义输出的图片文件夹
                    }
                }]
            }
        ]
    },
    plugins: [
        new WebpackDeepScopeAnalysisPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag?"styles/[name].[hash:5].css":"styles/[name].css",
            chunkFilename: _modeflag?"styles/[id].[hash:5].css":"styles/[name].css"
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
        new CleanWebpackPlugin(['dist']), // npm run dist 时会自己清除dist目录
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