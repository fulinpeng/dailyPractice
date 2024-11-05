### 1. 使用 `external` 配置
将公共库如 `lodash`、`axios` 等配置为外部依赖，每个微应用使用相同版本的库来避免重复加载。在打包时可以配置 `webpack` 的 `externals` 选项，使公共库在全局加载一次，其他微应用通过 `window` 全局变量访问这些库。

#### 示例：
```js
// Webpack 配置 externals
module.exports = {
  externals: {
    lodash: '_',
    axios: 'axios'
  }
};
```
在主应用的 HTML 中引入这些外部库：
```html
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### 2. 通过 `umd` 格式共享公共模块
如果是公司内部的工具函数或业务库，可以打包成 `umd` 格式，并通过 `cdn` 或 `npm` 共享给各个微应用。这样不仅能保证模块的独立性，还能支持在不同的微应用中引用相同的工具库。

#### 示例：
```js
// 打包成 UMD 格式的工具库
module.exports = {
  output: {
    library: 'myUtils',
    libraryTarget: 'umd',
  },
};
```
微应用可以通过 `window.myUtils` 访问公共库。

### 3. 使用主应用提供共享资源
可以将主应用中的工具函数或库放在全局变量中（如 `window`），让所有子应用都能访问。例如，将常用的工具函数或 API 封装在主应用的 `window.sharedUtils` 中，子应用可以直接调用。

#### 示例：
```js
// 主应用
window.sharedUtils = {
  formatDate: function(date) {
    return new Date(date).toLocaleDateString();
  }
};

// 子应用
const { formatDate } = window.sharedUtils;
console.log(formatDate('2024-01-01'));
```

### 4. 使用 `qiankun` 的共享依赖机制
`qiankun` 提供了内置的机制来共享依赖，主应用可以将某些公共资源传递给子应用。在微应用注册时，可以通过 `props` 将公共库或工具函数传递下去。

#### 示例：
```js
// 主应用注册微应用时传递共享工具函数
registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/app1',
    props: { utils: window.sharedUtils },
  },
]);

// 子应用中使用
const { utils } = props;
console.log(utils.formatDate('2024-01-01'));
```

### 5. 使用模块联邦（Module Federation）
在使用 Webpack 5 的情况下，可以通过 `Module Federation` 机制共享公共依赖。主应用可以暴露公共库，微应用按需引用并使用。

#### 示例：
```js
// Webpack 5 配置 Module Federation
module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        mainApp: 'mainApp@http://localhost:8080/remoteEntry.js',
      },
      shared: ['lodash', 'axios'],
    }),
  ],
};
```

通过这些方式，我们能够在 `qiankun` 微前端架构中高效地共享公共库与工具函数，避免重复加载、提高性能，同时保持微应用的独立性。