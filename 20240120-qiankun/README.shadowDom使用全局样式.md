当使用 **Shadow DOM** 实现样式隔离时，组件内部的样式不会影响外部，反之亦然。但是，如果需要在 Shadow DOM 中使用全局的公共样式，有几种方法可以做到：

### 1. **CSS Variables（自定义属性）**
CSS 变量是全局可用的，因此即使在 Shadow DOM 中，仍然可以通过定义在全局的 CSS 变量来共享样式。可以在外部全局样式中定义变量，然后在 Shadow DOM 内部引用这些变量：

**全局样式**：
```css
:root {
  --main-bg-color: #ffcc00;
}
```

**Shadow DOM 内部样式**：
```css
const shadowRoot = this.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `
  <style>
    div {
      background-color: var(--main-bg-color);
    }
  </style>
  <div>Shadow DOM element</div>
`;
```

### 2. **通过 JavaScript 引入全局样式**
可以通过 JavaScript 动态地将外部的公共样式链接或注入到 Shadow DOM 内部。这种方式允许在 Shadow DOM 内部引入外部样式文件：

```javascript
const shadowRoot = this.attachShadow({ mode: 'open' });
const styleSheetLink = document.createElement('link');
styleSheetLink.rel = 'stylesheet';
styleSheetLink.href = '/path/to/global-styles.css';  // 指向全局样式表的路径
shadowRoot.appendChild(styleSheetLink);
```

### 3. **全局样式作用于 Light DOM，然后组合使用**
如果应用有一部分 DOM 在 Light DOM 中，而另一部分在 Shadow DOM 中，可以将全局样式应用到 Light DOM 中的部分，然后使用组合技术，部分样式在全局生效，部分样式通过 Shadow DOM 局部隔离。例如：

```html
<my-component>
  <style>
    .global-style {
      color: green;
    }
  </style>
  <div class="global-style">Light DOM Text</div>
</my-component>
```

在这个例子中，`global-style` 的样式在 Light DOM 中生效，但不影响 Shadow DOM 内部的样式隔离。这种组合可以实现局部的样式隔离和全局样式的适用。

### 4. **使用 `::part` 选择器**
对于一些开放的组件，Shadow DOM 内的元素可以通过 `::part()` 伪类暴露给外部样式。可以在组件内部定义一些 `part`，并允许外部样式通过 `::part()` 访问这些部分。

```html
<style>
  my-component::part(button) {
    color: red;
  }
</style>

<my-component>
  <button part="button">Click Me</button>
</my-component>
```

在这个例子中，外部的全局样式通过 `::part(button)` 访问 Shadow DOM 内的 `button` 元素。

### 总结
为了在 Shadow DOM 中使用全局样式，**CSS 变量** 和 **通过 JavaScript 注入全局样式** 是最常见的解决方案。这两种方式允许在不破坏 Shadow DOM 隔离性的情况下，依然能引用全局样式资源。