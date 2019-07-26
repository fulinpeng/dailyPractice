# 对异步加载的模块进行代码分离

1. 首先webpack中不能配置 optimization
2. 引入方式是:
    ```js
        import(
            /* webpackChunkName: "main" */
            /* webpackPrefetch: true */
            './main.js',
        )
    ```
    * `/* webpackChunkName: "main" */`用来定义vender的模块前缀名(即替换chunkFilename中的[name])
    * `/* webpackPrefetch: true */`用来自动向index.html中注入预加载标签，如下所示，就成功了
    ```html
        <link rel="prefetch" as="script" href="/importModule-8ed3760b3cc1dde3c186.js">
    ```

* 原理：
    * import() 调用会在内部用到 promises，返回一个promise对象

* 注意：
    * 一般封装一个asyncImport函数来动态加载
    * 既然import() 返回一个promise，那肯定可以用async-await函数
    * index.html中将不再直接引入lodash的vender包，触发加载条件的时候再去请求，请求状态码为304，就说明已经被预加载成功

# 模块预加载
* 对动态加载的模块进行code-splitting，然后才能设置预加载
* 动态加载的方式：异步引入、路由引入时改成异步加载

