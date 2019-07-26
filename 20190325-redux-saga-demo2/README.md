# 项目结构
* ...

# 运行
* npm run dev

* --mode development
    * 这种方式提供参数，可以不用配置开发工具，因为内部都做了
    * 只能是 development、production

# 待优化
* css压缩
* js console.log 要去掉
* treeshaking有吗
* 清理dist目录好像无效
* http请求的错误被吞了

# 补充
* 什么是同构？做多个平台兼容的过程叫同构
    * mainFields配置 见 20190423-webpack-spa/demo-12-mainFields/

    * cross-env 可以跨平台设置参数
* package.json 的 script 标签，其实执行的是：node_modules/.bin下面的文件
    * node_modules/.bin/webpack-dev-server 等同于 webpack-dev-server

* 预加载还是没有成功
* 代码分割是可以了，按需加载也是可以的了
* 用了 dll 就不用 vendor: ['jquery', 'other-lib'] 了，对不？

* 发现一个规律：
    * filename 才可以通过`[name]`动态定义name，name字段不可以