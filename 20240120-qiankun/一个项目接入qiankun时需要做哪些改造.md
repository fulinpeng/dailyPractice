### 1. **支持独立运行**
子应用应能够独立运行在其开发环境中，而不仅仅依赖于主应用。因此，需要确保：
   - 子应用可以在没有主应用的情况下单独访问。
   - 可以在开发时直接访问子应用的 `index.html`，且没有错误。

### 2. **修改打包配置**
为了让 qiankun 能够正确加载子应用，需要对项目的打包配置做一些调整。

- **导出子应用的生命周期钩子**：
  子应用需要实现 qiankun 规定的生命周期函数，这些函数用于控制子应用的加载、渲染和卸载。通常在入口文件（如 `main.js`）中添加如下代码：

  ```javascript
  export async function bootstrap() {
    console.log('子应用 bootstrap');
  }

  export async function mount(props) {
    console.log('子应用 mount');
    // 渲染子应用
    render(props);
  }

  export async function unmount(props) {
    console.log('子应用 unmount');
    // 卸载子应用
    unmountReactComponent();
  }
  ```

- **配置 `publicPath`**：
  确保子应用中的静态资源路径正确。在 `webpack.config.js` 或 `vite.config.js` 中，需要将 `publicPath` 设置为动态值，以适应不同的环境：

  ```javascript
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? '/子应用路径/' : '/' // 子应用资源的绝对路径即可
  }
  ```

### 3. **处理路由**
如果子应用使用前端路由（如 `react-router` 或 `vue-router`），需要确保路由能够在主应用中正确加载。主要改动包括：
- 设置路由为**哈希模式**，或者确保子应用的路由和主应用不冲突。
  
  如果使用 `react-router`，可以在 `BrowserRouter` 里增加 `basename`：

  ```javascript
  <BrowserRouter basename="/子应用路径">
    <App />
  </BrowserRouter>
  ```

### 4. **避免全局变量污染**
由于子应用会运行在主应用的环境中，因此需要避免子应用和主应用之间的全局变量污染。可以通过以下方式实现：
- 使用 **Shadow DOM** 来隔离 CSS 样式（可选）。
- 通过 `qiankun` 提供的沙箱机制，避免子应用修改全局变量。

### 5. **与主应用通信**
子应用和主应用之间可能需要通信，可以通过 `qiankun` 提供的 `props` 来实现。主应用可以在加载子应用时传递参数，子应用可以通过 `props` 获取这些数据并与主应用交互。

  ```javascript
  export async function mount(props) {
    console.log(props); // 接收主应用传递的参数
    render();
  }
  ```

### 6. **CSS 隔离**
为了防止主应用和子应用的 CSS 样式相互影响，可以：
- 使用局部作用域的 CSS 方案，如 **CSS Modules**。
- 或者通过 `qiankun` 自带的沙箱模式自动隔离样式。

### 7. **动态加载子应用**
主应用会通过子应用的 `entry` 入口动态加载子应用，因此子应用的所有依赖（如 `JS` 和 `CSS` 文件）都需要能从 `entry` 入口中正确加载并执行。

### 8. **版本兼容性**
由于子应用是独立运行的系统，可能和主应用共享同一套技术栈库（如 React、Vue 等）。为了避免版本冲突，可以通过 **external** 或 **Module Federation** 来共享这些库，从而减少子应用的打包体积。

### 9. **注册子应用**
在主应用中通过 qiankun 注册子应用，例如：

```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: '子应用',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/subapp'
  },
]);

start();
```

---

通过上述步骤改造后，子应用便可以顺利接入到 qiankun 微前端架构中，实现与主应用的互通和隔离运行。