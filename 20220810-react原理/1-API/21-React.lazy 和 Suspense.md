以下是一个使用 `React.lazy` 和 `Suspense` 实现组件懒加载的简单示例：

### 1. **使用 `React.lazy` 和 `Suspense` 实现组件懒加载**

```jsx
import React, { Suspense } from 'react';

// 使用 React.lazy 懒加载组件
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>Main App Component</h1>

      {/* 使用 Suspense 包裹懒加载的组件，指定 fallback 在加载期间显示 */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

export default App;
```

### 2. **LazyComponent.js**
这是懒加载的组件，文件名为 `LazyComponent.js`：

```jsx
import React from 'react';

function LazyComponent() {
  return <div>This is the lazy-loaded component!</div>;
}

export default LazyComponent;
```

### 3. **工作原理**
- 在 `App` 组件中，`React.lazy` 用来动态导入 `LazyComponent`。
- 使用 `Suspense` 包裹住懒加载的组件，并通过 `fallback` 提供一个占位符（例如 `Loading...`），在组件加载时显示该占位符。
- 当 `LazyComponent` 被成功加载后，React 将用它替换 `fallback` 内容，显示实际组件。

这样就实现了组件的懒加载，当用户访问这个页面时，`LazyComponent` 会被异步加载，从而减少初始页面的加载时间。