在 **qiankun** 微前端框架中，微应用之间的通信可以通过多种方式实现，常见的几种方法包括：

1. **Global State (全局状态管理)**：通过共享的全局状态对象，主应用和子应用可以互相通信。
2. **CustomEvent (自定义事件)**：通过浏览器的 `CustomEvent` 来实现微应用之间的事件通信。
3. **props传递**：在注册子应用时，可以通过 `props` 向子应用传递一些数据。
4. **基于URL的通信**：不多解释
5. **postMessage**：不多解释
6. **localstorage**：不多解释

### 1. **通过 props 传递数据**

这是最简单的通信方式之一，主应用通过注册子应用时的 `props` 传递数据。每个子应用都会接收到这些 `props`，并可以使用这些数据。

```javascript
// 主应用注册子应用时传递 props
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'micro-app-1',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/app1',
    props: {
      sharedData: { user: 'admin', token: 'abc123' }
    }
  },
  {
    name: 'micro-app-2',
    entry: '//localhost:8082',
    container: '#container',
    activeRule: '/app2',
    props: {
      sharedData: { user: 'admin', token: 'abc123' }
    }
  }
]);

start();
```

子应用可以通过 `props` 获取这些数据：

```javascript
// 在子应用的主文件中
export async function bootstrap(props) {
  console.log(props.sharedData); // { user: 'admin', token: 'abc123' }
}
```

### 2. **通过 CustomEvent 实现通信**

`CustomEvent` 是一种浏览器提供的机制，可以通过事件的形式在主应用和子应用之间传递数据。

#### 主应用发送事件：

```javascript
// 主应用发送自定义事件
const event = new CustomEvent('shared-event', {
  detail: { user: 'admin', token: 'abc123' }
});
window.dispatchEvent(event);
```

#### 子应用监听事件：

```javascript
// 子应用监听来自主应用的事件
window.addEventListener('shared-event', (event) => {
  console.log(event.detail); // { user: 'admin', token: 'abc123' }
});
```

### 3. **通过 Global State**

`qiankun` 提供了一个官方的全局状态管理库 `@qiankun/qiankun`，可以让主应用和子应用共享状态。

#### 主应用设置全局状态：

```javascript
import { initGlobalState } from 'qiankun';

// 初始化全局状态
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'admin',
  token: 'abc123',
});

// 监听全局状态变化
onGlobalStateChange((state, prev) => {
  console.log(state, prev);
});

// 更新全局状态
setGlobalState({
  user: 'guest',
});
```

#### 子应用使用全局状态：

```javascript
export async function mount(props) {
  props.onGlobalStateChange((state, prev) => {
    console.log('Global State Changed:', state, prev);
  });

  // 更新全局状态
  props.setGlobalState({
    user: 'newUser',
  });
}
```
