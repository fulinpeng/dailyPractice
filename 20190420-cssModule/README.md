
## 配置
* webpack配置
```js
    {
        loader: 'css-loader',
        options: {
            sourceMap: IS_DEV,
            modules: true,
            camelCase: true,
            importLoaders: 1,
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
        }
    }
```
* `cssModules` 与 `MiniCssExtractPlugin` 不能同时使用
* 使用cssModules后，webpack4会自动开启 `css Tree Shaking` 会让没用到的css不参与打包

## 使用方式
1. 不使用选择器，只使用class名来定义样式
2. 不叠加多个class，所有样式通过composes组合来实现复用
4. 不嵌套

## 全局样式和局部样式
* 开启CSS Modules之后默认的样式都为局部样式
* 全局样式用`:global`
    ```scss
    :global {
        .test1 {
            color: blue;
        }
        .test2 {
            color: red;
        }
    }
    ```
* 组合样式
    * 用`composes`，见：[header]('./src/header.less')

* 样式覆盖
    * CSS Modules 不会覆盖属性选择器(这句话有问题)

* 混用
    * 全局样式与局部样式时可以同时作用的
    * 普通样式可以与cssModules共存，需要在webpack中将非CSSModule排出
    * css与less一样可以混用，都支持cssModules，完全没任何影响

## css模块化方案
1. cssModule
2. 用sass/less，加BEM命名规范
    * https://blog.csdn.net/liwenfei123/article/details/77929527
    * BEM: block-name__element--modifier (Block-name 可以用驼峰，也可以用 - 连接)
3. 
