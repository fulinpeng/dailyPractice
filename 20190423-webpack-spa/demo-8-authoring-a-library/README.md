# 用webpack打包成一个库
* 支持多种引用方式
```js
    // es6
    import * as webpackNumbers from 'numbers.js';
    webpackNumbers.wordToNum('Two');

    // commonJs
    const webpackNumbers = require('webpack-numbers');
    webpackNumbers.wordToNum('Two');

    // amd
    require(['webpackNumbers'], function (webpackNumbers) {
        webpackNumbers.wordToNum('Two');
    });
```
```html
    <!-- script 标签引入 -->
    <script src="https://unpkg.com/webpack-numbers"></script>
    <script>
        webpackNumbers.wordToNum('Five')
        window.webpackNumbers.wordToNum('Five')
    </script>
```

* externals
    * webpack项目引用外部库的时候也可以用externals挂载到某个this或者全局对象上
    * externals内部的库，将不参与打包

* 取消压缩js的方法：
```js
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                // 下面的很容易报错：
                // test: /\.js(\?.*)?$/i,
                // include: /\/includes/,
                // exclude: /\/src/,
                chunkFilter: (chunk) => { // 返回true的chunk会被 uglify
                    console.log('##########--chunk:', chunk.name);
                    // if (chunk && chunk.name === 'webpack-numbers') {
                    return false;
                    // }
                    // return true;
                }
            })
        ],
    }
```

* 使用
    * 需要先全局加载依赖库`lodash.js`
    * 运行`npm run examples-node`，或者浏览器打开[browser/index.html]('./examples/browser/index.html')

# 问题
* 不能用代码split scripting，用了打包出来需要全部引入才能用
* 自己的写的库，依赖lodash，可是页面反馈找不到lodash，需要全局引入lodash
* 已经通过webpack打包过的文件，好像不能再次被打包了???
    * 所以除了直接在页面加载和在node中用，怎么在模块中引入呢？？？
    * 比如：运行`npm run dev`打开index.html就报错
