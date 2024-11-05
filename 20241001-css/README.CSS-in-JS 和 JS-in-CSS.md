### **1. CSS-in-JS**
**CSS-in-JS** 是一种在 JavaScript 文件中编写样式的技术，它允许将样式作为 JavaScript 对象直接定义，并通过 JavaScript 动态应用这些样式。常见的 CSS-in-JS 库包括 `Styled Components`、`Emotion` 和 `JSS`。

#### **方案 1: Styled Components**
`Styled Components` 是基于 ES6 模板字符串的方式，将组件样式与逻辑紧密绑定，能实现基于组件的动态样式。

##### 示例：
```javascript
// 需要安装 styled-components：npm install styled-components
import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.primary ? 'blue' : 'white'};
  color: ${props => props.primary ? 'white' : 'blue'};
  font-size: 16px;
  padding: 10px 20px;
  border: 2px solid blue;
  border-radius: 5px;
`;

function App() {
  return (
    <div>
      <Button primary>Primary Button</Button>
      <Button>Secondary Button</Button>
    </div>
  );
}
```
在这个例子中，样式和组件逻辑在一起，通过 `props` 动态改变样式。

#### **方案 2: Emotion**
`Emotion` 是另一个受欢迎的 CSS-in-JS 库，提供类似 `styled-components` 的 API，但还允许通过 `css` 函数编写样式。

##### 示例：
```javascript
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const buttonStyle = css`
  background: white;
  color: blue;
  font-size: 16px;
  padding: 10px 20px;
  border: 2px solid blue;
  border-radius: 5px;

  &:hover {
    background: blue;
    color: white;
  }
`;

function App() {
  return (
    <button css={buttonStyle}>Emotion Button</button>
  );
}
```

### **2. JS-in-CSS**
**JS-in-CSS** 是一种反向思路，即在 CSS 中嵌入 JavaScript 逻辑，允许通过 JS 变量、函数动态控制 CSS 属性值。通常通过 CSS 自定义属性（CSS Variables）和结合 JavaScript 动态控制 CSS 的方式实现。

#### **方案 1: CSS 自定义属性**
通过 JavaScript 动态控制 CSS 自定义属性（如 `--main-bg-color`），可以在 CSS 中使用这些变量，实现样式的动态控制。

##### 示例：
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    :root {
      --bg-color: white;
      --text-color: black;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-color);
    }
  </style>
</head>
<body>
  <button onclick="changeTheme()">Change Theme</button>

  <script>
    function changeTheme() {
      document.documentElement.style.setProperty('--bg-color', 'black');
      document.documentElement.style.setProperty('--text-color', 'white');
    }
  </script>
</body>
</html>
```
在这个例子中，点击按钮后通过 JS 修改自定义属性，动态改变了页面的背景色和文字颜色。

### **总结**
- **CSS-in-JS**: 样式通过 JavaScript 进行定义和操作，适合组件化开发，常用库包括 `Styled Components` 和 `Emotion`。
- **JS-in-CSS**: 通过 CSS 自定义属性结合 JS 控制，保留了 CSS 的语义，适合较简单的动态样式控制。