import React, { useState, useEffect } from 'react';

// 仅仅是一个代码示例(需要清除的Effect)，无法运行的
// 

export default function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null);
    const [ChatAPI, setChatAPI] = useState(null);

    function handleStatusChange(status) {
        setIsOnline(status.isOnline);
    }

    useEffect(() => {
        // subscribeToFriendStatus 订阅事件
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

        // 并不是必须为 effect 中返回的函数命名，也可以是匿名函数
        // useEffect 可以在组件渲染后实现各种不同的副作用
        // 有些副作用可能需要清除，所以需要返回一个函数
        return () => {
            // unsubscribeFromFriendStatus 取消订阅
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
        };
    });

    if (isOnline === null) {
        return 'Loading...';
    }
    return isOnline ? 'Online' : 'Offline';
}