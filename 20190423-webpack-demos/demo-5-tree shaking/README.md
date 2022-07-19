# tree shaking
* 移除 JavaScript 上下文中的未引用代码(dead-code)

# 疑惑
* app.bundle.js中好多无用代码，怎么处理？
    * 运行npm run build
    * 开始看到的是webpack插入bundle中的runtime代码

# 注意
* 任何导入的文件都会受到 tree shaking 的影响。这意味着，如果在项目中使用类似 css-loader 并导入 CSS 文件，则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除
* 使用 ES2015 模块语法（即 import 和 export），用require是不行的
* 引入css也要用import，开启cssModule后，会自动进行css tree shaking
* 这个功能，webpack4是默认开启的
    * 运行 npm start 怎么body、test 都在style标签中啊(笑哭...怎么没有开启啊)
