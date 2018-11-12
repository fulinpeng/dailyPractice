# 安装

`npm init -y`

# tree-shaking

> 执行上线production 时候 有 tree-shaking
> 1. 能把不用的代码自动清除掉，但是只是看import引入情况，把没有用到的东西shake掉
> 2. 但是如果在一个没用用到的文件里面引入了第三方插件或者引入了node_modules里的东西，那结果是它把这个没用到的包也给大了就去
> 引入插件解决 `webpack-deep-scope-plugin`
> 注意：引入一个包的时候尽量用`{isArray, cloneDeep}`结构的形式，别一来就把整个包给引进来

> 注意：一般`css-tree-shaking`用在MPA上，SPA不用

> 代码中注释了也不行，他还是会编译，因为webpack内部是按照正则匹配的

> `webpack.config.js`里面导出配置对象`必须以函数的方式`

> 开始都没问题，突然出现找不到什么原因的错误，可能是`pakage-lock.js`的问题，把它删了，重新来；如：`ERROR in ./src/css/index.less (./node_modules/css-loader??ref--6-1!./node_modules/les`