import React, { useState, useEffect } from 'react';

export default function () {
    const [count, setCount] = useState(0);

    // 相当于 componentDidMount 和 componentDidUpdate
    // 它在第一次渲染之后和每次更新之后都会执行。
    useEffect(() => {
        // 使用浏览器的 API 更新页面标题
        document.title = `You clicked ${count} times`;
        // 这样的 effect 可能不必清除，所以不需要返回函数
    }, [count]);
    // useEffect 的第二个参数
    //      1. 仅在 count 更改时更新
    //      2. 可以省略，即为 每次都更新

    // 们已经将 useReducer 的 Hook 内置到 React 中。你可以在 Hook API 索引中找到它使

    return (
        <>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me change title</button>
        </>
    );
}