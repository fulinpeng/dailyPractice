<!-- TOC -->

- [css变量](#css变量)
    - [判断浏览器是否支持](#判断浏览器是否支持)
    - [基本用法](#基本用法)
    - [注意](#注意)
- [scss](#scss)
    - [命令](#命令)
    - [Comments](#comments)
    - [Variables](#variables)
    - [Data Types](#data-types)
    - [Nesting](#nesting)
    - [Partials](#partials)
    - [Extend/Inheritance](#extendinheritance)
    - [Operators](#operators)
    - [Interpolation](#interpolation)
    - [指令](#指令)
    - [Partials](#partials-1)
    - [Control Directives & Expressions](#control-directives--expressions)
    - [Mixins](#mixins)
    - [Function Directives](#function-directives)
    - [Output Style](#output-style)
    - [补充](#补充)

<!-- /TOC -->

---

# css变量
* 参考：https://www.w3cplus.com/css3/css-properties-in-depth.html?utm_source=tuicool&utm_medium=referral

## 判断浏览器是否支持
* css方法：
```css
    @supports ( (--a: 0)) {
        /* supported */
    }
    @supports ( not (--a: 0)) {
        /* not supported */
    }
```
* js方法
```js
    if (window.CSS && window.CSS.supports && window.CSS.supports('--a', 0)) {
        console.log('CSS properties are supported');
    } else {
        console.log('CSS properties are NOT supported');
    }
```
* 应用：CSS变量和Sass变量都被创建了，但只有在浏览器不支持CSS自定义属性时，Sass变量才会生效
```scss
    @mixin setVar($varName, $value){
        @include setVarSass($varName, $value);
        @include setVarCss($varName, $value);
    }
    @mixin setPropFromVar($propName, $varName){
        @supports ( (--a: 0)) {
            // Custom properties are supported in the browser
            #{$propName}: getVarCss($varName);
        }
        @supports ( not (--a: 0)) {
            // Custom properties are NOT supported in the browser
            #{$propName}: getVarSass($varName);
        }
    }
    // SET
    @include setVar('main-color', #f00);
    // GET
    body {
        @include setPropFromVar('color', 'main-color');
    }
```

## 基本用法

* 变量名大小写敏感
* `--*`必须以`--`开头，如：`--color`
    * $var这样的变量语法，已经被其他的CSS预处理程序使用了
* 变量的值可以是颜色、字符串、多个值的组合等
* 它也有一个作用域，并且能够被重新定义，`:root{...}`声明全局变量
    ```css
    :root{
        --main-color: #4d4e53;
        --main-bg: rgb(255, 255, 255);
        --logo-border-color: rebeccapurple;
        --header-height: 68px;
        --content-padding: 10px 20px;
        --base-line-height: 1.428571429;
        --transition-duration: .35s;
        --external-link: "external link";
        --margin-top: calc(2vh + 20px);
    }
    ```
* 局部变量在该元素下定义，子元素都能获取该变量
    ```css
    .block {
        --block-font-size: 1rem;
        font-size: var(--block-font-size);
    }
    ```
* 媒体查询器作用域
    ```css
    @media screen and (min-width: 1025px) {
        :root {
            --screen-category: 'desktop';
        }
    }
    ```
* 伪类作用域
    ```css
    body {
        --bg: #f00;
        background-color: var(--bg);
        transition: background-color 1s;
    }
    body:hover {
        --bg: #ff0;
        }
    ```
* 使用变量组合
```css
    .block {
        --block-text: 'This is my block';
        --block-highlight-text: var(--block-text)' with highlight';
        }
    .block:before {
        content: var(--block-text);
    }
```
* calc计算变量用法
    * 变量和常数的单位，`要么只有变量值带单位，要么只有常数值带单位`，两个都有单位没有效果的
```css
.block { --block-font-size: 1rem; }
.block__highlight {
    /* DOESN'T WORK */
    --block-highlight-font-size: var(--block-font-size)*1.5;
    font-size: var(--block-highlight-font-size);
    /* WORKS */
    font-size: calc(var(--block-font-size)*1.5);
}
```
* 模块中重置全局变量和继承的变量，只是局部变量，对该模块以外的都不产生影响
```css
    :root{
        --color:#d94e37;
    }
    h1{
        color:var(--color); /* #d94e37 */
    }
    .block{
        --color:yellowgreen;
        color:var(--color); /* yellowgreen */
    }
    .another{
        color:var(--color); /* #d94e37 */
    }
```
* 默认值`var(--font-size, 0)`
```css
    .another{
        font-size: calc(var(--font-size, 0) * 3);
    }
```
* js操作css变量
```js
    document.documentElement.style.setProperty('--color', '#d94e37');
```

## 注意
* 不能使用CSS自定义属性作为CSS属性名称：`var(--side): 10px;`不会生效
* 不能作为媒体查询值使用：`@media screen and min-width: var(--desktop-breakpoint) {...}`不会生效
* 不能作为图片地址使用：`url(var(--image-url))`不会生效


# scss

## 命令
* sass --watch  scss/test2.scss css/test2.css

## Comments
* 注释写法：`/* */` and `//`

## Variables
* 变量
* 变量作用域
* 全局已经申明的变量`$width: null`，可用`!global`随处修改全局变量，但是不能不申明直接使用(会报错)

## Data Types
* numbers (e.g. 1.2, 13, 10px)
* strings of text, with and without quotes (e.g. "foo", 'bar', baz)
* colors (e.g. blue, #04a3f9, rgba(255, 0, 0, 0.5))
* booleans (e.g. true, false)
* nulls (e.g. null)
* lists of values, separated by spaces or commas (e.g. 1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
    * 通常用于：`margin: 10px 15px 0 0`这种
    * 还可以嵌套：`1px 2px, 5px 6px ` 或者 `(1px 2px) (5px 6px)`
* maps from one value to another (e.g. (key1: value1, key2: value2))
    * `$map: (key1: value1, key2: value2, key3: value3);`
    * 值也可以是一个列表
* function references

## Nesting
* 可以直接嵌套书写css，代替后代选择器
* `&`
    * 代替父选择器，不是某个，是整个选择器集
    * 作为选择器，`&`必须写在最前面：`&:hover { ... }`
    * 可以代替父级选择器的文本值做值的拼接：`&-sidebar`，转成css为：`#main-sidebar`
    * 如果父级选择器是一个多级的后代选择器，那此时`&`就是指的那一长串...
* Nested Properties

## Partials
* `@import './*'`导入一个scss片段(后面会讲)

## Extend/Inheritance
* 不同的类可以继承(共用)一段scss代码，同时又可以拥有自己不同的样式
* Multiple Extends，还可以多继承
* Chaining Extends，链式继承
* Selector Sequences [选择器序列] 自己继承自己就成了

## Operators
* standard math operators like +, -, *, /, and %

## Interpolation
* 插入语法：`#{}`

## 指令
* 默认值：`!default`
* 加载：`@import`
    ```scss
        @import "foo.css";
        @import "foo" screen;
        @import "http://foo.com/bar";
        @import url(foo);
    ```
    * `@import`索引文件顺序：xxx.scss 优先于 xxx.sass
    * `@import`与纯的css比较，`多了一个嵌入的功能`
* 调试：`@debug`，会在编译阶段在终端打印出来

## Partials
* 拆分scss成多个小模块，让css预处理阶段加载处理成一个整体css文件，而不是各自输出多个css文件
* 实现上面的效果，只需要将这些小模块文件名前面加上下划线如：`_reset.scss`

## Control Directives & Expressions
* @if ，支持单条条件判断语句或者多条语句
* @for ，`@for $var from <start> through <end>` / `@for $var from <start> to <end>`
* @each ，`@each $var in <list or map>`
    * 还可以多重遍历
    * 可以遍历list、map
* @while ，while循环

## Mixins
* 混合，像是js的函数写法，'调用'的地方用`@include Mixins名`
* 添加浏览器前缀、清浮动等，很多地方都会重复书写的css代码
* 可以混合多条
* 混合也可以混合Mixins
* Mixins可以设置默认值
* Variable Arguments ，如shadow这种
    * `@include`'实参'也可以用变量参数
* Mixin内容块`@content`
* mixin 变量作用域，只有`@content`区域才是用外部传进来的变量
    *  @include引入的mixin，里面的变量，值都来自于@include所在的位置(跟'实参'一样去理解)

## Function Directives
* `@function`定义函数
* 必须要 `@return` 返回函数值

## Output Style
* :nested
    ```css
    #main {
        color: #fff;
        background-color: #000; }
        #main p {
            width: 10em; }
    ```
* :expanded
    ```css
    #main {
        color: #fff;
        background-color: #000;
    }
    #main p {
        width: 10em;
    }
    ```
* :compact
    ```css
    #main { color: #fff; background-color: #000; }
    #main p { width: 10em; }
    ```

## 补充
* 了解什么是 cssnano
* 预处理、后处理
* postcss、cssnext

---

* cssnano ，`是一个处理css的插件`，通过移除注释、空白、重复规则、过时的浏览器前缀以及做出其他的优化来工作，压缩 CSS 文件来确保在生产环境中尽可能的小
* 预处理、后处理的概念很简单，按照字面意思理解就行
    * 预处理是将用类css语法(sass/less)写的css代码处理生成纯css
    * 后处理是直接用纯css(包括未来才会支持的语法)写css代码再做向下兼容处理
* http://www.myth.io/ 提倡用「未来的 CSS 标准」写 CSS ，No Prefixes
* 后处理有哪些优点？
    1. 可以写自己的插件，如果你选了 Sass ，你就必须用一整套 Sass
    2. 将来的某一天所有浏览器都支持标准的 CSS ，如果你是用 PostCSS ，你可以不做任何动作，直接去除相关的 plugin 就好，但如果你用的是 Sass 就得重写css代码
    3. 它提供了一种方式用 JavaScript 代码来处理 CSS。它负责把 CSS 代码解析成抽象语法树结构（Abstract Syntax Tree，AST），再交由插件来进行处理。开发的插件更加多样化
* PostCSS 常用插件
    * Autoprefixer 添加浏览器前缀
    * cssnext 支持css将来的新特性(用了 cssnext 就不再需要使用 Autoprefixer)
    * rework
* cssnext
    1. 自定义属性和变量
    2. 自定义选择器
    3. 样式规则嵌套
    4. CSS 模块化
    5. 资源文件处理
