const webpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('./webpack.config.js');
const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

// 当使用 webpack dev server 和 Node.js API 时，不要将 dev server 
// 选项放在 webpack 配置对象(webpack config object)中。而是，在创建选项时，
// 将其作为第二个参数传递
webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, 'localhost', () => {
    console.log('\n ############### dev server listening on port 3000');
});

// 如果你使用的是 webpack-dev-middleware，也可以通过 webpack-hot-middleware package 包，
// 在自定义开发服务下启用 HMR。