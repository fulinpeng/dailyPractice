import React, { useRef, useDebugValue } from 'react';

export default function ExampleUseRef() {
    const inputEl = useRef(null);
    useDebugValue(inputEl)
    const onButtonClick = () => {
        console.log('inputEl', inputEl);
        // `current` 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}