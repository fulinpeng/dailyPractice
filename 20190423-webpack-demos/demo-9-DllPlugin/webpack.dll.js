const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const join = (src) => {
    return path.join(__dirname, src)
}

const config = {
    name: "vendor",
    entry: {
        // 必须使用数组
        vendors: [
            join('./src/transalator.js'),
        ]
    },
    output: {
        path: join("dist"),
        filename: "dell_[name].js", // 合成的新库的文件名
        library: "[name]", // 合成的新库代码内部模块的名字
    },
    
    // 不需要module和rules
    
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all', // 哪些模块参与splitChunks，值为(all, async, initial, 函数)
    //         minSize: 100,
    //         maxSize: 30000,
    //         minChunks: 3, // 至少被引用3次才分离成chunk
    //         maxAsyncRequests: 5, // 按需加载时并行请求的最大数量
    //         maxInitialRequests: 2, // 一个入口点的最大数量的并行请求
    //         automaticNameDelimiter: '_', // 指定分隔符 vendors-main.js
    //         name: true, // 自动产生一个name based on chunks and cache group key
    //         cacheGroups: {
    //             vendors: {
    //                 // test 可以是正则、名字、函数，规定哪些模块要被缓存
    //                 // test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/, // 只对node_modules里面的包进行分离
    //                 // test: /[\\/]src[\\/]/,
    //                 filename: 'vendor_[name].js', // 这里的[name]会把上面 splitChunks 层级下的name值作为基础再次处理
    //                 reuseExistingChunk: true, // 默认为true，如果一个'splitChunk'又引用了其它'splitChunk'，这种情况会被优化处理，不会生成新的chunck
    //                 // enforce: true, // 强制分离；忽略这些配置：splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests
    //                 // chunks: 'all',
    //             },
    //         }
    //     }
    // },
    
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]_[hash]",
			path: join("./dist/[name]_manifest.json"),
        }),
    ],
};


module.exports =  env => {
    return config;
}