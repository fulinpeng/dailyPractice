`watchEffect` 和 `watch` 都是 Vue 3 中用来监听响应式数据变化的 API，但它们在使用方式、适用场景和触发机制上有所不同

### 1. `watchEffect`

`watchEffect` 是 Vue 3 中一个较为简单且常用的响应式侦听方法，它会自动收集在其中使用的响应式数据，并且在这些数据变化时自动执行副作用（effect）。

#### 特点
- **自动收集依赖**：`watchEffect` 会自动跟踪其内部使用的响应式数据，无需明确指定监听的源。
- **副作用函数**：`watchEffect` 接受一个副作用函数，该函数在响应式数据变化时会自动执行。
- **自动执行**：初始化时，副作用函数会立即执行一次。
- **无条件执行**：`watchEffect` 没有特定的“watch source”，它会自动侦测并监听函数体内的所有响应式数据。

#### 适用场景
- 适用于 **简单的副作用**，即对响应式数据的变化做出某些实时反应（例如：更新 DOM、发起请求、设置某些值等）。
- 当你希望自动收集所有使用的响应式数据并执行副作用时，`watchEffect` 非常适用。

#### 示例代码：

```javascript
import { reactive, watchEffect } from 'vue';

const state = reactive({
  count: 0,
  name: 'Alice',
});

watchEffect(() => {
  console.log(`Count is: ${state.count}, Name is: ${state.name}`);
});
```

在这个例子中，`watchEffect` 会自动收集 `state.count` 和 `state.name` 作为依赖，当它们发生变化时，副作用函数会被重新执行。

#### 注意：
- `watchEffect` 不需要传入具体的依赖项，它会在函数执行时自动跟踪。
- 当副作用函数中使用的响应式数据变化时，`watchEffect` 会重新执行。

### 2. `watch`

`watch` 允许我们更精确地监听一个或多个响应式数据源，并在这些数据变化时执行回调。与 `watchEffect` 不同，`watch` 需要显式指定需要观察的响应式数据源。

#### 特点
- **显式指定依赖项**：`watch` 需要明确传入需要监听的响应式数据源或者 getter 函数。
- **自定义回调函数**：`watch` 接受两个参数，第一个是需要观察的数据源，第二个是回调函数，回调函数会在数据变化时执行。
- **初始执行可控制**：`watch` 可以通过 `immediate` 选项控制是否在侦听开始时立即执行回调。
- **侦测变化前后值**：`watch` 提供了新值和旧值参数，可以在回调中使用它们来进行变化处理。
- **可以监听计算属性和多个源**：`watch` 可以监听计算属性或多个响应式数据。

#### 适用场景
- 当你需要 **精确控制** 监听某个特定的响应式数据或者计算属性时，`watch` 是更合适的选择。
- 如果你需要在数据变化时做一些处理，并且需要访问 **变化前后的值**，`watch` 可以提供更加丰富的控制。
- 适用于处理复杂的逻辑，比如发送请求、更新状态等。

#### 示例代码：

```javascript
import { reactive, watch } from 'vue';

const state = reactive({
  count: 0,
  name: 'Alice',
});

watch(
  () => state.count, // 监听 state.count 的变化
  (newCount, oldCount) => {
    console.log(`Count changed from ${oldCount} to ${newCount}`);
  }
);
```

在这个例子中，`watch` 监听 `state.count` 的变化，当 `count` 的值发生变化时，回调函数会被执行，并且可以访问变化前后的值。

你还可以使用 `immediate` 选项来控制是否立即执行回调：

```javascript
watch(
  () => state.count,
  (newCount, oldCount) => {
    console.log(`Count changed from ${oldCount} to ${newCount}`);
  },
  { immediate: true } // 立即执行一次回调
);
```

### `watch` 和 `watchEffect` 的区别

| 特性 | `watch` | `watchEffect` |
| --- | --- | --- |
| **依赖跟踪** | 显式指定要监听的响应式数据源 | 自动收集函数体内使用的所有响应式数据 |
| **回调执行时机** | 在依赖的响应式数据变化时执行 | 在侦听开始时立即执行一次，之后每当依赖发生变化时执行 |
| **精确控制** | 可以监听特定的数据源，并访问新旧值 | 自动侦测所有响应式数据，无法精确控制 |
| **使用场景** | 适用于复杂的副作用和精确控制（例如：发送请求、获取新旧值） | 适用于简单的副作用（例如：更新 DOM、日志记录） |
| **回调参数** | 可以获取新旧值 | 没有新旧值，只有自动执行的副作用 |

### 总结

- **`watch`** 更适用于需要 **精确控制** 和 **监听特定响应式数据源** 的场景，例如需要比较新旧值、监听计算属性、做副作用处理（如发送请求）。
- **`watchEffect`** 更适合用于 **简单的副作用**，当你希望在数据变化时执行一些操作，但不需要显式地指定依赖项时，`watchEffect` 是非常方便的选择。

**选择哪个 API 取决于应用场景的复杂度和控制需求**。如果你只关心副作用并希望自动收集依赖，使用 `watchEffect` 会更简洁。如果你需要更强的控制、访问新旧值、或者监听多个源，使用 `watch` 会更合适。