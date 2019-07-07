# 有配置文件
* npx : 通过模块名引用本地安装的 npm 包
    * `npx webpack --config webpack.config.js`
* 自定义webpack配置文件
    * `webpack` 命令将默认选择使用:`node_modules\.bin\webpack --config webpack.config.base.js`
    * 路径必须使用反斜线 `\`
* 自定义参数
    * 通过向 npm run build 命令和你的参数之间添加两个中横线，可以将自定义参数传递给 webpack，例如：`npm run build -- --flp511`

# 问题
1. 为什么直接运行`webpack`会报错：`无法将“webpack”项识别为 cmdlet、函数、脚本文件或可运行程序的名称`，而把`webpack`放到`package.json`中却可以通过`npm run build`正常运行？
    * 可以像使用 npx 那样通过模块名引用本地安装的 npm 包。因为它允许所有贡献者使用同一组通用脚本（如果必要，每个 flag 都带有 --config 标志）



