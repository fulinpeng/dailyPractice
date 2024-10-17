`useCallback` 和 `useMemo` 都是 React 的性能优化 Hooks，用来缓存函数和计算结果，从而避免在组件重新渲染时不必要的重新计算或重新创建函数。不过，它们的用途和适用场景有所不同。

### 1. **`useCallback`**

`useCallback` 是一个用于缓存**函数**的 Hook。它返回的是一个**记忆化的函数**，只有当依赖项发生变化时，才会重新创建该函数。

#### 用法

```jsx
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);  // 只有当 a 或 b 变化时，重新生成 memoizedCallback 函数
```

#### 特点
- **缓存函数**：防止每次渲染时都创建新的函数。
- **依赖项控制**：当依赖项（如 `a` 和 `b`）发生变化时，`useCallback` 会返回新的函数；如果依赖项没有变化，`useCallback` 返回缓存的旧函数。

#### 适用场景
- **传递回调函数给子组件**：如果你有一个回调函数需要传递给子组件，并且希望子组件在 `props` 不变时不重新渲染，可以使用 `useCallback` 来保证传递给子组件的函数引用不会改变。
- **事件处理函数**：在组件内部定义的事件处理函数，如果每次渲染都创建新的函数，会导致组件不必要的重新渲染，`useCallback` 可以缓存这个函数，避免性能浪费。

#### 示例：使用 `useCallback` 避免不必要的子组件渲染

```jsx
const Parent = () => {
  const [count, setCount] = useState(0);

  // 缓存 handleClick，避免因函数变化导致 Child 重新渲染
  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <Child onClick={handleClick} />;
};

const Child = React.memo(({ onClick }) => {
  console.log('Child re-rendered');
  return <button onClick={onClick}>Increment</button>;
});
```

在这个例子中，`useCallback` 保证了 `handleClick` 的引用在 `count` 没有变化时不会变，从而避免 `Child` 组件不必要的重新渲染。

### 2. **`useMemo`**

`useMemo` 是一个用于缓存**计算结果**的 Hook。它返回的是一个**记忆化的值**，只有当依赖项发生变化时，才会重新计算该值。

#### 用法

```jsx
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);  // 只有 a 或 b 变化时，重新计算 memoizedValue
```

#### 特点
- **缓存计算结果**：防止每次渲染时都重新执行昂贵的计算（如复杂的计算、对象或数组的生成等）。
- **依赖项控制**：当依赖项（如 `a` 和 `b`）发生变化时，`useMemo` 会重新计算；如果依赖项没有变化，`useMemo` 返回缓存的值。

#### 适用场景
- **昂贵的计算**：当你有复杂的计算逻辑或者生成的对象非常消耗性能时，`useMemo` 可以帮助你缓存结果，避免在每次渲染时重新计算。
- **生成对象或数组**：如果你需要生成一个对象或数组，且该对象或数组会被传递给子组件，`useMemo` 可以防止引用变化导致子组件不必要的重新渲染。

#### 示例：使用 `useMemo` 缓存计算结果

```jsx
const MyComponent = ({ items }) => {
  const expensiveCalculation = (items) => {
    console.log('Running expensive calculation...');
    return items.reduce((acc, item) => acc + item.value, 0);
  };

  // 只有 items 变化时才会重新计算 total
  const total = useMemo(() => expensiveCalculation(items), [items]);

  return <div>Total: {total}</div>;
};
```

在这个例子中，`useMemo` 确保了 `expensiveCalculation` 只在 `items` 发生变化时重新计算，而不会在每次渲染时都重新执行。

### 3. **区别**

| 特性         | `useCallback`                             | `useMemo`                                   |
|--------------|-------------------------------------------|---------------------------------------------|
| **作用**     | 缓存函数，避免函数重新创建                  | 缓存计算结果，避免重复计算                    |
| **返回值**   | 记忆化的**函数**                           | 记忆化的**值**                              |
| **优化对象** | 传递回调函数，避免子组件重新渲染            | 缓存复杂的计算结果或生成的对象/数组            |
| **依赖项**   | 依赖项数组，只有当依赖项变化时才重新生成函数 | 依赖项数组，只有当依赖项变化时才重新计算结果  |

### 4. **总结**

- **`useCallback`**：适用于缓存函数。通常在需要将函数传递给子组件时使用，避免因函数引用变化导致子组件重新渲染。
- **`useMemo`**：适用于缓存值。通常在涉及到复杂计算、生成对象或数组时使用，避免每次渲染都重新计算。

简单来说：
- 如果需要缓存**函数**，使用 `useCallback`。
- 如果需要缓存**计算结果**或**对象/数组**，使用 `useMemo`。