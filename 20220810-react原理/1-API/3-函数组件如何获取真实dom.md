在 React 函数组件中，可以使用 `useRef` Hook 来获取真实的 DOM 元素引用。`useRef` 可以保存对 DOM 元素的引用，类似于类组件中的 `ref` 属性。

### 使用 `useRef` 获取真实 DOM 的步骤：

1. 使用 `useRef` 创建一个引用对象。
2. 将这个 `ref` 对象绑定到要获取的 DOM 元素上。
3. 在需要时，访问 `ref.current` 来获取真实的 DOM 元素。

### 示例代码

```jsx
import React, { useRef, useEffect } from 'react';

const MyComponent = () => {
  // 创建一个引用
  const myDivRef = useRef(null);

  useEffect(() => {
    // 组件挂载后访问 DOM 元素
    if (myDivRef.current) {
      console.log('DOM Element:', myDivRef.current);
      // 例如，可以修改元素样式
      myDivRef.current.style.backgroundColor = 'yellow';
    }
  }, []); // 空数组作为依赖项，表示只在组件挂载时执行

  return (
    <div>
      <div ref={myDivRef}>This is my div</div>
    </div>
  );
};

export default MyComponent;
```

### 代码解析：
1. **创建引用**：`const myDivRef = useRef(null);` 创建了一个 `ref` 对象，它的初始值是 `null`。
2. **绑定引用到 DOM 元素**：在 JSX 中，通过 `ref={myDivRef}` 将这个 `ref` 绑定到 `<div>` 元素上。
3. **访问真实 DOM 元素**：在 `useEffect` 中，`myDivRef.current` 就是绑定的 DOM 元素，可以用来读取或修改 DOM 元素的属性。

### 常见使用场景
- **操作 DOM 元素**：例如，手动聚焦输入框、滚动到某个元素、或修改 DOM 元素的样式。
- **集成第三方库**：如果需要与依赖于真实 DOM 的第三方库（如 `jQuery`、图表库等）集成，可以通过 `useRef` 获取 DOM 元素并传给库。
