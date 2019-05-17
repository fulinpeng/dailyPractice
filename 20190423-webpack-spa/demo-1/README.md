# 不使用配置文件
* 调整 package.json 文件移除 main 入口，以便确保我们安装包是私有的(private)，这可以防止意外发布你的代码。
* 隐式依赖关系，有什么不好？
* 执行 `npx webpack`，会运行在初始安装的 webpack 包(package)的 webpack 二进制文件，然后将`src/index.js`脚本作为入口起点，然后 输出 为 `dist/main.js`
* 用浏览器打开 `index.html`







