### 1. CSS Modules

**概念**：CSS Modules 是一种 CSS 文件的模块化方案，允许在样式表中编写局部作用域的 CSS，避免了全局命名冲突的问题。每个类名会被转换成唯一的标识符，确保样式只作用于对应的组件。

**使用示例**：

首先，确保有一个支持 CSS Modules 的构建工具（如 Webpack）。

要在 Webpack 中配置 CSS Modules 并自定义前缀，需要设置 `modules` 选项，并使用 `localIdentName` 来定义类名的格式。以下是具体步骤：

#### 1. 安装依赖

首先，确保已安装必要的依赖：
```bash
npm install --save-dev css-loader style-loader
```

#### 2. Webpack 配置

在 `webpack.config.js` 文件中，配置 `css-loader`，并自定义前缀。

##### webpack.config.js
```javascript
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.module\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                // 这里自定义类名的格式
                                localIdentName: '[prefix]__[local]__[hash:base64:5]',
                                // 可以使用 '[name]' 来使用文件名作为前缀
                                // 例如: localIdentName: '[name]__[local]__[hash:base64:5]'
                                prefix: 'myPrefix', // 这里自定义前缀
                            },
                        },
                    },
                ],
            },
        ],
    },
};
```

#### 3. 使用 CSS Modules

在 CSS 文件中，使用 `.module.css` 后缀来启用 CSS Modules

##### 文件结构：
```
/src
  ├── App.js
  ├── App.module.css
```

##### App.module.css
```css
.title {
    color: blue;
    font-size: 24px;
}
```

##### App.js
```javascript
import React from 'react';
import styles from './App.module.css';

function App() {
    return <h1 className={styles.title}>Hello, CSS Modules!</h1>;
}

export default App;
```

**效果**：编译后，`.title` 类会变成一个唯一的标识符，如 `App_title__1a2b3`，确保与其他样式不冲突。

### 2. Scoped CSS

**概念**：Scoped CSS 是一种将样式限制在特定组件中的方法，主要用于 Vue.js。通过在 `<style>` 标签中添加 `scoped` 属性，样式只会作用于当前组件的元素。

**使用示例**：
#### MyComponent.vue
```html
<template>
  <div class="container">
    <h1>Scoped CSS Example</h1>
  </div>
</template>

<style scoped>
.container {
    background-color: lightgray;
    padding: 20px;
}
</style>
```

**效果**：只有 `MyComponent` 组件中的元素会受到 `.container` 样式的影响，其他组件中的同名类不会被影响。

### 3. Shadow DOM

**概念**：Shadow DOM 是 Web Components 的一部分，允许开发者创建一个封闭的 DOM 树，与主文档的样式和脚本相互隔离。这使得组件的样式和结构不会受到外部环境的影响。

1. **样式隔离**：在 Shadow DOM 内部定义的样式不会影响到外部文档的样式，`反之亦然`。

2. **DOM 隔离**：Shadow DOM 创建的元素和主文档的 DOM 结构是独立的，这样可以避免命名冲突和结构上的干扰。

**使用示例**：

#### MyComponent.js
```javascript
class MyComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        const style = document.createElement('style');

        style.textContent = `
            .container {
                background-color: lightblue;
                padding: 20px;
            }
        `;

        wrapper.innerHTML = `<h1 class="container">Shadow DOM Example</h1>`;
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
    }
}

customElements.define('my-component', MyComponent);
```

#### 使用方式：
```html
<my-component></my-component>
```

**效果**：`<my-component>` 的样式和结构被封装在 Shadow DOM 中，不会被外部 CSS 影响，避免样式冲突。

### 总结

- **CSS Modules**：适用于任何使用 JavaScript 模块的环境，提供局部作用域的样式，避免命名冲突。
- **Scoped CSS**：主要用于 Vue.js，直接在组件中定义样式，仅影响该组件。
- **Shadow DOM**：通过 Web Components 提供更强的封装性，样式和 DOM 结构完全与外部隔离。

这三种技术各有优势，开发者可以根据项目需求选择合适的方案来管理样式。