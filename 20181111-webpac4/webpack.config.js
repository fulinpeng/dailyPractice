const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const _modeflag = (_mode == "production" ? true : false);
const config = {
    entry: {
        'index': ['./src/index.js'], // 名称也可以换成路径
    },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].[hash:5].js',
    //     publicPath: '',
    // },
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
                    {loader: 'css-loader'},
                    { loader: 'less-loader' }
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
                    // 'style-loader',  // 这里不需要的呀，别打开
                    {loader: 'css-loader'}
                ]
            },
            // {
            //     test:/\.(png|jpg|gif)$/,
            //     use:[{
            //         loader:'url-loader',
            //         options:{ // 这里的options选项参数可以定义多大的图片转换为base64
            //             limit:50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
            //             outputPath:'images' //定义输出的图片文件夹
            //         }
            //     }]
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: _modeflag?"styles/[name].[hash:5].css":"styles/[name].css",
            chunkFilename: _modeflag?"styles/[id].[hash:5].css":"styles/[name].css"
        }),
        new HtmlWebpackPlugin({
            filename:"index.html",
            template:"./src/index.html"
        }),
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