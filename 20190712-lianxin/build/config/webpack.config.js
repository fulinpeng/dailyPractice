/*
 * @Description: webpack配置文件，生产环境和开发环境通过NODE_ENV变量区别
  */

const argv = require('yargs').argv
const webpack = require('webpack')
const cssnano = require('cssnano')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const project = require('./project.config')
const debug = require('debug')('app:config:webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin');

const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__

debug('Creating configuration.')

let STATIC_RESOURCE_URL = ''
if (project.server_host) {
  STATIC_RESOURCE_URL = `${project.server_host}:${project.server_port}`
}

const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: __PROD__ ? false : project.compiler_devtool,
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': project.paths.client()
    }
  },
  module: {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('app.js')

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.resource_deploy_path}/__webpack_hmr`)
    : [APP_ENTRY],
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  // 打包产出后文件存放位置
  path: project.paths.dist(),
  // entry chunk产出时的文件名称
  filename: `scripts/[name].[${project.compiler_hash_type}].js`,
  // async chunk产出时的文件名称
  chunkFilename: `scripts/[id].[${project.compiler_hash_type}].js`,
  publicPath: `${project.resource_deploy_path}/`
}

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {}
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true
webpackConfig.externals['react/lib/ReactContext'] = true
webpackConfig.externals['react/addons'] = true

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader?cacheDirectory'
  }, {
    test: /\.json$/,
    use: [
      {
        loader: 'json-loader'
      }
    ]
  }]

// ------------------------------------
// Style Loaders
// ------------------------------------
webpackConfig.module.rules.push({
  test: /\.scss$/,
  exclude: /node_modules/,
  use: __PROD__ ?
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader', 'sass-loader']
    })
    :
    [
      'style-loader',
      'css-loader?sourceMap&-minimize',
      'postcss-loader',
      'sass-loader?sourceMap'
    ]
})
webpackConfig.module.rules.push({
  test: /\.css$/,
  exclude: /node_modules/,
  use: __PROD__ ?
    ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader']
    })
    :
    [
      'style-loader',
      'css-loader?sourceMap&-minimize',
      'postcss-loader',
    ]
})

// url-loader中使用option时候避免警告信息
process.traceDeprecation = true

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  { test: /\.woff(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  {
    test: /\.(png|jpg)$/,
    loader: 'url-loader?limit=8192',
    options: {
      // 不超过3000字节的资源直接用base64
      limit: 3000,
      name: 'images/[name].[hash:7].[ext]'
    }
  }
)
/* eslint-enable */

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new CopyWebpackPlugin([
    { from: project.paths.client('config/config.js'), to: 'config.js'}
  ]),
  new webpack.DllReferencePlugin({
    context: project.path_base,
    manifest: require('./vendors-manifest.json')
  }),
  new webpack.DefinePlugin(project.globals),
  new webpack.BannerPlugin("Copyright by hydata R&D center platform front-end group"),
  new HtmlWebpackPlugin({
    template: project.paths.client('index.html'),
    hash: false,
    favicon: project.paths.public('favicon.ico'),
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    },
    chunksSortMode: 'dependency'
  }),
  new AddAssetHtmlPlugin({
    includeSourcemap: false,
    filepath: require.resolve('../../dist/scripts/vendors.lib.js'),
    outputPath: 'scripts',
    publicPath: `${STATIC_RESOURCE_URL}${project.resource_deploy_path}/scripts`
  }),
]

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new AddAssetHtmlPlugin({
      includeSourcemap: false,
      typeOfAsset: 'css',
      filepath: require.resolve('../../node_modules/antd/dist/antd.css'),
      outputPath: 'styles',
      publicPath: `${STATIC_RESOURCE_URL}${project.resource_deploy_path}/styles`,
    })
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurrenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    // 生产模式下，引入antd.css的压缩版本
    new AddAssetHtmlPlugin({
      includeSourcemap: false,
      typeOfAsset: 'css',
      filepath: require.resolve('../../node_modules/antd/dist/antd.min.css'),
      outputPath: 'styles',
      publicPath: `${STATIC_RESOURCE_URL}${project.resource_deploy_path}/styles`,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin('styles/[name].[contenthash].css', {
      allChunks: true
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  )
}

module.exports = webpackConfig
