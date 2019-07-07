const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');

module.exports = {
    output: {
        filename: 'script/[name]-[hash:5].js',
        publicPath: '/',
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // parallel: true, // 并行，多核
                parallel: os.cpus().length
            })
        ]
    }
}