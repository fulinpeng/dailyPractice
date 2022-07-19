const path = require('path');
const { merge } = require('lodash');
const baseConfig = require('./webpack.config.base');

const entry = {
  bundle: path.resolve(__dirname, '..', 'demo/src/index.js'),
};

const alias = {
  '@src': path.resolve(__dirname, '..', 'src'),
};

// webpack可以不处理应用的某些依赖库，使用externals配置后，依旧可以在代码中通过CMD、AMD或者window/global全局的方式访问
// 如：我们通过script引入的库，如用CDN的方式引入的jquery，我们在使用时，依旧用require的方式来使用，但是却不希望webpack将它又编译进文件中。
// 参考：https://www.cnblogs.com/samli15999/p/7047968.html
const externals = {
  'react-dom': {
    root: 'ReactDOM',
    commonjs2: 'react-dom',
    commonjs: 'react-dom',
    amd: 'react-dom',
  },
  'react-router-dom': {
    root: 'ReactRouterDOM',
    commonjs: 'react-router-dom',
    commonjs2: 'react-router-dom',
    amd: 'react-router-dom',
  },
  antd: {
    root: 'antd',
    commonjs: 'antd',
    commonjs2: 'antd',
    amd: 'antd',
  },
};

const devtool = 'source-map';

const devServer = {
  contentBase: path.resolve(__dirname, '..', 'demo'),
  publicPath: '/dist',
  disableHostCheck: true,
};

const output = {
  path: path.resolve(__dirname, '..', 'demo/dist'),
  filename: '[name].js',
  libraryTarget: 'umd', // 将cdn引入的库用umd方式导出，不进行编译打包
};

module.exports = merge(baseConfig, {
  entry,
  resolve: {
    alias,
  },
  externals,
  devtool,
  devServer,
  output,
});
