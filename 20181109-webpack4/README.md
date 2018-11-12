# 安装步骤

* `npm install webpack --save-dev`

> 此时运行`webpack -v`终端会提醒`Do you want to install 'webpack-cli' (yes/no):`安装`webpack-cli`

* `npm install webpack-cli --save-dev`

* 不需要webpack.config.js可以运行

> 默认效果`./src/index.js` =>`./dist/bundle.js`

# 配置

* mode

> 解决mode警告：`WARNING in configuration`
> 1. 可以在pakage.json中配置`"dev": "webpack --mode development"`；
> 2. 也可以在webpack.config.js中配置:

```javascript
module.exports = {
    mode: 'production'
};
```

> 支持值为String：`development`、`production`、`none`；具体见[官网](https://webpack.js.org/concepts/mode/)
> 1. 每个值都有默认的配置
> 2. 如果要定义自己的配置，要导出一个函数而不是对象

* entry

> 单条入口、多条入口
> 1. `entry: string|Array<string>`
> 2. `entry: {[entryChunkName: string]: string|Array<string>}`

> 后面值是数组`index: ['./index.js']` => 打包出来是'index.js'

> 多条入口打包出来是：多个js文件

* output

> 动态命名
>> `[name]`为对应entry的名字
>> `[hash]`添加hash
>> entry的键和output值设置为路径，打包结果会自动新建文件夹
```javascript
entry: {
    'a/b/c/index': ['./index.js'], // 名称可以写成路径
}
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'a/b/c/[name].[hash:5].js',  // 值可以写成路径
    publicPath: ''
}
// 会导致产生：a/b/c/a/b/c/index.2177e.js

```
>> `publicPath`字段用于设置CDN地址/静态资源路径，一般会提出一个全局变量可供上线时配置

* loader

> 使用loader有三种方式：`Configuration`、`Inline`、`CLI`;
> 1. Configuration指在`webpack.config.js`中配置，推荐使用第一种
> 2. Inline指在每个导入语句显式地指定它们
> 3. CLI指用shell命令指定它们

> Inline模式：`import Styles from 'style-loader!css-loader?modules!./styles.css'`

> CLI模式：`webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'`

> loade执行特点：
> 1. `module.rules`是一个数组，内部执行loader的顺序是：'从右往左' `less-loader` => `css-loader` => `style-loader`
> 2. 第一次加载程序将其结果与转换后的结果传递给下一个loader
> 3. 可以同步或异步加载
> 4. 可以通过插件给loader添加更多的功能


# 注意

* 原来这种方式`webpack ./src/index.js ./dist/bundle.js`不能用了，现在这样会报错：`Can't resolve './dist/bundle.js' in 'E:\test\webpack-test'`

> 需要在pagkage.json中配置`"dev": "webpack --mode development"`或者`"dev": "webpack"`，然后运行`npm run dev`，

> 出现这个错误怎么解决？`Refusing to install package with name "webpack" under a package`
> 1. 外面的文件夹不能直接命名成`webpack`
> 2. 内部`package.json`中的`name`字段不能为`webpack`


