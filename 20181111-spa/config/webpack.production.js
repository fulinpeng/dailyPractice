const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const os = require('os');

module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // parallel: true, // 并行，多核
                parallel: os.cpus().lenght
            })
        ]
    }
}