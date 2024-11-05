
### Qiankun 深入解析

1. **微前端架构的背景与优势**
   - 微前端的理念源于微服务，旨在解决大型前端应用的复杂性和开发效率问题。通过将应用拆分为多个独立的微应用，团队可以并行开发，降低耦合度，提高部署的灵活性。
   - **优势**：
     - **独立开发与部署**：每个微应用可以独立开发、测试和部署，降低了跨团队协作的复杂性。
     - **技术栈自由**：不同的微应用可以使用不同的技术栈，团队可以根据需求选择最佳工具。
     - **渐进式迁移**：可以逐步将现有单体应用迁移到微前端架构，而不需要一次性重构整个应用。

2. **Qiankun 的核心机制**
   - **应用注册与加载**：通过 `registerMicroApps` 注册微应用，Qiankun 在路由匹配时动态加载相应的应用，支持按需加载和懒加载。
   - **生命周期管理**：Qiankun 定义了微应用的生命周期钩子，允许开发者在不同阶段插入逻辑：
     - **bootstrap**：初始化应用，加载必要资源。
     - **mount**：挂载到主应用的 DOM 中，适合进行 UI 渲染。
     - **unmount**：卸载应用，进行清理工作，如解除事件绑定等。
   - **数据共享与通信**：微应用之间可以通过自定义事件或共享状态管理库（如 Redux、MobX）进行通信，Qiankun 还允许通过 `props` 将主应用的数据传递给微应用。

3. **路由管理与样式隔离**
   - **路由管理**：Qiankun 可以与主应用的路由系统无缝集成，支持 Hash 和 History 模式。主应用可以控制微应用的挂载和卸载，确保路由的一致性。
   - **样式隔离**：Qiankun 默认会对微应用的样式进行隔离，避免样式冲突。开发者可以使用 CSS Modules、Scoped CSS 或 Shadow DOM 等技术进一步增强样式隔离效果。

4. **性能优化**
   - **懒加载与预加载**：使用懒加载减少初始加载时间，用户访问特定路由时再加载相关微应用。预加载则是在用户可能访问的路由上进行提前加载，以提升用户体验。
   - **代码分割**：将微应用的代码分割为多个小文件，使用 Webpack 等工具优化加载速度。可以根据路由动态导入微应用的代码。
   - **CDN 资源管理**：将静态资源（如 JS、CSS）放在 CDN 上，降低服务器压力，提高加载速度。

5. **与其他微前端框架的对比**
   - **Single-SPA vs. Qiankun**：
     - **Single-SPA**：提供更多的灵活性，支持多种加载方式，但配置相对复杂，适合更复杂的微前端架构。
     - **Qiankun**：更容易上手，提供了一些开箱即用的功能，适合快速开发和原型设计。

6. **最佳实践**
   - **模块化设计**：将每个微应用设计为独立模块，确保其能够独立于主应用运行。
   - **严格的版本管理**：使用工具（如 npm 或 yarn）进行依赖管理，确保不同微应用间的版本一致性。
   - **统一的状态管理**：可以考虑使用 Redux、MobX 等状态管理工具，确保跨应用的数据一致性。

#### 样式隔离

CSS Modules、Scoped CSS 或 Shadow DOM

#### js隔离

沙箱机制 Proxy 代理 动态加载，最好有demo

#### 微应用间通信
1. **Global State (全局状态管理)**
2. **CustomEvent (自定义事件)**
3. **props传递**
4. **基于URL的通信**
5. **localstorage**

#### 怎么实现应用懒加载与预加载
1. 根据路由自动懒加载
2. 配置prefetch:true 自动预加载

   也可以自定义预加载，比如鼠标悬停到入口链接时就开始预加载

#### 公共库/工具函数等怎么公用
1. 挂载主应用window上，子应Webpack 配置 externals排除掉公共的库
2. 打包成 `umd` 格式，并通过 `cdn` 或 `npm` 共享给各个微应用
3. 在微应用注册时，通过 `props` 将公共库或工具函数传递下去
4. webpack5联邦模块

### 示例
### 项目结构
```
/qiankun-react-example
├── /main-app
│   ├── index.html
│   ├── main.js
│   └── ... (其他文件)
├── /sub-app
│   ├── package.json
│   ├── src
│   │   ├── App.js
│   │   └── index.js
│   └── public
│       └── index.html
```

### 主应用 (`main-app/main.js`)
主应用使用 `qiankun` 来加载子应用。
```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'sub-app', // 子应用名称
    entry: '//localhost:3001', // 子应用入口地址
    container: '#subapp-container', // 渲染子应用的 DOM 容器
    activeRule: '/sub', // 激活子应用的规则
  },
]);

start();
```

### 子应用 (`sub-app/src/App.js`)
在子应用中实现生命周期钩子。
```javascript
import React from 'react';

let appInstance = null;

// 初始化
export async function bootstrap() {
  console.log('子应用初始化');
}

// 挂载
export async function mount(props) {
  console.log('子应用挂载');
  appInstance = <App />;
  render(appInstance, props.container);
}

// 卸载
export async function unmount() {
  console.log('子应用卸载');
  render(null); // 卸载 React 组件
}

// 渲染函数
function render(AppComponent, container = document.getElementById('subapp-container')) {
  ReactDOM.render(AppComponent, container);
}

// 主应用组件
function App() {
  return (
    <div>
      <h1>子应用内容</h1>
      <button onClick={() => alert('按钮被点击了！')}>点击我</button>
    </div>
  );
}

export default App;
```

### 子应用 HTML (`sub-app/public/index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sub App</title>
</head>
<body>
  <div id="subapp-container"></div>
  <script src="./index.js"></script>
</body>
</html>
```

### 子应用入口 (`sub-app/src/index.js`)
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { bootstrap, mount, unmount } from './App';

// 这里直接启动子应用
bootstrap();
mount({
  container: document.getElementById('subapp-container'),
});

// 确保卸载函数在 window.unmount 中可用
window.unmount = unmount;
```

### 主应用 HTML (`main-app/index.html`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Main App</title>
</head>
<body>
  <h1>主应用</h1>
  <div id="subapp-container"></div>
  <script src="./main.js"></script>
</body>
</html>
```