在 Vue 3 中，跨组件通信可以通过多个方式来实现，其中最常用的方式之一就是使用 Pinia 作为状态管理工具。Pinia 是 Vue 3 的官方状态管理库，它取代了 Vuex，具有更简单和现代化的 API。它通过一个全局的状态管理系统来共享组件之间的状态。

### Pinia 实现原理：

1. **Store (仓库)**:
   Pinia 使用 **store** 来存储和管理应用的状态。每个 store 是一个单独的模块，包含了响应式的数据、getters 和 actions。你可以把 store 看作是一个容器，用于存放全局的状态，并提供一些方法来修改这些状态。

2. **响应式数据**:
   在 Pinia 中，store 中的数据是响应式的，这意味着当你修改 store 中的某个属性时，所有依赖这个属性的组件都会自动更新。

3. **Pinia 与 Vue 3 的响应式系统集成**:
   Pinia 完全集成了 Vue 3 的响应式系统，使用 `reactive` 和 `ref` 来管理状态，因此可以在 Vue 组件中直接访问 store 中的数据。

4. **Actions 和 Getters**:
   - **Actions** 用于处理更复杂的逻辑，通常是修改 store 数据的异步操作。
   - **Getters** 类似于计算属性，它是 store 中的派生状态，通常用于处理 store 中数据的转换和过滤。

### Pinia 使用示例：

#### 创建一个 Pinia store：
在 `src/stores` 目录下创建一个 `useCounterStore.js` 文件：
```js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  },
  getters: {
    doubleCount: (state) => state.count * 2
  }
});
```

#### 在 Vue 组件中使用 Pinia store：
在组件中，你可以通过 `useCounterStore` 来访问和修改 store 中的状态。

```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double Count: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.decrement">Decrement</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/useCounterStore';
const counter = useCounterStore();
</script>
```

### React 中类似的功能：

React 没有内置的类似 Pinia 的状态管理系统，但可以使用 **Context API** 和 **useReducer**，或者像 **Redux** 和 **Recoil** 这样的库来实现全局状态管理。与 Pinia 不同的是，React 的上下文 (Context) 是基于 **Provider/Consumer 模式** 来实现的，而不是直接通过 store 和响应式数据流来管理状态。

**React Context API** 是 React 提供的跨组件传递数据的机制，可以把应用的某些数据存储在 Context 中，并通过 `useContext` 来访问它。React 中的 `useReducer` 也可以类似于 Pinia 中的 actions 和 mutations，来更新全局状态。

总结来说，Pinia 的设计理念和实现方式与 React 中的 Context + useReducer 的模式非常相似，都是为了解决跨组件状态共享的问题。Pinia 通过 Vue 3 的响应式系统优化了性能和开发体验，而 React 则通过其他工具如 Redux 或 Recoil 提供类似的功能。