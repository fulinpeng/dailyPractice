Webpack 5 的 **模块联邦（Module Federation）** 功能在某些场景下可以代替 `qiankun` 来实现微前端架构。`Module Federation` 允许多个应用共享代码和依赖项，实现应用间的独立性，同时通过动态加载模块来减少重复打包。相比 `qiankun`，它在应用间通信和模块共享方面具有原生的支持，并可以直接集成到 Webpack 打包系统中。

下面通过一个简单的 demo 来展示如何使用 Webpack 5 的 `Module Federation` 实现微前端：

### 步骤 1：主应用（Host）配置

```js
// webpack.config.js (主应用)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  output: {
    publicPath: 'http://localhost:8080/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        remoteApp: 'remoteApp@http://localhost:8081/remoteEntry.js', // 指向远程应用
      },
      shared: ['react', 'react-dom'], // 共享依赖
    }),
  ],
};
```

### 步骤 2：子应用（Remote）配置

```js
// webpack.config.js (子应用)
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  output: {
    publicPath: 'http://localhost:8081/',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js', // 远程入口文件
      exposes: {
        './Button': './src/Button', // 暴露的模块
      },
      shared: ['react', 'react-dom'], // 共享依赖
    }),
  ],
};
```

### 步骤 3：主应用引入远程模块

```jsx
// src/App.js (主应用)
import React from 'react';

// 从远程应用加载 Button 组件
const RemoteButton = React.lazy(() => import('remoteApp/Button'));

function App() {
  return (
    <div>
      <h1>主应用</h1>
      <React.Suspense fallback="Loading Button...">
        <RemoteButton />
      </React.Suspense>
    </div>
  );
}

export default App;
```

### 步骤 4：子应用提供组件

```jsx
// src/Button.js (子应用)
import React from 'react';

const Button = () => {
  return <button>来自远程应用的按钮</button>;
};

export default Button;
```

### 步骤 5：运行两个应用

1. 启动主应用（Host App）：
   ```bash
   cd hostApp
   npm run start
   ```

2. 启动子应用（Remote App）：
   ```bash
   cd remoteApp
   npm run start
   ```

主应用将会在 `http://localhost:8080` 运行，子应用在 `http://localhost:8081`。在主应用页面中，我们能够看到从子应用加载过来的 Button 组件。这展示了如何使用 Webpack 5 的 `Module Federation` 来实现微前端架构。

### 优点

- **独立性**：每个微应用可以有自己的独立部署、构建配置。
- **动态加载**：主应用可以按需加载远程模块。
- **共享依赖**：多个应用之间可以共享相同的依赖，减少重复打包的代码。

### 和 `qiankun` 的区别

- `qiankun` 是基于 iframe 或 `Shadow DOM` 实现微应用隔离，而 `Module Federation` 则是在构建时通过 Webpack 实现模块的动态导入。
- `qiankun` 的隔离方案对于样式和全局变量管理更好，而 `Module Federation` 更关注模块共享。

`Module Federation` 在某些场景下可以替代 `qiankun`，尤其是当我们更关注模块共享和依赖优化时。不过，如果需要更复杂的微应用隔离、样式隔离等功能，`qiankun` 可能依旧是更好的选择。