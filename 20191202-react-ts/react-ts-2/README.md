* mode: "production" 时才设置分包
* 引入react之后会发现现在修改js代码会刷新,但是浏览器需要手动刷新
    * yarn add react-hot-loader
    * 在.babelrc添加配置: "plugins": ["react-hot-loader/babel"]
    * 然后根组件处理: export default hot(module)(Main);
* 跨域配置: 
    * https://github.com/chimurai/http-proxy-middleware#options

* ts:
    * import * as React from "react"; 才行，或者tsconfig.js中配allowSyntheticDefaultImports
* webpack 会自动去找 view1 文件夹下的index.js 如果用了ts，得写全至少得写上 view1/index

* 参考:
    * https://www.jianshu.com/p/1798ed80f70d
    * https://segmentfault.com/a/1190000019980649


* ts配置失败....看react-ts3吧
    * 对比得出结论，react文件必须以 .tsx 结尾才行，普通js才能用 .ts 结尾