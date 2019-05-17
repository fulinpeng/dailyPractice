# 安装

`npm init -y`

# tree-shaking

> 执行上线production 时候 有 tree-shaking
> 1. 能把不用的代码自动清除掉，但是只是看import引入情况，把没有用到的东西shake掉
> 2. 但是如果在一个没用用到的文件里面引入了第三方插件或者引入了node_modules里的东西，那结果是它把这个没用到的包也给大了就去
> 引入插件解决 `webpack-deep-scope-plugin`
> 注意：引入一个包的时候尽量用`{isArray, cloneDeep}`结构的形式，别一来就把整个包给引进来

> 注意：一般`css-tree-shaking`用在MPA上，SPA不用
>> 插件:purify-CSS-plugin

> 代码中注释了也不行，他还是会编译，因为webpack内部是按照正则匹配的

> `webpack.config.js`里面导出配置对象`必须以函数的方式`

> 开始都没问题，突然出现找不到什么原因的错误，可能是`pakage-lock.js`的问题，把它删了，重新来；如：`ERROR in ./src/css/index.less (./node_modules/css-loader??ref--6-1!./node_modules/less`
>> 如果报错：`npm install less --save`，那是还要安装less 模块，`npm install less --save`

> style-loader依赖于css-loader；css-loader用于处理css，style-loader用来将这个js形式的style插入到html文档里面；但是这个style-loader很大，会让整个js文件剧增；

> 多页单页，构建的方式是不一样的

> dev:server启动方式：`npm install -D webpack-dev-server` ，在`pakage.json`中配置：`npm run dev.server`，运行即可热更新

> 对异步的文件(包)进行处理，提出来后，可以提高spa的首屏加载速度
```javascript
import(/* webpackChunkName: "async-test" */ './components/async').then(_ => {
    _.default.init();
});
```

> 公共的文件(包)要抽出来，webpack4开始官方移除了commonchunk插件，现在直接配置`optimization`

> 编译js压缩打包插件`uglifyjs-webpack-plugin`，可以开启多核;终端能显示监控面板，借助`speed-measure-webpack-plugin`插件；（但是加上就报错。。。）

> 系统提示工具`webpack-build-notifier`

> 开启打包进度`progress-bar-webpack-plugin`

> 

# dist/script 目录

* async-*.js 文件是异步js
* common-*.js 文件是公共文件
* index-*.js 文件是入口文件，里面是那种引入之类的
* runtime-*.js 文件是webpack运行时执行文件

