const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = {
    entry: {
        'index': ['./index.js'], // 名称也可以换成路径
        // main: './main.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:5].js',
        publicPath: '',
    },
    module: {
        rules: [
            { loader: 'style-loader' },
            { test: /\.css$/, use: 'css-loader' },
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
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 publicPath: './'
            //             }
            //         },
            //         'style-loader', 
            //         {
            //             // loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]'
            //             loader: 'css-loader'
            //         }
            //     ]
            // }
            // {
            //     // test 表示测试什么文件类型
            //     test:/\.css$/,
            //     // 使用 'style-loader','css-loader'
            //     use:ExtractTextPlugin.extract({
            //         fallback:'style-loader', // 回滚
            //         use:'css-loader',
            //         publicPath:'../' //解决css背景图的路径问题
            //     })
            // },
            // {
            //     test:/\.less$/,
            //     use:['style-loader','css-loader','less-loader'] // 编译顺序从右往左
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
        // new MiniCssExtractPlugin({
        //     filename: '[name].css',
        //     chunkFilename: '[id].css'
        // })
        // new ExtractTextPlugin("styles.css"),
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