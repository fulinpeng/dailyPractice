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

* 按需加载、懒加载
    * bundle-loader
    * 测试的时候，自动合并了vender，没有吧bundle-loader的内容分离出来，好像是缓存了
        * 第二天改成了这种方式，然后再改回去，就可以了，确定了是缓存的问题
        ```js
        import forumLoder from "bundle-loader?lazy!_containers/asyncModules/forum";
        ```
    * 用 include 可以， exclude 字段居然不行
    * 实现了懒加载，就不能分离出公共的chunk了，反正就是报错
        * 可能需要插件，去判断哪个先执行吧，得先提取了公共chunk再进行懒加载处理才行

* 预加载还是没有成功
* 用了 dll 就不用 vendor: ['jquery', 'other-lib'] 了，对不？

* 发现一个规律：
    * filename 才可以通过`[name]`动态定义name，name字段不可以
