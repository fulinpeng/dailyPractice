import React, { useState } from 'react';

export default function () {
    console.log('—————--useState--start--—————————————————————————————————————————————————————————————————');
    // useState 就是一个 Hook
    // 返回一对值：当前状态和一个让你更新它的函数
    // useState(0) 的参数 0 为，count 的初始值
    const [count, setCount] = useState(0);

    // 声明多个 state 变量！
    const [age, setAge] = useState(42);
    const [fruit, setFruit] = useState('banana');
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
    console.log('age', age);
    console.log('fruit', fruit);
    console.log('todos', todos);

    // Hook 的特点和好处：
    //      1. Hook 不能在 class 组件中使用
    //      2. 这使得你不使用 class 也能使用 React
 
    console.log('—————--useState--end--—————————————————————————————————————————————————————————————————');
    return (
        <>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </>
    );
}