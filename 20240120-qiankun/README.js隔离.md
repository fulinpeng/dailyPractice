### qiankun 的 JavaScript 隔离机制

1. **沙箱机制**

2. **Proxy 代理**

3. **动态加载**

### 沙箱机制的作用
在微前端架构中，不同的子应用通常是独立的应用程序，它们会各自运行，并且有可能操作全局变量、覆盖 `window` 对象的属性。如果没有沙箱隔离，不同应用间的全局状态可能会互相干扰。例如，一个子应用可能会修改 `window.title`，而另一个应用也会依赖 `window.title`，导致冲突。因此，沙箱机制的作用就是隔离这些全局状态，确保各个子应用的运行环境互不影响。

### `Proxy` 代理在沙箱中的使用
`qiankun` 使用 `Proxy` 来创建子应用独立的 `window` 环境。通过 `Proxy`，可以拦截对子应用运行时环境中全局对象（如 `window`）的操作，把它们限定在沙箱的范围内。

#### Proxy 实现机制
```javascript
// 创建一个沙箱
class ProxySandbox {
  constructor() {
    const fakeWindow = {};
    this.proxy = new Proxy(fakeWindow, {
      get(target, prop) {
        // 如果属性在 fakeWindow 中则返回它，否则返回真实的 window 中的值
        return prop in target ? target[prop] : window[prop];
      },
      set(target, prop, value) {
        // 所有的全局变量赋值都会保存在 fakeWindow 中，而不是真实的 window 上
        target[prop] = value;
        return true;
      },
      has(target, prop) {
        return prop in target || prop in window;
      }
    });
  }
}

// 使用示例
const sandbox = new ProxySandbox();
sandbox.proxy.alert('This is sandboxed alert');  // 调用原始 window 对象的 alert 方法
sandbox.proxy.myGlobalVar = 'Sandbox';  // 仅修改 fakeWindow，不影响真实的 window 对象
```

在这个例子中，`Proxy` 拦截了对子应用中的 `window` 对象的访问和修改，确保它们只能影响局部的 `fakeWindow`，从而实现全局状态的隔离。

### 动态加载子应用
`qiankun` 通过动态加载的方式来启动和卸载子应用。在加载子应用时，它会加载该子应用的 JavaScript 和 CSS，并将其注入到主应用中。这种动态加载的方式确保了子应用的按需加载和卸载。

#### 子应用动态加载示例
```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'sub-app', // 子应用名称
    entry: '//localhost:7100', // 子应用入口
    container: '#subapp-container', // 子应用挂载的容器
    activeRule: '/app', // 子应用激活规则
  }
]);

// 启动 qiankun
start();
```

这个代码示例展示了如何动态注册和加载一个子应用。通过 `registerMicroApps`，可以定义子应用的名称、入口、挂载点以及激活的规则。当用户访问 `/app` 时，`qiankun` 会自动加载并渲染子应用。

**`entry` 是应用的整体入口**：
1. **请求 HTML 入口文件**
当微前端框架 `qiankun` 初始化并加载子应用时，它首先会根据配置的 `entry` 地址（例如 `http://localhost:3000`），通过 `fetch` 或类似的 HTTP 请求机制，获取子应用的 HTML 页面（即子应用的 `index.html`）。

2. **HTML 解析**
`qiankun` 获取到 HTML 后，并不会直接将其插入主应用的 DOM 中，而是解析 HTML，抽取其中的 `<script>` 和 `<link>` 标签以及 `style` 标签内容。这样做的原因是为了对这些资源进行动态加载、缓存和处理。

3. **动态加载 JS 资源**
在解析 HTML 时，`qiankun` 会检测 `<script>` 标签，并通过动态脚本加载的方式来处理这些 JavaScript 文件：
   - **全局执行隔离：** 使用沙箱机制确保每个子应用的 JavaScript 运行在各自的独立作用域中，不会影响到其他子应用或主应用。
   - **缓存管理：** 避免重复加载相同的 JS 文件，从而提高性能。

4. **动态加载 CSS 资源**
对于 CSS 文件，`qiankun` 也会在解析 HTML 时，将其中的 `<link>` 和 `<style>` 标签中的内容提取出来。`qiankun` 会将这些样式插入到主应用的 DOM 中，从而使子应用的样式生效。为了解决样式冲突问题，`qiankun` 支持使用沙箱和样式隔离机制，使不同子应用的样式不会互相影响。

5. **挂载到主应用的 DOM 中**
在完成 JS 和 CSS 的动态加载之后，`qiankun` 会根据配置的 `container`，将子应用的根 DOM 节点挂载到主应用指定的容器中（即在主应用中渲染子应用的内容）。

6. **处理资源的运行环境隔离**
为了确保子应用的运行不会影响主应用，`qiankun` 通过沙箱机制为每个子应用创建一个独立的运行环境。这个沙箱机制通过代理 `window` 对象等技术实现，确保子应用的 JS 在独立的作用域中执行，不会污染主应用或其他子应用的全局变量和样式。

7. **技术细节**
- **HTML 解析：** `qiankun` 使用 DOMParser 来解析从 `entry` 中加载的 HTML 内容。
- **动态加载脚本：** 脚本通过 `document.createElement('script')` 的方式进行动态插入和执行，确保子应用的 JS 能够正常运行。
- **样式隔离：** `qiankun` 可以通过 `Shadow DOM` 或 `CSS-in-JS` 的方式，保证不同子应用的样式不会冲突。

### 沙箱机制的两种模式
`qiankun` 的沙箱机制提供了两种模式：
1. **快照沙箱（Snapshot Sandbox）**：在应用被激活时记录其全局变量状态，当应用被卸载时恢复原始状态。这适用于现代浏览器。
2. **基于 Proxy 的沙箱（Proxy Sandbox）**：基于 ES6 `Proxy` 特性实现，能够在运行时拦截对子应用的全局变量操作。该模式适用于支持 `Proxy` 的现代浏览器。
