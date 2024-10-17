在 React 中，`ref` 属性用于直接访问 DOM 元素或组件实例。在函数组件和类组件中使用 `ref` 的方式有所不同，主要体现在两方面：**引用的内容** 和 **获取引用的方式**。以下是两者的差别。

### 1. 在函数组件上使用 `ref`

#### 获取 DOM 元素
在函数组件中，`ref` 只能获取 DOM 元素或通过 `forwardRef` 转发的引用。函数组件本身没有实例（不像类组件），因此不能直接通过 `ref` 获取函数组件的实例。

**示例：直接获取 DOM 元素**

```jsx
import React, { useRef, useEffect } from 'react';

const MyFunctionComponent = () => {
  const divRef = useRef(null);

  useEffect(() => {
    console.log(divRef.current); // 打印出 <div> 元素
  }, []);

  return <div ref={divRef}>Function Component</div>;
};
```

**关键点**：
- **函数组件没有实例**：`ref` 在函数组件上指向的是绑定的 DOM 元素，而不是组件实例。
- **使用 `useRef`**：你需要使用 `useRef` Hook 来获取 DOM 引用。

#### 转发 `ref`（forwarding refs）
如果想在父组件中通过 `ref` 访问子函数组件的 DOM 元素，必须使用 `React.forwardRef` 来显式地转发 `ref`。

**示例：通过 `forwardRef` 转发 `ref`**

```jsx
import React, { forwardRef, useRef, useEffect } from 'react';

// 使用 forwardRef 转发 ref
const MyFunctionComponent = forwardRef((props, ref) => {
  return <div ref={ref}>Function Component with forwarded ref</div>;
});

const ParentComponent = () => {
  const divRef = useRef(null);

  useEffect(() => {
    console.log(divRef.current); // 打印出 <div> 元素
  }, []);

  return <MyFunctionComponent ref={divRef} />;
};
```

**关键点**：
- **通过 `forwardRef` 转发 `ref`**：需要用 `forwardRef` 显式转发 `ref`，以允许父组件通过 `ref` 访问子组件的 DOM 元素。
- **`ref` 指向 DOM 元素**：即使通过 `forwardRef` 转发，`ref` 仍然只指向 DOM 元素，而不是函数组件的实例。

### 2. 在类组件上使用 `ref`

在类组件中，`ref` 可以直接引用类组件的实例，允许访问类组件的实例方法、属性或状态。这是类组件的一大特点，因为类组件有实例（`this`），所以 `ref` 引用的是该实例。

**示例：引用类组件实例**

```jsx
import React, { Component, createRef } from 'react';

class MyClassComponent extends Component {
  sayHello() {
    console.log('Hello from class component!');
  }

  render() {
    return <div>Class Component</div>;
  }
}

class ParentComponent extends Component {
  constructor(props) {
    super(props);
    this.classComponentRef = createRef();
  }

  componentDidMount() {
    // 通过 ref 访问类组件的实例方法
    this.classComponentRef.current.sayHello(); // 调用类组件的 sayHello 方法
  }

  render() {
    return <MyClassComponent ref={this.classComponentRef} />;
  }
}
```

**关键点**：
- **`ref` 指向类组件实例**：在类组件上，`ref` 指向组件实例，可以访问组件的实例方法和属性。
- **直接调用组件方法**：通过 `ref`，可以直接调用类组件实例的方法，如上例中的 `sayHello()`。

### 3. 总结对比

| 特性                   | 函数组件 (`Function Component`)               | 类组件 (`Class Component`)              |
|------------------------|-----------------------------------------------|-----------------------------------------|
| **`ref` 指向**          | 通过 `useRef` 获取 DOM 元素<br>或者 `forwardRef` 转发的 DOM 引用 | 类组件实例（`this`），可以访问实例方法、属性 |
| **如何使用 `ref`**      | 需要使用 `useRef` 和 `forwardRef` 来操作 DOM | 直接使用 `ref` 获取组件实例 |
| **是否有实例**          | 没有实例，无法直接访问组件自身的方法或状态 | 有实例，可以通过 `ref` 访问实例方法和属性 |
| **访问 DOM 元素**       | 使用 `ref` 直接获取 DOM 元素 | 也可以使用 `ref` 获取 DOM 元素，需使用 `React.createRef()` |

### 何时使用哪种组件？
- 如果只需要操作 **DOM 元素**，使用 **函数组件** 搭配 `useRef` 是首选，代码更简洁。
- 如果需要访问组件的 **实例方法** 或 **状态**，或需要实现一些复杂的逻辑（例如错误边界），类组件更合适。