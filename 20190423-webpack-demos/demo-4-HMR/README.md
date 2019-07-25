# 模块热替换(Hot Module Replacement 或 HMR)
* 有什么用?
    * 保留在完全重新加载页面时丢失的应用程序状态。 
    * 只更新变更内容，以节省宝贵的开发时间。 
    * style-loader 可以通过它来实现无刷新更新样式
* 原理是什么?
    * [文章](https://blog.csdn.net/pedrojuliet/article/details/81701406)
        > compile: 是webpack进行编译过程
        > hmr-server: 建立连接并完成模块热更新的推送
        > hmr-runtime: 运行时注入到bundle.js中的代码

* webpack 内置了 HMR 插件
* 如果你使用了 webpack-dev-middleware 而没有使用 webpack-dev-server，请使用 [webpack-hot-middleware](https://github.com/webpack-contrib/webpack-hot-middleware) package 包，以在你的自定义服务或应用程序上启用 HMR。
* index.js中加上：
```js
if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
```
* 浏览器出现如下提示说明开启了热替换
```
    [HMR] Waiting for update signal from WDS...
    client:85 [WDS] Hot Module Replacement enabled.
```

* 至此，发现更新print.js时候回发现一个问题：打印的还是原来的内容
    * 需要使用 module.hot.accept 更新绑定到新的 printMe 函数上

# 补充
* [React Hot Loader](https://github.com/gaearon/react-hot-loader)：实时调整 react 组件。
* [Vue Loader](https://github.com/vuejs/vue-loader)：此 loader 支持用于 vue 组件的 HMR，提供开箱即用体验。
* [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux)：无需 loader 或插件！只需对 main store 文件进行简单的修改。