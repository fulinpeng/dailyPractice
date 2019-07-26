const webpack = require('webpack');
const CleanWebpackPlugin = require("clean-webpack-plugin");

const path = require("path");
const { join } = path;

dllConfig = {
    entry: {
        dllLibrary: ['react', 'react-dom']
    },
    output: {
        path: join(__dirname, "dist"),
        filename: "[name].js", // 合成的新库的文件名
        library: "[name]_[hash]", // 合成的新库代码内部模块的名字
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),
        new webpack.DllPlugin({
            // context: join(__dirname, "./dist"),
            name: "[name]_[hash]", // name 值要和上面的 library 一致
			path: join(__dirname, "./dist/manifest.json"),
        }),
    ],
};

// 生产模式下压缩vendors.dll.js文件
// if(__PROD__) {
//     dllConfig.plugins.push(
//       new webpack.DefinePlugin({
//         'process.env': {
//           NODE_ENV: JSON.stringify('production')
//         }
//       }),
//       new webpack.optimize.UglifyJsPlugin({
//         compress: {
//           unused: true,
//           dead_code: true,
//           warnings: false
//         }
//       })
//     )
//   }
module.exports = dllConfig;
