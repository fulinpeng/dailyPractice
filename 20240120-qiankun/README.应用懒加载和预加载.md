### 1. **懒加载微应用**

懒加载是指只有在用户访问微应用时才加载该应用。可以使用 `qiankun` 的 `registerMicroApps` API 动态注册微应用，并在用户访问时触发加载。

```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'app1',
    entry: '//localhost:7100',
    container: '#container',
    activeRule: '/app1',
    loader: (loading) => console.log('loading:', loading), // 监控加载状态
  },
  {
    name: 'app2',
    entry: '//localhost:7101',
    container: '#container',
    activeRule: '/app2',
  },
]);

// 开始加载微应用，但不会马上加载，只有匹配到 activeRule 时才加载对应的应用
start();
```

当用户访问 `/app1` 或 `/app2` 路由时，相应的微应用才会被懒加载。

### 2. **预加载微应用**

预加载是指应用在空闲时提前加载，以减少后续用户点击的加载时间。`qiankun` 提供了 `preloadApps` 方法，允许我在主应用空闲时预先加载子应用资源。

```javascript
import { prefetchApps, start } from 'qiankun';

// 设置 start 的 prefetch 参数为 true，会在空闲时自动预加载
start({
  prefetch: true,
});
```

这种方式会在空闲时将 `registerMicroApps` 中注册的子应用的静态资源预加载，用户访问时能够快速渲染。

### 3. **自定义预加载**

还可以通过自定义逻辑控制何时预加载某个微应用，例如用户鼠标悬停到某个应用的链接时预加载该应用。

```javascript
document.getElementById('app1-link').addEventListener('mouseenter', () => {
  prefetchApps([{ name: 'app1', entry: '//localhost:7100' }]);
});
```

通过这两种方式结合使用，可以大幅度提升应用性能，并减少首屏加载时间。