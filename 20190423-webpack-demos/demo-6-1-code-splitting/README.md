# 公共代码分离
* 指定环境变量
    * `process.env.NODE_ENV === 'production'`
    * 无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production"，所以用 `webpack.DefinePlugin` 来配置
    * 任何位于 `/src` 的本地代码都可以关联到 process.env.NODE_ENV 环境变量，见：[index.js]('./src/index.js')
* index.html中会先引入vender包，再引入entry中配置的包
# 问题
* webpack得配置文件放到bulid目录下，entry 这样配置 `app: '../src/index.js'` ，就会报错！为什么？


* 只是代码分离，并缓存
    * 别和commonsChunk搞混了
    * webpack.optimize.CommonsChunkPlugin 已经被移除了，用 config.optimization.splitChunks 代替